/**
 * Supabase clients.
 *
 * Two clients:
 * - `supabasePublic`  — uses the publishable (anon) key. Safe for the browser.
 *                        Row-level security policies enforce what it can read/write.
 * - `supabaseAdmin`   — uses the secret key. Server-only. Bypasses RLS.
 *                        Used inside API routes for moderation / rate limiting.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Hybrid env access:
// - In Astro dev mode, Vite populates import.meta.env from .env.local
// - In Vercel runtime, process.env is populated by the platform
// Falling back covers both cases without needing astro:env schema setup.
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL ?? process.env.PUBLIC_SUPABASE_URL;
const PUBLIC_KEY = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SECRET_KEY = import.meta.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SECRET_KEY;

let _public: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

/** Name the variables that are actually missing, rather than the pair that might be. */
function missing(...pairs: [string, string | undefined][]): string[] {
  return pairs.filter(([, v]) => !v).map(([k]) => k);
}

export function getSupabasePublic(): SupabaseClient | null {
  const gaps = missing(
    ["PUBLIC_SUPABASE_URL", SUPABASE_URL],
    ["PUBLIC_SUPABASE_PUBLISHABLE_KEY", PUBLIC_KEY],
  );
  if (gaps.length) {
    // ⚠️ THIS WARNING USED TO NAME BOTH VARIABLES WHETHER OR NOT BOTH WERE MISSING, and the
    // caller falls back to empty results, so a single missing key looks exactly like a site with
    // no comments and no reactions. That is not hypothetical: one absent key survived three
    // production builds because the pages rendered perfectly and simply showed nothing.
    console.warn(`[supabase] not configured, returning no data — missing: ${gaps.join(", ")}`);
    return null;
  }
  if (!_public) {
    _public = createClient(SUPABASE_URL, PUBLIC_KEY, {
      auth: { persistSession: false },
    });
  }
  return _public;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const gaps = missing(["PUBLIC_SUPABASE_URL", SUPABASE_URL], ["SUPABASE_SECRET_KEY", SECRET_KEY]);
  if (gaps.length) {
    console.warn(`[supabase] admin client not configured — missing: ${gaps.join(", ")}`);
    return null;
  }
  if (!_admin) {
    _admin = createClient(SUPABASE_URL, SECRET_KEY, {
      auth: { persistSession: false },
    });
  }
  return _admin;
}

// ----------------------------------------------------------------------------
// Reactions
// ----------------------------------------------------------------------------

export type EmojiType = "like" | "heart" | "celebrate" | "insightful";
export const EMOJI_TYPES: readonly EmojiType[] = ["like", "heart", "celebrate", "insightful"] as const;

export interface ReactionCounts {
  like: number;
  heart: number;
  celebrate: number;
  insightful: number;
}

export interface TopReactedPost {
  postSlug: string;
  totalReactions: number;
}

/** Fetch all reaction counts for a single blog post, grouped by emoji. */
export async function getReactionCounts(postSlug: string): Promise<ReactionCounts> {
  const zero: ReactionCounts = { like: 0, heart: 0, celebrate: 0, insightful: 0 };
  const supabase = getSupabasePublic();
  if (!supabase) return zero;
  const { data, error } = await supabase
    .from("reactions_per_post")
    .select("emoji_type, count")
    .eq("post_slug", postSlug);
  if (error || !data) {
    console.warn("[supabase] getReactionCounts:", error);
    return zero;
  }
  const counts: ReactionCounts = { ...zero };
  for (const row of data) {
    const emoji = row.emoji_type as EmojiType;
    if (emoji in counts) counts[emoji] = row.count ?? 0;
  }
  return counts;
}

/** Aggregate total reaction counts across all posts (for the /stats Reactions card). */
export async function getTotalReactions(): Promise<ReactionCounts> {
  const zero: ReactionCounts = { like: 0, heart: 0, celebrate: 0, insightful: 0 };
  const supabase = getSupabasePublic();
  if (!supabase) return zero;
  const { data, error } = await supabase.from("reactions_per_post").select("emoji_type, count");
  if (error || !data) {
    console.warn("[supabase] getTotalReactions:", error);
    return zero;
  }
  const totals: ReactionCounts = { ...zero };
  for (const row of data) {
    const emoji = row.emoji_type as EmojiType;
    if (emoji in totals) totals[emoji] += row.count ?? 0;
  }
  return totals;
}

