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
		<span>{product.status}</span>
	</header>

	<div class="product-statement">
		<p class="product-eyebrow">{content.eyebrow}</p>
		<h3>{product.name}</h3>
		<h4>{content.heading}</h4>
		<p>{content.body}</p>
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
		<a class="detail-link" href={resolve(product.pageUrl)}>Full product brief <span>→</span></a>
		{#if product.applyUrl}
			<a class="product-action" href={product.applyUrl} target="_blank" rel="external noopener">
				{content.cta}<span aria-hidden="true">↗</span>
			</a>
		{:else}
			<button class="product-action" type="button" onclick={() => onInterest(product.id)}>
				{content.cta}<span aria-hidden="true">↘</span>
			</button>
		{/if}
	</footer>
</article>

<style>
	.product-panel {
		display: flex;
		min-width: 0;
		flex-direction: column;
		background: var(--surface);
		padding: clamp(1.4rem, 3vw, 2.2rem);
	}

	.product-meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.product-meta .mono-label,
	.product-eyebrow {
		margin: 0;
		color: var(--accent);
	}

	.product-meta > span,
	.product-eyebrow {
		font-family: var(--mono);
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.product-meta > span {
		color: var(--muted);
	}

	.product-statement {
		margin-top: 3rem;
	}

	.product-statement h3 {
		margin: 0.7rem 0 0;
		font-size: 1rem;
		letter-spacing: -0.03em;
	}

	.product-statement h4 {
		max-width: 11ch;
		margin: 1.5rem 0 0;
		font-size: clamp(2.2rem, 4vw, 4rem);
		font-weight: 640;
		line-height: 0.9;
		letter-spacing: -0.065em;
		text-wrap: balance;
	}

	.product-statement > p:last-child {
		max-width: 41ch;
		margin: 1.3rem 0 0;
		color: var(--muted);
		font-size: 0.88rem;
	}

	.capability-list {
		margin-top: 2.5rem;
		border-top: 1px solid var(--line-strong);
	}

	.capability {
		display: grid;
		grid-template-columns: 2rem minmax(8rem, 0.7fr) 1.3fr;
		gap: 0.8rem;
		border-bottom: 1px solid var(--line);
		padding: 0.85rem 0;
	}

	.capability > span {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 0.6rem;
	}

	.capability strong {
		font-size: 0.76rem;
	}

	.capability p {
		margin: 0;
		color: var(--muted);
		font-size: 0.7rem;
	}

	.product-footer {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		justify-content: space-between;
		margin-top: auto;
		padding-top: 1.4rem;
	}

	.detail-link,
	.product-action {
		border: 0;
		border-bottom: 1px solid currentColor;
		background: transparent;
		padding: 0.3rem 0;
		font-family: var(--mono);
		font-size: 0.64rem;
		text-decoration: none;
	}

	.detail-link {
		color: var(--muted);
	}

	.product-action {
		color: var(--accent);
		cursor: pointer;
	}

	.detail-link span,
	.product-action span {
		margin-left: 0.4rem;
	}

	@media (max-width: 620px) {
		.product-statement {
			margin-top: 2.2rem;
		}

		.capability {
			grid-template-columns: 2rem 1fr;
		}

		.capability p {
			grid-column: 2;
		}
	}
</style>
