<script lang="ts">
	import { resolve } from "$app/paths";
	import type { ProductPageDefinition } from "$lib/domain/product-pages";

	interface Props {
		readonly page: ProductPageDefinition;
	}

	let { page }: Props = $props();
</script>

<header class="detail-header page-shell">
	<a class="detail-brand" href={resolve("/")}>CodeLoud</a>
	<nav aria-label="Product navigation">
		<a href={resolve("/voice")}>Voice</a>
		<a href={resolve("/relay")}>Relay</a>
		<a href={resolve("/privacy")}>Privacy</a>
	</nav>
	<a class="back-link" href={resolve("/")}>Family overview ↗</a>
</header>

<main class={`detail-page detail-${page.id}`}>
	<section class="detail-hero page-shell">
		<p class="mono-label">{page.eyebrow}</p>
		<h1>{page.title}</h1>
		<p class="detail-promise">{page.promise}</p>
		{#if page.cta._tag === "external"}
			<a class="detail-cta" href={page.cta.url} target="_blank" rel="external noopener"
				>{page.ctaLabel}<span aria-hidden="true">→</span></a
			>
		{:else}
			<a class="detail-cta" href={resolve(page.cta.url)}
				>{page.ctaLabel}<span aria-hidden="true">→</span></a
			>
		{/if}
	</section>

	<section class="detail-section page-shell" aria-labelledby="problem-title">
		<div>
			<p class="mono-label">The problem</p>
			<h2 id="problem-title">The edge is where meaning gets lost.</h2>
		</div>
		<p class="large-copy">{page.problem}</p>
	</section>

	<section class="detail-section page-shell" aria-labelledby="workflow-title">
		<div>
			<p class="mono-label">The workflow</p>
			<h2 id="workflow-title">A bounded path from input to evidence.</h2>
		</div>
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
		{#each page.capabilities as capability (capability.title)}
			<article>
				<h2>{capability.title}</h2>
				<p>{capability.detail}</p>
			</article>
		{/each}
	</section>

	<section class="boundary page-shell" aria-labelledby="boundary-title">
		<p class="mono-label">Honest boundary</p>
		<h2 id="boundary-title">{page.boundaryTitle}</h2>
		<p>{page.boundary}</p>
	</section>
</main>

<footer class="detail-footer page-shell">
	<a href={resolve("/")}>CodeLoud</a>
	<p>Voice improves what goes in. Relay improves what the agent can work from.</p>
	<a href={resolve("/privacy")}>Privacy</a>
</footer>

<style>
	.detail-header,
	.detail-footer {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 2rem;
		align-items: center;
		min-height: 5.5rem;
		border-bottom: 1px solid var(--line);
	}

	.detail-header nav {
		display: flex;
		gap: 1.4rem;
	}

	.detail-header a,
	.detail-footer a {
		text-decoration: none;
	}

	.detail-header nav a,
	.back-link,
	.detail-footer {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.68rem;
	}

	.back-link {
		justify-self: end;
	}

	.detail-brand {
		font-size: 1.05rem;
		font-weight: 800;
	}

	.detail-hero {
		display: grid;
		min-height: 44rem;
		align-content: center;
		padding-block: 6rem;
	}

	.detail-hero .mono-label,
	.detail-section .mono-label,
	.boundary .mono-label {
		color: var(--accent);
	}

	.detail-hero h1 {
		max-width: 13ch;
		margin: 1.4rem 0 0;
		font-size: clamp(3.8rem, 8vw, 8.8rem);
		font-weight: 540;
		line-height: 0.88;
		letter-spacing: -0.075em;
	}

	.detail-promise {
		max-width: 52ch;
		margin: 2.4rem 0 0;
		color: var(--muted);
		font-size: clamp(1.05rem, 1.7vw, 1.4rem);
	}

	.detail-cta {
		display: flex;
		width: min(100%, 28rem);
		justify-content: space-between;
		margin-top: 3rem;
		border: 1px solid var(--accent);
		padding: 1rem;
		color: var(--accent);
		text-decoration: none;
	}

	.detail-section {
		display: grid;
		grid-template-columns: minmax(14rem, 0.75fr) 1.25fr;
		gap: 5rem;
		border-top: 1px solid var(--line);
		padding-block: 7rem;
	}

	.detail-section h2,
	.boundary h2 {
		max-width: 13ch;
		margin: 1rem 0 0;
		font-size: clamp(2rem, 4vw, 4rem);
		line-height: 1;
		letter-spacing: -0.055em;
	}

	.large-copy {
		max-width: 44ch;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1.3rem, 2.2vw, 2rem);
	}

	.workflow-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.workflow-list li {
		display: grid;
		grid-template-columns: 3rem 1fr;
		border-top: 1px solid var(--line);
		padding: 1.2rem 0;
	}

	.workflow-list span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.68rem;
	}

	.workflow-list p {
		margin: 0;
	}

	.capabilities {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	.capabilities article {
		min-height: 22rem;
		border-right: 1px solid var(--line);
		padding: 2rem;
	}

	.capabilities article:last-child {
		border-right: 0;
	}

	.capabilities h2 {
		max-width: 9ch;
		margin: 0;
		font-size: clamp(1.8rem, 3vw, 3rem);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.capabilities p,
	.boundary > p:last-child {
		max-width: 42ch;
		margin-top: 2rem;
		color: var(--muted);
	}

	.boundary {
		padding-block: 7rem;
	}

	.detail-footer {
		min-height: 7rem;
		border-top: 1px solid var(--line);
		border-bottom: 0;
	}

	.detail-footer p {
		margin: 0;
	}

	.detail-footer a:last-child {
		justify-self: end;
	}

	.detail-voice {
		--accent: var(--voice);
	}

	.detail-relay {
		--accent: var(--relay);
	}

	@media (max-width: 760px) {
		.detail-header {
			grid-template-columns: 1fr auto;
		}

		.detail-header nav {
			display: none;
		}

		.detail-hero {
			min-height: auto;
			padding-block: 5rem;
		}

		.detail-section,
		.capabilities {
			grid-template-columns: 1fr;
		}

		.detail-section {
			gap: 3rem;
			padding-block: 5rem;
		}

		.capabilities article {
			min-height: 16rem;
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.detail-footer {
			grid-template-columns: 1fr;
			padding-block: 2rem;
		}

		.detail-footer a:last-child {
			justify-self: start;
		}
	}
</style>
