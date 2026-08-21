# CodeLoud public-site brief

## Destination

CodeLoud's public site sells a two-product family to people already using coding agents. The homepage must make the family understandable within one viewport and make early-access conversion obvious without becoming a long product manual.

## Audience priority

1. Individual power developers who use coding agents daily.
2. Engineering teams and technical leaders concerned with agent reliability.
3. Coding-tool vendors and platform teams.

The homepage speaks directly to the first audience. A single compact audience row acknowledges the other two without diluting the primary message.

## Central promise

> Spend less time correcting and fact-checking your coding agent.

Voice addresses correction work. Relay addresses fact-checking work.

Opening copy:

> **Fix what your agent heard. Verify what it found.**
>
> Voice reviews developer intent. Relay returns exact-version, sourced technical context.

The hero uses a full-width proof ledger rather than a conventional copy-and-product-card split. Voice and Relay remain visible together as failure → intervention → agent-ready result.

## Conversion

- Primary action: **Request early access**.
- Secondary action: **See how it works**.
- Relay may retain a product-specific beta-application link.
- Early access lives on `/early-access`, not on the homepage.
- The aggregate no-contact questionnaire lives on `/signal`, linked quietly as “Help shape the roadmap.”

## Homepage structure

1. One-viewport hero with the promise, one sentence, two actions, and a concrete product-family visual.
2. One product-demonstration section:
   - Voice: spoken developer instruction to reviewed, code-aware text.
   - Relay: technical question to exact-version sourced evidence.
3. One compact audience row: developers first, then teams and tool vendors.
4. One final early-access action and the footer.

Product details, boundaries, and expanded capabilities remain on `/voice` and `/relay`.

## Visual direction

Reading this as: a developer-tool family landing page for power users, with a compact product-led dark language and a distinctive CODE/LOUD brand system.

- Preserve the existing CODE/LOUD wordmark and slash treatment.
- Use a near-black theme, off-white text, and one restrained red-orange accent.
- Let specific product demonstrations carry the visual identity.
- Avoid giant editorial headlines, dotted-paper texture, decorative records, fake terminal chrome, generic equal-card feature grids, glows, gradients, and scroll effects.
- Keep the hero and primary actions visible in the initial desktop viewport.
- Motion is limited to motivated hover/selection feedback and respects reduced motion.

## Non-goals

- No fabricated testimonials, customer logos, usage metrics, or performance claims.
- No pricing until product access and packaging are defined.
- No dedicated `/teams` or `/platforms` pages in this slice.
- No public aggregate counters.
- No changes to Voice or Relay runtime products.

## Data and security boundaries

The existing D1 models and Turnstile verification remain authoritative. Moving forms to dedicated routes must preserve:

- distinct `codeloud_interest` and `codeloud_signal` Turnstile actions;
- server-side hostname/action verification;
- aggregate-only storage for anonymous signals;
- explicit consent and bounded fields for contact requests;
- no individual signal event, IP address, or user-agent persistence.

## Verification

- Svelte autofix, formatting, linting, strict Svelte/TypeScript checks, focused tests, and production build.
- Desktop and mobile browser inspection for `/`, `/early-access`, `/signal`, `/voice`, `/relay`, and `/privacy`.
- Confirm canonical metadata, sitemap entries, Turnstile action separation, keyboard focus, no horizontal overflow, and form result states.
- Compare homepage rendered height and above-the-fold CTA visibility against the previous version.