/** Top-N most-reacted blog posts, ranked by total reaction count. */
export async function getTopReactedPosts(limit = 5): Promise<TopReactedPost[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reactions_top_posts")
    .select("post_slug, total_reactions")
    .limit(limit);
  if (error || !data) {
    console.warn("[supabase] getTopReactedPosts:", error);
    return [];
  }
  return data.map((r) => ({ postSlug: r.post_slug, totalReactions: r.total_reactions ?? 0 }));
}

/**
 * Insert a reaction. Returns { counts, isNew } — counts always reflects the
 * current totals, isNew distinguishes a fresh row from a deduped retry.
 *
 * Service-role required (anon has no insert permission). `ipHash` should
 * already be sha256(ip + UA + salt). `visitor` is optional demographics.
 *
 * Duplicate inserts (same post + emoji + ipHash) are silently ignored thanks
 * to the unique index — we return isNew=false so the caller can skip the
 * notification email.
 */
// See blogCommentsLacksDemographics. Same idea for the reactions table.
let reactionsLacksDemographics = false;

/**
 * Remove a reaction by (postSlug, emoji, ipHash). Returns the post's counts
 * after the delete. Used to let visitors take back a reaction.
 */
export async function removeReaction(
  postSlug: string,
  emoji: EmojiType,
  ipHash: string,
): Promise<ReactionCounts | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { error } = await supabase
    .from("reactions")
    .delete()
    .eq("post_slug", postSlug)
    .eq("emoji_type", emoji)
    .eq("ip_hash", ipHash);
  if (error) {
    console.warn("[supabase] removeReaction:", error);
    return null;
  }
  return getReactionCounts(postSlug);
}

/**
 * Hard-delete a comment if it was posted from the same IP (ip_hash match).
 * Used by the per-comment "Delete" button shown to the original author.
 * Returns true on success, false if no row matched or not authorized.
 */
export async function deleteOwnComment(
  id: string,
  ipHash: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { count, error } = await supabase
    .from("blog_comments")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("ip_hash", ipHash);
  if (error) {
    console.warn("[supabase] deleteOwnComment:", error);
    return false;
  }
  return (count ?? 0) > 0;
}

/** Hard-delete a reaction by row id (admin-only). */
export async function deleteReactionById(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase.from("reactions").delete().eq("id", id);
  if (error) {
    console.warn("[supabase] deleteReactionById:", error);
    return false;
  }
  return true;
}

/** Soft-hide a comment by id (admin-only). */
export async function hideCommentById(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase.from("blog_comments").update({ hidden: true }).eq("id", id);
  if (error) {
    console.warn("[supabase] hideCommentById:", error);
    return false;
  }
  return true;
}

/** Soft-hide a wall message by id (admin-only). */
export async function hideWallMessageById(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase.from("wall_messages").update({ hidden: true }).eq("id", id);
  if (error) {
    console.warn("[supabase] hideWallMessageById:", error);
    return false;
  }
  return true;
}

export async function addReaction(
  postSlug: string,
  emoji: EmojiType,
  ipHash: string,
  visitor?: { country: string | null; deviceType: string; browserFamily: string } | null,
): Promise<{ counts: ReactionCounts; isNew: boolean; id: string | null } | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const baseRow: Record<string, unknown> = {
    post_slug: postSlug,
    emoji_type: emoji,
    ip_hash: ipHash,
  };
  const fullRow =
    visitor && !reactionsLacksDemographics
      ? {
          ...baseRow,
          country: visitor.country,
          device_type: visitor.deviceType,
          browser_family: visitor.browserFamily,
        }
      : baseRow;

  let { data, error } = await supabase
    .from("reactions")
    .insert(fullRow)
    .select("id")
    .single();
  if (error?.code === "42703" || error?.code === "PGRST204") {
    reactionsLacksDemographics = true;
    console.warn("[supabase] reactions demographics columns missing; falling back");
    ({ data, error } = await supabase
      .from("reactions")
      .insert(baseRow)
      .select("id")
      .single());
  }
  let isNew = true;
  if (error) {
    if (error.code === "23505") {
      isNew = false;
    } else {
      console.warn("[supabase] addReaction:", error);
      return null;
    }
  }
  const counts = await getReactionCounts(postSlug);
  return { counts, isNew, id: data?.id ?? null };
}

// ----------------------------------------------------------------------------
// Blog comments
// ----------------------------------------------------------------------------

export interface BlogComment {
  id: string;
  postSlug: string;
  authorName: string | null;
  body: string;
  createdAt: string; // ISO
  country?: string | null;
}

export interface TopCommentedPost {
  postSlug: string;
  totalComments: number;
}

