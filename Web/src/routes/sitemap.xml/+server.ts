import type { RequestHandler } from "@sveltejs/kit";
import { GUIDE_SLUGS } from "$lib/domain/guides";
import { SITE_ORIGIN } from "$lib/domain/seo";

const LAST_MODIFIED = "2026-08-21";
const PUBLIC_PATHS = [
	"/",
	"/voice",
	"/relay",
	"/guides",
	...GUIDE_SLUGS.map((slug) => `/guides/${slug}`),
	"/about",
	"/privacy",
] as const;

const URLS = PUBLIC_PATHS.map(
	(path) => `  <url><loc>${SITE_ORIGIN}${path}</loc><lastmod>${LAST_MODIFIED}</lastmod></url>`,
).join("\n");

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS}
</urlset>
`;

export const prerender = true;

/** Serve only canonical, indexable public URLs for search-engine discovery. */
export const GET = (() =>
	new Response(SITEMAP, {
		headers: {
			"cache-control": "public, max-age=3600",
			"content-type": "application/xml; charset=utf-8",
		},
	})) satisfies RequestHandler;
