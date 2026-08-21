<script lang="ts">
	import { resolve } from "$app/paths";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import type { ProductPageDefinition } from "$lib/domain/product-pages";

	interface Props {
		readonly page: ProductPageDefinition;
	}

	let { page }: Props = $props();
</script>

<SiteHeader active={page.id} />

<main class={`detail-page detail-${page.id}`}>
	<section class="detail-hero page-shell">
		<div>
			<p class="mono-label">{page.eyebrow}</p>
			<h1>{page.title}</h1>
			<p class="detail-promise">{page.promise}</p>
			{#if page.cta._tag === "external"}
				<a class="detail-cta" href={page.cta.url} target="_blank" rel="external noopener">
					{page.ctaLabel}<span aria-hidden="true">↗</span>
				</a>
			{:else}
				<a class="detail-cta" href={resolve(page.cta.url)}>
					{page.ctaLabel}<span aria-hidden="true">↘</span>
				</a>
			{/if}
		</div>
		<aside class="detail-stamp" aria-label={`${page.id} product status`}>
			<span>CODELOUD / {page.id}</span>
			<strong>{page.id === "voice" ? "INPUT" : "CONTEXT"}</strong>
			<span>{page.id === "voice" ? "human reviewed" : "evidence attached"}</span>
		</aside>
	</section>

	<section class="detail-section page-shell" aria-labelledby="problem-title">
		<header>
			<p class="mono-label">01 / The problem</p>
			<h2 id="problem-title">{page.problemTitle}</h2>
		</header>
		<p class="large-copy">{page.problem}</p>
	</section>

	<section class="detail-section workflow-section page-shell" aria-labelledby="workflow-title">
		<header>
			<p class="mono-label">02 / The workflow</p>
			<h2 id="workflow-title">{page.workflowTitle}</h2>
		</header>
		<ol class="workflow-list">
			{#each page.workflow as step, index (step)}
				<li>
					<span>{String(index + 1).padStart(2, "0")}</span>
					<p>{step}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="capabilities page-shell" aria-label={`${page.id} capabilities`}>
		<header>
			<p class="mono-label">03 / What it does</p>
			<h2>{page.capabilitiesTitle}</h2>
		</header>
		<div>
			{#each page.capabilities as capability, index (capability.title)}
				<article>
					<span>{String(index + 1).padStart(2, "0")}</span>
					<h3>{capability.title}</h3>
					<p>{capability.detail}</p>
				</article>
			{/each}
		</div>
	</section>

	<aside class="boundary page-shell" aria-labelledby="boundary-title">
		<p class="mono-label">Honest boundary</p>
		<h2 id="boundary-title">{page.boundaryTitle}</h2>
		<p>{page.boundary}</p>
	</aside>

	<section class="product-links page-shell" aria-labelledby="product-links-title">
		<div>
			<p class="mono-label">Continue exploring</p>
			<h2 id="product-links-title">See how the pieces fit.</h2>
		</div>
		<nav aria-label="Related CodeLoud pages">
			{#if page.id === "voice"}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- canonical static guide URL -->
				<a href="/guides/voice-coding-agents">
					<span>Guide</span><strong
						>Voice coding agents: dictate prompts without losing code terms</strong
					>
				</a>
				<a href={resolve("/relay")}>
					<span>CodeLoud Relay</span><strong
						>Add exact-version, sourced context to the workflow</strong
					>
				</a>
			{:else}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- canonical static guide URL -->
				<a href="/guides/mcp-documentation-servers">
					<span>Guide</span><strong>What coding agents need from an MCP documentation server</strong
					>
				</a>
				<a href={resolve("/voice")}>
					<span>CodeLoud Voice</span><strong>Make spoken developer instructions reviewable</strong>
				</a>
			{/if}
		</nav>
	</section>
</main>

<SiteFooter />

<style>
	.detail-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(15rem, 0.6fr);
		gap: clamp(3rem, 8vw, 8rem);
		align-items: end;
		min-height: 40rem;
		padding-block: 6rem 7rem;
	}

	.detail-hero .mono-label,
	.detail-section .mono-label,
	.capabilities .mono-label,
	.boundary .mono-label {
		margin: 0;
		color: var(--accent);
	}

	.detail-hero h1 {
		max-width: 11ch;
		margin: 1.4rem 0 0;
		font-size: clamp(4rem, 8vw, 8.5rem);
		font-weight: 650;
		line-height: 0.84;
		letter-spacing: -0.08em;
		text-wrap: balance;
	}

	.detail-promise {
		max-width: 50ch;
		margin: 2rem 0 0;
		color: var(--muted);
		font-size: clamp(1.05rem, 1.7vw, 1.35rem);
	}

	.detail-cta {
		display: flex;
		width: min(100%, 26rem);
		justify-content: space-between;
		margin-top: 2.5rem;
		border-top: 2px solid var(--text);
		padding: 0.9rem 0;
		font-family: var(--mono);
		font-size: 0.72rem;
		text-decoration: none;
	}

	.detail-cta span {
		color: var(--accent);
	}

	.detail-stamp {
		display: grid;
		gap: 1rem;
		border: 1px solid var(--line-strong);
		background: var(--paper-raised);
		padding: 1.4rem;
		box-shadow: 0.7rem 0.7rem 0 var(--ink-shadow);
		font-family: var(--mono);
		text-transform: uppercase;
		transform: rotate(1.5deg);
	}

	.detail-stamp span {
		color: var(--muted);
		font-size: 0.6rem;
	}

	.detail-stamp strong {
		border-block: 2px solid var(--text);
		padding-block: 1rem;
		color: var(--accent);
		font-size: clamp(2.2rem, 4vw, 4rem);
		letter-spacing: -0.07em;
	}

	.detail-section,
	.capabilities,
	.boundary,
	.product-links {
		border-top: 1px solid var(--line-strong);
		padding-block: 6rem;
	}

	.detail-section,
	.capabilities {
		display: grid;
		grid-template-columns: minmax(14rem, 0.65fr) 1.35fr;
		gap: clamp(3rem, 8vw, 8rem);
	}

	.detail-section h2,
	.capabilities header h2,
	.boundary h2 {
		max-width: 12ch;
		margin: 1rem 0 0;
		font-size: clamp(2.2rem, 4vw, 4.4rem);
		font-weight: 640;
		line-height: 0.94;
		letter-spacing: -0.06em;
		text-wrap: balance;
	}

	.large-copy {
		max-width: 42ch;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1.35rem, 2.3vw, 2.1rem);
		line-height: 1.35;
	}

	.workflow-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.workflow-list li {
		display: grid;
		grid-template-columns: 3rem 1fr;
		border-top: 1px solid var(--line-strong);
		padding: 1.25rem 0;
	}

	.workflow-list span,
	.capabilities article > span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.65rem;
	}

	.workflow-list p {
		max-width: 48ch;
		margin: 0;
	}

	.capabilities > div {
		border-top: 3px solid var(--text);
	}

	.capabilities article {
		display: grid;
		grid-template-columns: 3rem minmax(10rem, 0.7fr) 1.3fr;
		gap: 1.2rem;
		border-bottom: 1px solid var(--line-strong);
		padding: 1.5rem 0;
	}

	.capabilities h3,
	.capabilities p {
		margin: 0;
	}

	.capabilities h3 {
		font-size: 1.15rem;
		letter-spacing: -0.025em;
	}

	.capabilities p,
	.boundary > p:last-child {
		max-width: 44ch;
		color: var(--muted);
	}

	.boundary {
		display: grid;
		grid-template-columns: 0.4fr 0.65fr 0.95fr;
		gap: clamp(2rem, 6vw, 6rem);
	}

	.boundary h2,
	.boundary > p:last-child {
		margin: 0;
	}

	.boundary h2 {
		font-size: clamp(1.8rem, 3vw, 3.2rem);
	}

	.product-links {
		display: grid;
		grid-template-columns: minmax(14rem, 0.65fr) 1.35fr;
		gap: clamp(3rem, 8vw, 8rem);
	}

	.product-links .mono-label {
		margin: 0;
		color: var(--accent);
	}

	.product-links h2 {
		max-width: 10ch;
		margin: 1rem 0 0;
		font-size: clamp(2rem, 3.5vw, 3.6rem);
		font-weight: 640;
		line-height: 0.98;
		letter-spacing: -0.055em;
	}

	.product-links nav {
		display: grid;
		border-top: 1px solid var(--line-strong);
	}

	.product-links a {
		display: grid;
		gap: 0.7rem;
		border-bottom: 1px solid var(--line-strong);
		padding: 1.25rem 0;
		text-decoration: none;
	}

	.product-links a span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.product-links a strong {
		max-width: 36ch;
		font-size: 1.05rem;
		font-weight: 560;
	}

	@media (max-width: 780px) {
		.detail-hero,
		.detail-section,
		.capabilities,
		.boundary,
		.product-links {
			grid-template-columns: 1fr;
		}

		.detail-hero {
			min-height: auto;
			padding-block: 5rem;
		}

		.detail-hero h1 {
			font-size: clamp(3rem, 14vw, 5rem);
			overflow-wrap: anywhere;
		}

		.detail-stamp {
			width: min(100% - 1rem, 28rem);
		}

		.detail-section,
		.capabilities,
		.boundary,
		.product-links {
			padding-block: 4.5rem;
		}
	}

	@media (max-width: 540px) {
		.capabilities article {
			grid-template-columns: 2rem 1fr;
		}

		.capabilities article p {
			grid-column: 2;
		}
	}
</style>
