import { defineMiddleware } from "astro:middleware";
import { waitUntil } from "@vercel/functions";

/**
 * Optional visit counter.
 *
 * When COLLECTOR_URL and COLLECTOR_TOKEN are both set, each page view is posted to
 * `${COLLECTOR_URL}/collect` after the response has been sent, so it never slows a page
 * or changes it. Without both variables nothing is sent, which is the default for a
 * fork or a local build. COLLECTOR_PAGE names the site in the collector (default: the host).
 */
function countVisit(request: Request, path: string): void {
  const url = process.env.COLLECTOR_URL;
  const token = process.env.COLLECTOR_TOKEN;
  if (!url || !token) return;
  if (request.method !== "GET" || path.startsWith("/api") || path.startsWith("/_")) return;
  if (/\.[a-z0-9]+$/i.test(path)) return; // a file, not a page
  if (!(request.headers.get("accept") ?? "").includes("text/html")) return;
  const body = JSON.stringify({
    page: process.env.COLLECTOR_PAGE || new URL(request.url).host,
    ref: request.headers.get("referer") || "Unknown",
    agent: request.headers.get("user-agent") || "",
    ip: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim(),
    domain: "",
  });
  waitUntil(
    fetch(`${url.replace(/\/$/, "")}/collect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // some edges refuse a request with no user agent of its own
        "User-Agent": "estate-collector-client/1.0",
      },
      body,
      signal: AbortSignal.timeout(1500),
    }).catch(() => undefined),
  );
}

/**
 * Admin dev-only guard.
 *
 * All /admin/* pages and /api/admin/* endpoints are 404'd unless we're in
 * `astro dev`. `import.meta.env.DEV` is a Vite-replaced constant: at build
 * time it becomes a literal `false`, so in the production bundle the check
 * collapses to `return 404` — zero runtime overhead, zero risk of misflag.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const path = new URL(context.request.url).pathname;
  const isAdmin = path.startsWith("/admin") || path.startsWith("/api/admin");
  if (isAdmin && !import.meta.env.DEV) {
    return new Response("Not Found", { status: 404 });
  }
  countVisit(context.request, path);
  return next();
});
