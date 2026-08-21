# CodeLoud family site architecture

**Status:** proposed and implemented in the first public-site slice  
**Scope:** the public SvelteKit family experience in this repository  
**Date:** 2026-08-15

## Product boundary

This repository is the public CodeLoud family site. It is not the Relay service and it is not the Voice desktop application.

- CodeLoud Voice is the developer dictation product. The real Voice implementation and research live in `/home/pyro1121/Documents/Codeloud/Voice`.
- CodeLoud Relay is the MCP product for exact-version documentation, technical research, package review, repository lineage, and evidence replay. The real Relay implementation and hosted Cloudflare boundary live in `/home/pyro1121/Documents/Codeloud/Relay`.

This separation prevents the public site from duplicating Relay's existing auth, API-key, beta-application, Turnstile, D1, and MCP implementations.

## Decisions

### SvelteKit on Cloudflare

The site uses SvelteKit 2 with Svelte 5 and `@sveltejs/adapter-cloudflare`. The official SvelteKit documentation says `adapter-cloudflare` supports SvelteKit applications on Cloudflare Workers and Pages, and exposes Cloudflare platform bindings during local development. The old `adapter-cloudflare-workers` path is deprecated.

Sources:

- SvelteKit Cloudflare adapter: <https://svelte.dev/docs/kit/adapter-cloudflare>
- Cloudflare SvelteKit guide: <https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/>

### Semantic signature visual

The public page expresses the Voice-to-Relay handoff as a semantic HTML record with a CSS-only editorial treatment. The record shows heard, reviewed, and grounded states without canvas, WebGL, or a client-side graphics runtime. Product meaning remains readable without JavaScript, and the page avoids shipping a large decorative dependency to every visitor.

### UI primitives

Bits UI was evaluated for accessible primitives but is not installed in the first public slice. Its current documentation describes unstyled Svelte 5 primitives with compound Dialog, Tabs, Accordion, and focus-management APIs. The marketing composition remains custom so it does not inherit a generic component-library visual language. If a future console needs those primitives, Bits UI remains an evaluated option.

Sources:

- Bits UI: <https://www.bits-ui.com/>
- Bits UI Dialog: <https://bits-ui.com/docs/components/dialog>
- Bits UI Tabs: <https://bits-ui.com/docs/components/tabs>
- Bits UI Svelte 5 migration: <https://bits-ui.com/docs/migration-guide>

### Motion and progressive enhancement

Svelte's native `Spring`, `Tween`, and `prefersReducedMotion` APIs are preferred for local state animation. SvelteKit's `onNavigate` can integrate the browser View Transition API when supported. CSS scroll-driven timelines are optional enhancement only because MDN currently marks broad support as incomplete.

Sources:

- Svelte motion: <https://svelte.dev/docs/svelte/svelte-motion>
- SvelteKit View Transitions: <https://svelte.dev/blog/view-transitions>
- MDN View Transition API: <https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API>
- MDN scroll-driven animations: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations>

### Auth and API boundary

The public site does not create a second auth or API-key system. The existing Relay Cloudflare service already mounts Better Auth, uses the Better Auth API-key and OAuth-provider plugins, and owns Relay's D1-backed hosted state. The site will link or call that boundary through a typed adapter in a later slice.

Better Auth documents direct Hono mounting through the standard `Request`/`Response` boundary. The Better Auth API-key plugin documents expiration, permissions, rate limiting, metadata, multiple configurations, and user/organization references. The remote MCP authorization specification separately defines OAuth 2.1 protected-resource metadata and audience-bound bearer tokens; therefore a developer API key is not described as universal MCP OAuth compatibility.

Sources:

- Existing Relay auth implementation: `/home/pyro1121/Documents/Codeloud/Relay/cloudflare/src/auth.ts`
- Existing Relay hosted server: `/home/pyro1121/Documents/Codeloud/Relay/cloudflare/src/hosted-server.ts`
- Existing Relay beta HTTP boundary: `/home/pyro1121/Documents/Codeloud/Relay/cloudflare/src/beta-application-http.ts`
- Better Auth Hono integration: <https://better-auth.com/docs/integrations/hono>
- Better Auth API-key plugin: <https://better-auth.com/docs/plugins/api-key>
- MCP authorization: <https://modelcontextprotocol.io/specification/latest/basic/authorization>

