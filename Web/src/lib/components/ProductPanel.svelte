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
	<div class="product-panel-header">
		<div>
			<p class="mono-label">{content.eyebrow}</p>
			<h2>{product.name}</h2>
		</div>
		<span class="product-status">{product.status}</span>
	</div>
	<h3>{content.heading}</h3>
	<p class="product-body">{content.body}</p>
	<div class="capability-list">
		{#each content.capabilities as capability (capability.title)}
			<div class="capability">
				<strong>{capability.title}</strong>
				<span>{capability.detail}</span>
			</div>
		{/each}
	</div>
	<div class="product-panel-footer">
		<p>{content.technicalNote}</p>
		<a class="product-detail-link" href={resolve(product.pageUrl)}>Read the full product page →</a>
		{#if product.applyUrl}
			<a class="product-cta" href={product.applyUrl} target="_blank" rel="external noopener"
				>{content.cta}<span aria-hidden="true">↗</span></a
			>
		{:else}
			<button type="button" onclick={() => onInterest(product.id)}
				>{content.cta}<span aria-hidden="true">↗</span></button
			>
		{/if}
	</div>
</article>

<style>
	.product-panel {
		position: relative;
		display: flex;
		min-height: 44rem;
		flex-direction: column;
		border-top: 2px solid var(--line-strong);
		padding: 1.8rem 0 0;
	}

	.product-voice {
		border-color: var(--voice);
	}

	.product-relay {
		border-color: var(--relay);
	}

	.product-panel-header,
	.product-panel-footer {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.product-panel-header h2 {
		margin: 0.7rem 0 0;
		font-size: clamp(1.5rem, 2.4vw, 2.2rem);
		letter-spacing: -0.04em;
	}

	.product-panel .mono-label {
		margin: 0;
		color: var(--muted);
	}

	.product-voice .mono-label,
	.product-voice .product-panel-footer button {
		color: var(--voice);
	}

	.product-relay .mono-label,
	.product-relay .product-panel-footer .product-cta,
	.product-relay .product-panel-footer button {
		color: var(--relay);
	}

	.product-detail-link {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.68rem;
		text-decoration: none;
	}

	.product-detail-link:hover {
		color: var(--text);
	}

	.product-status {
		padding-top: 0.2rem;
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.65rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.product-panel h3 {
		max-width: 12ch;
		margin: 5rem 0 0;
		font-size: clamp(2.4rem, 4.7vw, 5.2rem);
		font-weight: 560;
		line-height: 0.95;
		letter-spacing: -0.07em;
	}

	.product-body {
		max-width: 42ch;
		margin: 1.8rem 0 0;
		color: var(--muted);
		font-size: 1.05rem;
	}

	.capability-list {
		margin-top: auto;
		border-top: 1px solid var(--line);
	}

	.capability {
		display: grid;
		grid-template-columns: minmax(9rem, 0.7fr) 1fr;
		gap: 1rem;
		border-bottom: 1px solid var(--line);
		padding: 1rem 0;
	}

	.capability strong {
		font-size: 0.88rem;
	}

	.capability span {
		color: var(--muted);
		font-size: 0.83rem;
	}

	.product-panel-footer {
		align-items: flex-end;
		padding-top: 1.4rem;
	}

	.product-panel-footer p {
		max-width: 32ch;
		margin: 0;
		color: var(--faint);
		font-size: 0.75rem;
	}

	.product-panel-footer button,
	.product-panel-footer .product-cta {
		border: 0;
		border-bottom: 1px solid currentColor;
		background: transparent;
		padding: 0.4rem 0;
		cursor: pointer;
		font-size: 0.82rem;
		font-weight: 650;
		text-decoration: none;
		white-space: nowrap;
	}

	.product-panel-footer button span,
	.product-panel-footer .product-cta span {
		padding-left: 0.8rem;
		font-size: 1.2rem;
	}

	@media (max-width: 760px) {
		.product-panel {
			min-height: 0;
			padding-bottom: 1rem;
		}

		.product-panel h3 {
			margin-top: 3.5rem;
		}

		.capability {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}

		.product-panel-footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
