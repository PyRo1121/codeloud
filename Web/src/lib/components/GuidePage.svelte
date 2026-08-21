<script lang="ts">
	import { resolve } from "$app/paths";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import { guideFor, type GuideDefinition } from "$lib/domain/guides";
	import { guideStructuredData, SITE_ORIGIN, SOCIAL_IMAGE_URL } from "$lib/domain/seo";

	interface Props {
		readonly guide: GuideDefinition;
	}

	let { guide }: Props = $props();
	let canonical = $derived(`${SITE_ORIGIN}/guides/${guide.slug}`);
	let structuredData = $derived(guideStructuredData(guide));
</script>

<svelte:head>
	<title>{guide.seoTitle}</title>
	<meta name="description" content={guide.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="CodeLoud" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={guide.title} />
	<meta property="og:description" content={guide.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SOCIAL_IMAGE_URL} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CodeLoud product family overview" />
	<meta property="article:section" content="Coding agent reliability" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={guide.title} />
	<meta name="twitter:description" content={guide.description} />
	<meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
	<meta name="twitter:image:alt" content="CodeLoud product family overview" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository-owned JSON-LD -->
	{@html '<script type="application/ld+json">' + structuredData + "<" + "/script>"}
</svelte:head>

<SiteHeader active="guides" />

<main class="guide page-shell">
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<a href={resolve("/")}>CodeLoud</a><span>/</span><a href={resolve("/guides")}>Guides</a><span
			>/</span
		><span aria-current="page">{guide.shortTitle}</span>
	</nav>

	<header class="guide-hero">
		<p>Coding-agent reliability guide</p>
		<h1>{guide.title}</h1>
		<strong>{guide.summary}</strong>
		<div>
			<span>Written and reviewed by CodeLoud</span><span>Primary sources linked below</span>
		</div>
	</header>

	<div class="guide-layout">
		<aside>
			<p>In this guide</p>
			<nav aria-label="Guide contents">
				{#each guide.sections as section (section.id)}
					<a href={`#${section.id}`}>{section.title}</a>
				{/each}
			</nav>
		</aside>

		<article class="guide-content">
			{#each guide.sections as section, sectionIndex (section.id)}
				<section id={section.id}>
					<span>{String(sectionIndex + 1).padStart(2, "0")}</span>
					<h2>{section.title}</h2>
					{#each section.paragraphs as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
					{#if section.points}
						<ul>
							{#each section.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
					{/if}
					{#if section.sourceIds}
						<p class="section-sources">
							Sources:
							{#each section.sourceIds as sourceId, sourceIndex (sourceId)}
								{@const source = guide.sources.find((candidate) => candidate.id === sourceId)}
								{#if source}
									<a href={source.url} rel="external noopener">{source.publisher}</a>{sourceIndex <
									section.sourceIds.length - 1
										? ", "
										: ""}
								{/if}
							{/each}
						</p>
					{/if}
				</section>
			{/each}

			<section class="sources" id="sources">
				<span>Sources</span>
				<h2>Primary references</h2>
				<ol>
					{#each guide.sources as source (source.id)}
						<li>
							<a href={source.url} rel="external noopener">{source.title}</a>
							<small>{source.publisher}</small>
						</li>
					{/each}
				</ol>
			</section>
		</article>
	</div>

	<section class="guide-cta" aria-labelledby="guide-cta-title">
		<div>
			<span>{guide.product === "voice" ? "CodeLoud Voice" : "CodeLoud Relay"}</span>
			<h2 id="guide-cta-title">
				{guide.product === "voice"
					? "Make spoken developer intent reviewable."
					: "Give coding agents exact-version, sourced context."}
			</h2>
		</div>
		<a href={resolve(`/${guide.product}`)}
			>Explore CodeLoud {guide.product === "voice" ? "Voice" : "Relay"} →</a
		>
	</section>

	{#if guide.related.length > 0}
		<section class="related" aria-labelledby="related-title">
			<h2 id="related-title">Related guides</h2>
			<div>
				{#each guide.related as relatedSlug (relatedSlug)}
					{@const relatedGuide = guideFor(relatedSlug)}
					{#if relatedGuide}
						<a href={resolve("/guides/[slug]", { slug: relatedGuide.slug })}>
							<span>{relatedGuide.shortTitle}</span>
							<strong>{relatedGuide.title}</strong>
						</a>
					{/if}
				{/each}
			</div>
		</section>
	{/if}
</main>

<SiteFooter />

<style>
	.guide {
		padding-block: 1.5rem 6rem;
	}

	.breadcrumbs {
		display: flex;
		gap: 0.6rem;
		align-items: center;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.62rem;
	}

	.breadcrumbs a {
		text-decoration-color: var(--line-strong);
		text-underline-offset: 0.25rem;
	}

	.guide-hero {
		max-width: 68rem;
		padding-block: 5rem 5.5rem;
	}

	.guide-hero > p,
	.guide-cta span {
		margin: 0;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.65rem;
		text-transform: uppercase;
	}

	.guide-hero h1 {
		max-width: 18ch;
		margin: 1.2rem 0 0;
		font-size: clamp(3rem, 6.2vw, 6.5rem);
		font-weight: 650;
		line-height: 0.92;
		letter-spacing: -0.07em;
		text-wrap: balance;
	}

	.guide-hero > strong {
		display: block;
		max-width: 58ch;
		margin-top: 2rem;
		color: var(--muted);
		font-size: clamp(1.1rem, 1.7vw, 1.35rem);
		font-weight: 450;
	}

	.guide-hero > div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.5rem;
		margin-top: 1.5rem;
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.6rem;
	}

	.guide-layout {
		display: grid;
		grid-template-columns: 14rem minmax(0, 46rem);
		gap: clamp(3rem, 9vw, 9rem);
		border-top: 1px solid var(--line-strong);
		padding-top: 4rem;
	}

	.guide-layout > aside {
		position: sticky;
		top: 2rem;
		align-self: start;
	}

	.guide-layout > aside p {
		margin: 0 0 1rem;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.guide-layout > aside nav {
		display: grid;
	}

	.guide-layout > aside a {
		border-top: 1px solid var(--line);
		padding: 0.75rem 0;
		color: var(--muted);
		font-size: 0.76rem;
		text-decoration: none;
	}

	.guide-layout > aside a:hover {
		color: var(--text);
	}

	.guide-content > section {
		scroll-margin-top: 2rem;
		border-top: 1px solid var(--line);
		padding-block: 3.5rem;
	}

	.guide-content > section:first-child {
		border-top: 0;
		padding-top: 0;
	}

	.guide-content section > span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.62rem;
	}

	.guide-content h2 {
		max-width: 20ch;
		margin: 0.8rem 0 1.8rem;
		font-size: clamp(2rem, 3.6vw, 3.4rem);
		font-weight: 630;
		line-height: 1;
		letter-spacing: -0.055em;
		text-wrap: balance;
	}

	.guide-content p {
		max-width: 68ch;
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.75;
	}

	.guide-content ul {
		display: grid;
		margin: 2rem 0;
		padding: 0;
		list-style: none;
	}

	.guide-content li {
		border-top: 1px solid var(--line);
		padding: 0.8rem 0;
	}

	.section-sources {
		font-family: var(--mono);
		font-size: 0.65rem !important;
	}

	.section-sources a,
	.sources a {
		color: var(--text);
		text-decoration-color: var(--accent);
		text-underline-offset: 0.2rem;
	}

	.sources ol {
		margin: 0;
		padding-left: 1.5rem;
	}

	.sources li {
		padding-left: 0.5rem;
	}

	.sources small {
		display: block;
		margin-top: 0.25rem;
		color: var(--muted);
	}

	.guide-cta,
	.related {
		border-top: 1px solid var(--line-strong);
		padding-block: 4rem;
	}

	.guide-cta {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: end;
		margin-top: 2rem;
	}

	.guide-cta h2,
	.related h2 {
		max-width: 16ch;
		margin: 0.8rem 0 0;
		font-size: clamp(2rem, 3.5vw, 3.5rem);
		font-weight: 630;
		line-height: 1;
		letter-spacing: -0.055em;
	}

	.guide-cta > a {
		border: 1px solid var(--accent);
		background: var(--accent);
		padding: 0.9rem 1rem;
		color: #111;
		font-size: 0.78rem;
		font-weight: 700;
		text-decoration: none;
	}

	.related > div {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1px;
		margin-top: 2rem;
		background: var(--line);
	}

	.related a {
		display: grid;
		gap: 0.7rem;
		background: var(--bg);
		padding: 1.5rem;
		text-decoration: none;
	}

	.related a span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.related a strong {
		font-size: 1.15rem;
		font-weight: 580;
	}

	@media (max-width: 760px) {
		.guide-hero {
			padding-block: 3.5rem 4rem;
		}

		.guide-hero h1 {
			font-size: clamp(2.75rem, 12vw, 4.5rem);
		}

		.guide-layout {
			grid-template-columns: 1fr;
			padding-top: 2rem;
		}

		.guide-layout > aside {
			position: static;
		}

		.guide-cta {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.related > div {
			grid-template-columns: 1fr;
		}
	}
</style>