function rowToComment(row: any): BlogComment {
  return {
    id: row.id,
    postSlug: row.post_slug,
    authorName: row.author_name ?? null,
    body: row.body,
    createdAt: row.created_at,
    country: row.country ?? null,
  };
}

/**
 * List visible comments for one post, newest first. Hard-capped at 200.
 *
 * If `viewerIpHash` is passed, the result also returns `ownedIds` — comments
 * whose ip_hash matches, so the UI can show a "Delete" affordance for the
 * original author even if they cleared localStorage or switched browsers.
 */
export async function getCommentsForPost(
  postSlug: string,
  limit = 200,
  viewerIpHash?: string,
): Promise<{ comments: BlogComment[]; ownedIds: string[] }> {
  const supabase = getSupabasePublic();
  if (!supabase) return { comments: [], ownedIds: [] };
  const { data, error } = await supabase
    .from("blog_comments")
    .select("id, post_slug, author_name, body, created_at, country")
    .eq("post_slug", postSlug)
    .eq("hidden", false)
    .order("created_at", { ascending: false })
    .limit(Math.min(limit, 200));
  if (error || !data) {
    console.warn("[supabase] getCommentsForPost:", error);
    return { comments: [], ownedIds: [] };
  }
  const comments = data.map(rowToComment);

  // ownedIds lookup — only runs if we have a viewer hash and there are
  // visible comments to check. Uses the service-role client so it can read
  // the otherwise-protected ip_hash column.
  let ownedIds: string[] = [];
  if (viewerIpHash && comments.length > 0) {
    const admin = getSupabaseAdmin();
    if (admin) {
      const { data: ownedRows } = await admin
        .from("blog_comments")
        .select("id")
        .eq("post_slug", postSlug)
        .eq("ip_hash", viewerIpHash);
      ownedIds = (ownedRows ?? []).map((r: { id: string }) => r.id);
    }
  }

  return { comments, ownedIds };
}

/** Total visible comments across all posts. Cheap aggregate for /stats. */
export async function getTotalCommentCount(): Promise<number> {
  const supabase = getSupabasePublic();
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from("blog_comments")
    .select("*", { count: "exact", head: true })
    .eq("hidden", false);
  if (error) {
    console.warn("[supabase] getTotalCommentCount:", error);
    return 0;
  }
  return count ?? 0;
}

/** Top-N most-commented blog posts. */
export async function getTopCommentedPosts(limit = 5): Promise<TopCommentedPost[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_comments_top_posts")
    .select("post_slug, total_comments")
    .limit(limit);
  if (error || !data) {
    console.warn("[supabase] getTopCommentedPosts:", error);
    return [];
  }
  return data.map((r) => ({ postSlug: r.post_slug, totalComments: r.total_comments ?? 0 }));
}

/**
 * Insert a comment. Returns the new row on success. Service-role required.
 * Caller is responsible for moderation + rate limit checks; this just writes.
 *
 * `visitor` is optional demographics (country / device / browser) pulled from
 * request headers; passing null is fine — the columns are nullable.
 */
// Module-level flag — flips to true the first time we discover the
// demographics columns don't exist, so subsequent inserts skip them.
// Resets to false on cold start; if the migration is applied later, the
// next cold instance will start writing demographics again automatically.
let blogCommentsLacksDemographics = false;

export async function addComment(
  postSlug: string,
  authorName: string | null,
  body: string,
  ipHash: string,
  visitor?: { country: string | null; deviceType: string; browserFamily: string } | null,
): Promise<BlogComment | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const baseRow: Record<string, unknown> = {
    post_slug: postSlug,
    author_name: authorName,
    body,
    ip_hash: ipHash,
  };
  const fullRow =
    visitor && !blogCommentsLacksDemographics
      ? {
          ...baseRow,
          country: visitor.country,
          device_type: visitor.deviceType,
          browser_family: visitor.browserFamily,
        }
      : baseRow;
  const tryInsert = (row: Record<string, unknown>) =>
    supabase
      .from("blog_comments")
      .insert(row)
      .select("id, post_slug, author_name, body, created_at")
      .single();

  let { data, error } = await tryInsert(fullRow);
  if (error?.code === "42703" || error?.code === "PGRST204") {
    // Demographics columns don't exist yet — set flag, retry with base row.
    blogCommentsLacksDemographics = true;
    console.warn("[supabase] blog_comments demographics columns missing; falling back");
    ({ data, error } = await tryInsert(baseRow));
  }
  if (error || !data) {
    console.warn("[supabase] addComment:", error);
    return null;
  }
  return rowToComment(data);
}

