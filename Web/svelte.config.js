import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: "auto",
			directives: {
				"default-src": ["'self'"],
				"base-uri": ["'self'"],
				// Cloudflare Web Analytics auto-injects its versioned RUM beacon on
				// proxied requests; the beacon reports back to our own /cdn-cgi/rum,
				// so connect-src 'self' already permits transmission.
				"script-src": [
					"'self'",
					"https://challenges.cloudflare.com",
					"https://static.cloudflareinsights.com",
				],
				// Svelte transitions create inline <style> elements; SvelteKit
				// augments generated inline styles/scripts with nonces or hashes.
				"style-src": ["'self'", "'unsafe-inline'"],
				"img-src": ["'self'", "data:"],
				"font-src": ["'self'", "data:"],
				"connect-src": ["'self'", "https://challenges.cloudflare.com"],
				"frame-src": ["https://challenges.cloudflare.com"],
				"form-action": ["'self'"],
				"frame-ancestors": ["'none'"],
				"object-src": ["'none'"],
			},
		},
	},
};

export default config;
