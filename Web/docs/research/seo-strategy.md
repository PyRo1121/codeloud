# CodeLoud search strategy

Last reviewed: 2026-08-21

## Decision

CodeLoud should not try to rank one landing page for every adjacent phrase. The durable strategy is a small, tightly linked topic cluster built around two product problems:

1. turning spoken developer intent into reviewable coding-agent input;
2. giving coding agents exact-version, sourced technical context through MCP.

The homepage establishes the family. `/voice` and `/relay` own commercial product intent. A guides hub and three substantial guides answer adjacent informational intent without creating thin keyword variants.

## Verified guidance

- Google says its systems prioritize helpful, reliable, people-first information rather than content created to manipulate rankings. Its self-assessment asks whether content is original, substantial, clearly sourced, trustworthy, and useful to an intended audience. [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google recommends descriptive page titles, crawlable links, descriptive anchor text, consistent canonical URLs, and canonical absolute URLs in sitemaps. [Title links](https://developers.google.com/search/docs/appearance/title-link), [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- SvelteKit recommends SSR or prerendering, unique titles and descriptions, normalized URLs, sitemaps, and good Core Web Vitals. [SvelteKit SEO](https://svelte.dev/docs/kit/seo)
- Claude Code's official voice documentation demonstrates active demand for coding-oriented dictation and explicitly describes editable transcripts, coding-vocabulary tuning, and project/branch recognition hints. [Claude Code voice dictation](https://code.claude.com/docs/en/voice-dictation)
- OpenAI's Codex guidance recommends clear goals, relevant context, constraints, completion criteria, and MCP when required context lives outside the repository or changes frequently. [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- Anthropic describes context engineering as curating the smallest high-signal set of tokens and recommends just-in-time retrieval rather than loading every possible source up front. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- The MCP specification defines servers as providers of context to clients and identifies resources, tools, and prompts as core server primitives. [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture), [MCP resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)

## Query map

These are intent clusters, not claims of measured search volume. Search Console data should replace assumptions once impressions accumulate.

| Page                                | Primary intent                             | Supporting language                                                    |
| ----------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| `/`                                 | developer tools for reliable coding agents | voice input, sourced context, coding-agent workflow                    |
| `/voice`                            | voice dictation for coding agents          | developer dictation, dictate coding prompts, code-aware speech-to-text |
| `/relay`                            | exact-version documentation MCP server     | sourced coding-agent context, documentation MCP, package evidence      |
| `/guides/voice-coding-agents`       | how voice coding agents work               | dictate prompts, review code terms, speech-to-text for developers      |
| `/guides/coding-agent-context`      | coding-agent context engineering           | high-signal context, current documentation, context failure modes      |
| `/guides/mcp-documentation-servers` | MCP documentation servers                  | MCP resources, tools, source locators, version resolution              |

## Technical implementation

- Keep the homepage, product pages, guides, about page, and privacy notice indexable.
- Keep `/early-access` and `/signal` out of the sitemap and marked `noindex,follow`.
- Prerender public marketing and guide pages.
- Publish one canonical URL per page and list only canonical indexable URLs in the sitemap.
- Put Organization and WebSite structured data on the homepage, SoftwareApplication and breadcrumb data on product pages, and TechArticle and breadcrumb data on guide pages.
- Link guides from the primary navigation, product pages, guide hub, related-guide blocks, and footer using descriptive anchors.
- Avoid unsupported ratings, testimonials, prices, release dates, or performance claims.

## Unknowns and measurement plan

Public `site:codeloud.xyz` searches returned no indexed pages during this review. Search Console had only recently received the sitemap, so this does not establish a crawl defect. Indexing and rankings require time, external discovery, and useful content.

The repository does not contain keyword-volume or conversion data. After impressions appear in Search Console:

1. group queries by the page receiving impressions;
2. improve pages where query intent matches but click-through rate is weak;
3. create new pages only when recurring queries reveal a distinct user goal;
4. merge or remove pages that compete for the same intent;
5. seek relevant external references through product documentation, integrations, release notes, and technically substantive writing rather than purchased links.

## Constraint

No ethical SEO implementation can guarantee first place. Technical quality enables crawling and understanding; durable rankings also require product usefulness, first-hand content, trusted external links, time, and demonstrated user satisfaction.