// ----------------------------------------------------------------------------
// Moderation blocks — fire-and-forget log of rejected submissions for the
// daily digest email. Failure here never blocks the user-facing handler.
// ----------------------------------------------------------------------------

export type ModerationSource = "comment" | "wall" | "reaction" | "cv";

export interface ModerationBlock {
  source: ModerationSource;
  reason: string;
  ip_hash?: string | null;
  country?: string | null;
  preview?: string | null;
}

export async function logModerationBlock(b: ModerationBlock): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  try {
    const { error } = await supabase.from("moderation_blocks").insert({
      source: b.source,
      reason: b.reason.slice(0, 200),
      ip_hash: b.ip_hash ?? null,
      country: b.country ?? null,
      preview: b.preview ? b.preview.slice(0, 400) : null,
    });
    if (error) console.warn("[supabase] logModerationBlock:", error);
  } catch (err) {
    console.warn("[supabase] logModerationBlock unexpected:", err);
  }
}

export interface ModerationBlockRow {
  id: string;
  source: ModerationSource;
  reason: string;
  preview: string | null;
  country: string | null;
  created_at: string;
}

export async function getRecentModerationBlocks(
  sinceISO: string,
  limit = 50,
): Promise<ModerationBlockRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("moderation_blocks")
    .select("id, source, reason, preview, country, created_at")
    .gte("created_at", sinceISO)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) {
    console.warn("[supabase] getRecentModerationBlocks:", error);
    return [];
  }
  return data as ModerationBlockRow[];
}

// ----------------------------------------------------------------------------
// Cross-engagement history for a single IP hash. Used by every notification
// email so I can tell at a glance whether the person who just downloaded the
// CV (or commented, reacted, posted a wall note) has engaged with the site
// before, and how. The IP hash is the same value the API routes already
// compute via hashIp() — so this lookup is a cheap join on existing tables.
// ----------------------------------------------------------------------------

export interface EngagementHistory {
  cvDownloads: number;
  reactions: number;
  comments: number;
  wallNotes: number;
  firstSeen: string | null; // ISO timestamp of the earliest engagement of any kind
  isReturning: boolean;     // true if this is NOT the first time we've seen this IP
}

/** Aggregate counts of prior engagement from this IP, across all tables. */
export async function getEngagementHistory(ipHash: string): Promise<EngagementHistory> {
  const zero: EngagementHistory = {
    cvDownloads: 0,
    reactions: 0,
    comments: 0,
    wallNotes: 0,
    firstSeen: null,
    isReturning: false,
  };
  const supabase = getSupabaseAdmin();
  if (!supabase) return zero;

  // Run 4 count queries + 4 created_at-min queries in parallel. Cheap on Supabase
  // because each table has an ip_hash index already (created in the schema files).
  const [cv, reactions, comments, walls, firstCv, firstReact, firstComment, firstWall] =
    await Promise.all([
      supabase.from("cv_downloads").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash),
      supabase.from("reactions").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash),
      supabase.from("blog_comments").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash),
      supabase.from("wall_messages").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash),
      supabase.from("cv_downloads").select("created_at").eq("ip_hash", ipHash).order("created_at", { ascending: true }).limit(1),
      supabase.from("reactions").select("created_at").eq("ip_hash", ipHash).order("created_at", { ascending: true }).limit(1),
      supabase.from("blog_comments").select("created_at").eq("ip_hash", ipHash).order("created_at", { ascending: true }).limit(1),
      supabase.from("wall_messages").select("created_at").eq("ip_hash", ipHash).order("created_at", { ascending: true }).limit(1),
    ]);

  const cvCount = cv.count ?? 0;
  const reactionsCount = reactions.count ?? 0;
  const commentsCount = comments.count ?? 0;
  const wallCount = walls.count ?? 0;

  const candidateDates = [
    firstCv.data?.[0]?.created_at,
    firstReact.data?.[0]?.created_at,
    firstComment.data?.[0]?.created_at,
    firstWall.data?.[0]?.created_at,
  ].filter(Boolean) as string[];
  const firstSeen = candidateDates.length
    ? candidateDates.sort()[0]
    : null;

  // "Returning" means: more than just the event that just landed.
  // Conservatively: > 1 total prior engagements means we've seen them before.
  const total = cvCount + reactionsCount + commentsCount + wallCount;
  return {
    cvDownloads: cvCount,
    reactions: reactionsCount,
    comments: commentsCount,
    wallNotes: wallCount,
    firstSeen,
    isReturning: total > 1,
  };
}