## Product claims and non-claims

### Voice

The page may describe project-aware vocabulary, transcript review, bounded identifier correction, and controlled insertion because those capabilities are documented by the Voice project. The page must not claim universal local processing, zero retention, provider-side deletion, training exclusion, or universal latency. The Voice project currently uses external speech providers and provider retention/training policies are not uniform.

### Relay

The page may describe Relay as an MCP server that consolidates exact-version documentation, technical research, package review, repository lineage, and evidence replay. It should say Relay grounds the context available to an agent, not that it verifies the agent's final answer.

### Interest capture

Product interest is a measurement and access signal. It is not a promise of beta access. Relay's existing application endpoint, Turnstile policy, D1 storage, retention, status-token, and reviewer flows remain authoritative for Relay beta applications. The "Apply for Relay beta" CTAs on this site link to the Relay service's own application flow (`https://relay.codeloud.xyz/#beta`) rather than duplicating the form or proxying submissions; the interest form here is the measurement layer only.

This public family site separates two demand signals onto dedicated routes so neither interrupts the homepage sales journey. `/early-access` owns the opt-in contact path backed by `codeloud_product_interest`: it stores normalized contact information and bounded workflow fields needed to understand Voice/Relay demand; it does not store audio, transcripts, source code, credentials, or Relay evidence. `/signal` owns the no-contact path backed by `codeloud_interest_signal_daily`: it stores only a daily aggregate keyed by bounded problem and trial-intent choices, with no individual event row, email, IP address, or user agent. These aggregates are verified submissions, not guaranteed unique people.

Both writes require server-side Turnstile verification with distinct actions (`codeloud_interest` and `codeloud_signal`) and the production hostname allowlist. The no-contact path does not forward the request IP to Siteverify. Missing bindings, secret, hostname policy, or valid Siteverify response causes an unavailable result rather than a write.

Sources:

- Cloudflare Turnstile server validation: <https://developers.cloudflare.com/turnstile/get-started/server-side-validation/>
- Cloudflare Turnstile client/form integration: <https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/>
- SvelteKit form actions and progressive enhancement: <https://svelte.dev/docs/kit/form-actions>

## Package provenance note

The initial dependency selection was resolved against exact package versions on 2026-08-15 using Relay's bounded npm resolver and pre-install review. The review found verified npm registry signatures and provenance declarations; it did not download or independently verify tarball bytes. This is dependency-admission evidence, not a claim that the packages are risk-free.

The first install audit found the SvelteKit 2 cookie dependency path below `cookie@0.7.0`, which is affected by GHSA-pxg6-pf52-xh8x/CVE-2024-47764. The advisory's fixed version is `0.7.0`; this site pins the compatible `cookie@0.7.2` through npm `overrides` and upgrades Wrangler to `4.123.0`, which removes the audit findings in the current lockfile. We will remove the override when the SvelteKit major line naturally owns a compatible fixed cookie range.

Sources:

- GitHub Advisory Database: <https://github.com/advisories/GHSA-pxg6-pf52-xh8x>
- OSV advisory: <https://osv.dev/vulnerability/GHSA-pxg6-pf52-xh8x>
- SvelteKit dependency discussion: <https://github.com/sveltejs/kit/issues/13388>

Selected versions:

- `@sveltejs/kit@2.70.2`
- `svelte@5.56.9`
- `@sveltejs/adapter-cloudflare@7.2.9`
- `@sveltejs/vite-plugin-svelte@7.3.0`
- `vite@8.2.1`
- self-hosted Mona Sans and Commit Mono font artifacts sourced from the existing CodeLoud public asset inventory

The exact resolver returned evidence IDs for each reviewed npm package. The font files are self-hosted under `static/fonts/` so the page does not require a font CDN or a runtime font package. Source excerpts are not copied into this repository; the URLs above remain the durable citations.

## Provisioned Cloudflare resources

Production provisioning (2026-08-17):

