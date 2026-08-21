<script lang="ts">
	import { resolve } from "$app/paths";
	import type { ProductContent } from "$lib/domain/product-content";
	import type { ProductDefinition } from "$lib/domain/product-catalog";

	interface Props {
		readonly product: ProductDefinition;
		readonly content: ProductContent;
		readonly onInterest: (selection: ProductDefinition["id"]) => void;
	}

	let { product, content, onInterest }: Props = $props();
</script>

<article class={`product-panel product-${product.id}`} id={product.id}>
	<header class="product-meta">
		<p class="mono-label">{product.id === "voice" ? "01 / input" : "02 / context"}</p>
		<h3>{product.name}</h3>
		<span>{product.status}</span>
	</header>

	<div class="product-statement">
		<p class="product-eyebrow">{content.eyebrow}</p>
		<h4>{content.heading}</h4>
		<p>{content.body}</p>
		<a class="detail-link" href={resolve(product.pageUrl)}>Full product brief <span>→</span></a>
	</div>

	<div class="capability-list">
		{#each content.capabilities as capability, index (capability.title)}
			<div class="capability">
				<span>{String(index + 1).padStart(2, "0")}</span>
				<strong>{capability.title}</strong>
				<p>{capability.detail}</p>
			</div>
		{/each}
	</div>

	<footer class="product-footer">
		<p>{content.technicalNote}</p>
		{#if product.applyUrl}
			<a href={product.applyUrl} target="_blank" rel="external noopener">
				{content.cta}<span aria-hidden="true">↗</span>
			</a>
		{:else}
			<button type="button" onclick={() => onInterest(product.id)}>
				{content.cta}<span aria-hidden="true">↘</span>
			</button>
		{/if}
	</footer>
</article>

<style>
	.product-panel {
		display: grid;
		grid-template-columns: minmax(8rem, 0.35fr) minmax(15rem, 0.8fr) minmax(16rem, 0.85fr);
		gap: clamp(2rem, 5vw, 5rem);
		border-top: 3px solid var(--text);
		padding-top: 1.4rem;
	}

	.product-relay {
		margin-left: clamp(0rem, 6vw, 6rem);
	}

	.product-meta .mono-label,
	.product-eyebrow {
		margin: 0;
		color: var(--accent);
	}

	.product-meta h3 {
		margin: 0.8rem 0 0;
		font-size: clamp(1.4rem, 2vw, 2rem);
		letter-spacing: -0.045em;
	}

	.product-meta > span {
		display: block;
		margin-top: 0.5rem;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.product-eyebrow {
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.product-statement h4 {
		max-width: 11ch;
		margin: 1.1rem 0 0;
		font-size: clamp(2.2rem, 4vw, 4.5rem);
		font-weight: 640;
		line-height: 0.92;
		letter-spacing: -0.065em;
		text-wrap: balance;
	}

	.product-statement > p:nth-of-type(2) {
		max-width: 41ch;
		margin: 1.5rem 0 0;
		color: var(--muted);
	}

	.detail-link {
		display: inline-block;
		margin-top: 1.8rem;
		border-bottom: 1px solid var(--text);
		padding-bottom: 0.3rem;
		font-family: var(--mono);
		font-size: 0.66rem;
		text-decoration: none;
	}

	.detail-link span {
		margin-left: 0.5rem;
		color: var(--accent);
	}

	.capability-list {
		border-top: 1px solid var(--line-strong);
	}

	.capability {
		display: grid;
		grid-template-columns: 2rem 1fr;
		gap: 0.4rem 0.8rem;
		border-bottom: 1px solid var(--line);
		padding: 1rem 0;
	}

	.capability > span {
		grid-row: 1 / 3;
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.62rem;
	}

	.capability strong {
		font-size: 0.84rem;
	}

	.capability p {
		margin: 0;
		color: var(--muted);
		font-size: 0.78rem;
	}

	.product-footer {
		grid-column: 2 / -1;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2rem;
		align-items: end;
		border-top: 1px solid var(--line);
		padding-top: 1rem;
	}

	.product-footer p {
		max-width: 58ch;
		margin: 0;
		color: var(--muted);
		font-size: 0.68rem;
	}

	.product-footer a,
	.product-footer button {
		border: 0;
		border-bottom: 1px solid var(--accent);
		background: transparent;
		padding: 0.35rem 0;
		color: var(--accent);
		cursor: pointer;
		font-size: 0.78rem;
		font-weight: 700;
		text-decoration: none;
	}

	.product-footer a span,
	.product-footer button span {
		margin-left: 0.6rem;
	}

	@media (max-width: 1050px) {
		.product-panel {
			grid-template-columns: 0.35fr 0.65fr;
		}

		.capability-list {
			grid-column: 1 / -1;
		}

		.product-footer {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 620px) {
		.product-panel {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.product-relay {
			margin-left: 0;
		}

		.capability-list,
		.product-footer {
			grid-column: auto;
		}

		.product-footer {
			grid-template-columns: 1fr;
			align-items: start;
		}

		.product-footer a,
		.product-footer button {
			width: fit-content;
		}
	}
</style>