// ----------------------------------------------------------------------------
// Country-aggregation views (populated by the demographics-migration.sql)
// ----------------------------------------------------------------------------

export interface CountryCount {
  country: string;
  count: number;
}

async function countryCountsFromView(view: string, valueColumn: string): Promise<CountryCount[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(view)
    .select(`country, ${valueColumn}`)
    .limit(50);
  if (error || !data) {
    console.warn(`[supabase] ${view}:`, error);
    return [];
  }
  return data.map((r: any) => ({ country: r.country, count: r[valueColumn] ?? 0 }));
}

export const getCommentCountries = () =>
  countryCountsFromView("blog_comments_countries", "comment_count");
export const getReactionCountries = () =>
  countryCountsFromView("reactions_countries", "reaction_count");
export const getWallCountries = () =>
  countryCountsFromView("wall_messages_countries", "message_count");

// ----------------------------------------------------------------------------
// CV downloads
// ----------------------------------------------------------------------------

export interface CvDownloadTotals {
  total: number;
  last_30_days: number;
  last_7_days: number;
  last_24_hours: number;
}

// Same column-resilience pattern as reactions: if cv_downloads predates the
// demographics columns, this flag flips after the first 42703/PGRST204 and
// subsequent inserts skip those fields. Resets on cold start.
let cvDownloadsLacksDemographics = false;

/**
 * Record a CV download. Idempotent per (ip_hash, day_bucket) — refreshing
 * the page on the same day counts as one. Returns true on a fresh insert,
 * false on the deduped replay, null on an error.
 */
export async function addCvDownload(
  ipHash: string,
  visitor?: { country: string | null; deviceType: string; browserFamily: string } | null,
  referrer?: string | null,
): Promise<boolean | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const baseRow: Record<string, unknown> = { ip_hash: ipHash };
  if (referrer) baseRow.referrer = referrer;
  const fullRow =
    visitor && !cvDownloadsLacksDemographics
      ? {
          ...baseRow,
          country: visitor.country,
          device_type: visitor.deviceType,
          browser_family: visitor.browserFamily,
        }
      : baseRow;

  let { error } = await supabase.from("cv_downloads").insert(fullRow);
  if (error?.code === "42703" || error?.code === "PGRST204") {
    cvDownloadsLacksDemographics = true;
    console.warn("[supabase] cv_downloads demographics columns missing; falling back");
    ({ error } = await supabase.from("cv_downloads").insert(baseRow));
  }
  if (error) {
    if (error.code === "23505") return false; // duplicate on (ip_hash, day_bucket)
    console.warn("[supabase] addCvDownload:", error);
    return null;
  }
  return true;
}

/**
 * Get CV download totals across windows. Returns zeros on any failure so
 * the /stats card always has something to render.
 */
export async function getCvDownloadTotals(): Promise<CvDownloadTotals> {
  const zero: CvDownloadTotals = {
    total: 0,
    last_30_days: 0,
    last_7_days: 0,
    last_24_hours: 0,
  };
  const supabase = getSupabasePublic();
  if (!supabase) return zero;
  const { data, error } = await supabase
    .from("cv_downloads_totals")
    .select("total, last_30_days, last_7_days, last_24_hours")
    .single();
  if (error || !data) {
    console.warn("[supabase] getCvDownloadTotals:", error);
    return zero;
  }
  return {
    total: data.total ?? 0,
    last_30_days: data.last_30_days ?? 0,
    last_7_days: data.last_7_days ?? 0,
    last_24_hours: data.last_24_hours ?? 0,
  };
}

export const getCvDownloadCountries = () =>
  countryCountsFromView("cv_downloads_countries", "download_count");

// ----------------------------------------------------------------------------
// Wall message types
// ----------------------------------------------------------------------------

export interface WallMessage {
  id: string;
  name: string;
  message: string;
  color: string; // background color token (e.g. "pink", "yellow")
  x: number; // canvas x coordinate (0-1000)
  y: number; // canvas y coordinate (0-1000)
  rotation: number; // degrees (-15 to 15)
  createdAt: string; // ISO
}

export interface NewWallMessage {
  name: string;
  message: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

/**
 * Count of visible (non-hidden) wall messages.
 * Used by /stats and the home bento. Returns 0 on any failure.
 */
export async function getWallMessageCount(): Promise<number> {
  const supabase = getSupabasePublic();
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from("wall_messages")
    .select("*", { count: "exact", head: true })
    .eq("hidden", false);
  if (error) {
    console.warn("[supabase] getWallMessageCount:", error);
    return 0;
  }
  return count ?? 0;
}
