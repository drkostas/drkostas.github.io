-- Privilege hardening for the public engagement tables.
--
-- Two changes, both defense in depth on top of the existing row-level security:
--
--  1. The anon role must not read ip_hash. It is a salted server-set hash used
--     only for abuse limiting and "is this my own comment" checks, and it was
--     coming back on reads of blog_comments, reactions and wall_messages. We
--     replace the table-wide SELECT grant with a column-level grant that lists
--     every column except ip_hash. cv_downloads and moderation_blocks have no
--     anon read policy at all, so anon simply loses SELECT on them.
--
--  2. The anon (and authenticated) role must not have INSERT / UPDATE / DELETE.
--     Every write goes through the server-side API with the service role, which
--     bypasses RLS. Row-level security already refuses anon writes, but the
--     grants should not be there, and new tables should not inherit them.
--
-- The site's reads must therefore never SELECT "*" on these tables as anon;
-- the count helpers in src/lib/supabase.ts count a named column instead.

begin;

-- ---- 1. ip_hash is never readable by anon --------------------------------

revoke select on public.blog_comments from anon, authenticated;
grant select (id, post_slug, author_name, body, created_at, hidden, country, device_type, browser_family)
  on public.blog_comments to anon, authenticated;

revoke select on public.reactions from anon, authenticated;
grant select (id, post_slug, emoji_type, created_at, country, device_type, browser_family)
  on public.reactions to anon, authenticated;

revoke select on public.wall_messages from anon, authenticated;
grant select (id, name, message, color, x, y, rotation, created_at, hidden, country, device_type, browser_family)
  on public.wall_messages to anon, authenticated;

-- No anon read policy on these two; drop the SELECT grant entirely.
revoke select on public.cv_downloads, public.moderation_blocks from anon, authenticated;

-- ---- 2. anon / authenticated cannot write --------------------------------

revoke insert, update, delete on
  public.blog_comments, public.reactions, public.wall_messages,
  public.cv_downloads, public.moderation_blocks
  from anon, authenticated;

revoke insert, update, delete on
  public.blog_comments_countries, public.blog_comments_per_post, public.blog_comments_top_posts,
  public.reactions_countries, public.reactions_per_post, public.reactions_top_posts,
  public.cv_downloads_countries, public.cv_downloads_totals, public.wall_messages_countries
  from anon, authenticated;

-- New tables created in this schema must not grant writes to anon/authenticated.
alter default privileges in schema public
  revoke insert, update, delete on tables from anon, authenticated;

commit;
