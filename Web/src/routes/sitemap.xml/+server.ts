import type { RequestHandler } from "@sveltejs/kit";

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://codeloud.xyz/</loc></url>
  <url><loc>https://codeloud.xyz/voice</loc></url>
  <url><loc>https://codeloud.xyz/relay</loc></url>
  <url><loc>https://codeloud.xyz/privacy</loc></url>
</urlset>
`;

export const prerender = true;

/** Serve the canonical public URLs for search-engine discovery. */
export const GET = (() =>
	new Response(SITEMAP, {
		headers: {
			"cache-control": "public, max-age=3600",
			"content-type": "application/xml; charset=utf-8",
		},
	})) satisfies RequestHandler;
