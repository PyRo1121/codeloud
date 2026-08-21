<script lang="ts">
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import { GUIDE_LIST } from "$lib/domain/guides";
	import { SITE_ORIGIN, SOCIAL_IMAGE_URL } from "$lib/domain/seo";
</script>

<svelte:head>
	<title>Coding Agent Reliability Guides | CodeLoud</title>
	<meta
		name="description"
		content="Practical, sourced guides to voice coding agents, coding-agent context engineering, and MCP documentation servers."
	/>
	<link rel="canonical" href={`${SITE_ORIGIN}/guides`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="Coding Agent Reliability Guides | CodeLoud" />
	<meta
		property="og:description"
		content="Practical, sourced guides for more reliable coding-agent input and context."
	/>
	<meta property="og:url" content={`${SITE_ORIGIN}/guides`} />
	<meta property="og:image" content={SOCIAL_IMAGE_URL} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CodeLoud product family overview" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Coding Agent Reliability Guides | CodeLoud" />
	<meta
		name="twitter:description"
		content="Practical, sourced guides for more reliable coding-agent input and context."
	/>
	<meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
	<meta name="twitter:image:alt" content="CodeLoud product family overview" />
</svelte:head>

<SiteHeader active="guides" />

<main class="guides page-shell">
	<header>
		<p>CodeLoud guides</p>
		<h1>Build coding-agent workflows that are easier to direct and verify.</h1>
		<span>
			Original, sourced guidance on voice input, context engineering, exact-version documentation,
			and MCP.
		</span>
	</header>

	<section aria-labelledby="guide-list-title">
		<h2 id="guide-list-title">Start with the correction loop costing you time.</h2>
		<div class="guide-list">
			{#each GUIDE_LIST as guide, index (guide.slug)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- canonical static guide URL -->
				<a href={`/guides/${guide.slug}`}>
					<span>{String(index + 1).padStart(2, "0")} / {guide.product}</span>
					<h3>{guide.title}</h3>
					<p>{guide.description}</p>
					<strong>Read guide →</strong>
				</a>
			{/each}
		</div>
	</section>
</main>

<SiteFooter />

<style>
	.guides {
		padding-block: 5rem 7rem;
	}

	.guides > header {
		max-width: 72rem;
		padding-bottom: 5rem;
	}

	.guides > header > p {
		margin: 0;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.65rem;
		text-transform: uppercase;
	}

	h1 {
		max-width: 22ch;
		margin: 1.2rem 0 0;
		font-size: clamp(3.2rem, 5vw, 5.5rem);
		font-weight: 650;
		line-height: 0.9;
		letter-spacing: -0.075em;
		text-wrap: balance;
	}

	.guides > header > span {
		display: block;
		max-width: 52ch;
		margin-top: 2rem;
		color: var(--muted);
		font-size: clamp(1rem, 1.4vw, 1.2rem);
	}

	.guides > section {
		border-top: 1px solid var(--line-strong);
		padding-top: 4rem;
	}

	.guides > section > h2 {
		max-width: 20ch;
		margin: 0 0 2.5rem;
		font-size: clamp(2rem, 3.5vw, 3.5rem);
		font-weight: 630;
		line-height: 1;
		letter-spacing: -0.055em;
	}

	.guide-list {
		border-top: 1px solid var(--line);
	}

	.guide-list a {
		display: grid;
		grid-template-columns: 8rem minmax(16rem, 1fr) minmax(15rem, 0.7fr) auto;
		gap: 2rem;
		align-items: start;
		border-bottom: 1px solid var(--line);
		padding: 2rem 0;
		text-decoration: none;
		transition: background 160ms ease;
	}

	.guide-list a:hover {
		background: var(--surface);
	}

	.guide-list span,
	.guide-list strong {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.6rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	.guide-list h3,
	.guide-list p {
		margin: 0;
	}

	.guide-list h3 {
		font-size: clamp(1.35rem, 2.2vw, 2.2rem);
		font-weight: 600;
		line-height: 1.08;
		letter-spacing: -0.04em;
	}

	.guide-list p {
		color: var(--muted);
		font-size: 0.85rem;
	}

	@media (max-width: 860px) {
		.guide-list a {
			grid-template-columns: 5rem 1fr;
		}

		.guide-list p,
		.guide-list strong {
			grid-column: 2;
		}
	}

	@media (max-width: 560px) {
		.guides {
			padding-block: 3.5rem 5rem;
		}

		h1 {
			font-size: clamp(2.8rem, 13vw, 4.5rem);
		}

		.guide-list a {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}

		.guide-list p,
		.guide-list strong {
			grid-column: 1;
		}
	}
</style>