- D1 database `codeloud-family-interest` (region WNAM) bound as `CODELOUD_INTEREST_DB`; migrations create the contact table `codeloud_product_interest` and the aggregate-only `codeloud_interest_signal_daily` table.
- Turnstile widget `codeloud-interest` (managed mode) restricted to `codeloud.xyz`; site key exposed as the `TURNSTILE_SITE_KEY` var, secret stored as the `TURNSTILE_SECRET` worker secret (and in local-only `.dev.vars`, gitignored).
- Worker `codeloud-family-site` deployed with the D1 binding, vars, secret, and the `codeloud.xyz` custom-domain route. Verified live: `GET /` returns 200 with the site key and Turnstile script; form POSTs without a valid token fail closed with the unavailable action data; SvelteKit's origin CSRF check rejects header-less cross-site POSTs.

## Next slices

1. Full login + API-key verification on the Relay console (requires the sole account holder's credentials); then define the Voice key scopes (`voice:transcribe`, `voice:project-context`, `voice:receipts`) when Voice ships an authenticated service.
2. Submit `https://codeloud.xyz/sitemap.xml` through Google Search Console and inspect the canonical `/`, `/voice`, `/relay`, and `/privacy` URLs.
3. Extend the browser inspection (`scripts/browser-inspect.mjs`) as new surfaces land.

## Authenticated console

The family console reuses Relay's live Better Auth surface — it is not recreated on this site. Relay serves `/login`, `/signup` (registration allowlisted to the account holder), and `/account` (API-key management through the Better Auth API-key plugin). The Web footer links to `https://relay.codeloud.xyz/account` (`rel="external"`). Verified in production: `/login` serves the form, `/account` redirects unauthenticated visitors to `/login` (303), and `/api/auth/get-session` returns `null` without a session.

## Relay production

Relay is deployed to production at `relay.codeloud.xyz` (worker `relay-mcp-production`):

- DNS (`relay.codeloud.xyz` A + AAAA, proxied) and the custom-domain route are live.
- D1 `relay-auth-production` has all 20 migrations applied (ledger complete).
- Four production queues (`relay-research-production`, `-dlq`, `relay-corpus-acquisition-production`, `relay-corpus-ranking-production`) are wired as producers/consumers.
- Turnstile widget `relay-beta` (domain `relay.codeloud.xyz`, action `relay_beta_apply`) plus the `TURNSTILE_SECRET`, `RELAY_BETA_RATE_LIMIT_SECRET`, and `BETTER_AUTH_SECRET` worker secrets.
- Verified live: landing page serves the beta form; a valid submission body without a Turnstile token fails closed with `403 application_verification_failed`; the status endpoint returns `received`; the MCP endpoint is auth-protected (401).

## Relay beta integration

The "Apply for Relay beta" CTAs on the family page link to the Relay service's own application flow at `https://relay.codeloud.xyz/#beta` (a `rel="external"` link, typed through Web's product catalog `applyUrl`). The formal application — Turnstile verification with the `relay_beta_apply` action, rate limiting, status tokens, and human review — remains authoritative on the Relay service. This site does not duplicate the form or proxy submissions: a server-side proxy would collapse Relay's source-based rate limiting (its `cf-connecting-ip` pseudonym) and a cross-origin browser POST is blocked by CORS. The family interest form remains the measurement layer only. Voice has no `applyUrl` yet, so its CTA stays an in-page interest button.

## Standards audit

This slice follows the repository's global TypeScript and Svelte 5 requirements: strict compiler settings, parsed boundaries, runes (`$state`, `$derived`, `$props`, `$effect`/`#await`), modern event attributes, thin components, no legacy `class:` directives, no raw API payloads in components, and explicit resource/fallback handling.

Boundary parsing uses Effect and Effect Schema with explicit typed error channels: the interest form decode, the branded `EmailAddress`, and the Turnstile siteverify response all parse through `Schema.decodeUnknown`, and expected failures are tagged errors (`InterestFormError`, `InterestVerificationError`, `InterestPersistenceError`) surfaced through SvelteKit `fail()` responses rather than exceptions. Domain and server modules are pure; the SvelteKit action is the imperative shell that runs the Effect and maps tagged errors to action data. Provider and database details are never exposed to the browser.

Tooling matches the TypeScript engineering standard: `tsc --noEmit` and `svelte-check` for the compiler gate, type-aware ESLint (`recommendedTypeChecked`) with `@typescript-eslint`, oxlint with the local anti-slop ruleset, deterministic Prettier formatting, and focused Vitest coverage for the parser and the Turnstile/store boundary. A content security policy (nonce mode) restricts script/style/frame origins and allows only `challenges.cloudflare.com` for Turnstile.
