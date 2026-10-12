import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Optional error reports. The page's inline script sends an uncaught error here, and this
 * forwards it to `${COLLECTOR_URL}/collect` as `kind: "error"` with the token, which never
 * reaches a browser. Without COLLECTOR_URL and COLLECTOR_TOKEN nothing is sent. Always 204.
 */
export const POST: APIRoute = async ({ request }) => {
  const url = process.env.COLLECTOR_URL;
  const token = process.env.COLLECTOR_TOKEN;
  if (url && token) {
    try {
      const body = (await request.json()) as { message?: unknown; source?: unknown };
      const message = String(body.message ?? "").slice(0, 300);
      if (message) {
        await fetch(`${url.replace(/\/$/, "")}/collect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "User-Agent": "estate-collector-client/1.0",
          },
          body: JSON.stringify({
            kind: "error",
            page: process.env.COLLECTOR_PAGE || new URL(request.url).host,
            message,
            source: String(body.source ?? "").slice(0, 250),
            agent: request.headers.get("user-agent") || "",
          }),
          signal: AbortSignal.timeout(1500),
        });
      }
    } catch {
      // a report that cannot be read or sent is dropped; the page never sees it
    }
  }
  return new Response(null, { status: 204 });
};
