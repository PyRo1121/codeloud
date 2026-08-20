<script lang="ts">
	import { browser } from "$app/environment";
	import { prefersReducedMotion } from "svelte/motion";
	import type { ProductId } from "$lib/domain/product-catalog";

	interface Props {
		readonly activeProduct?: ProductId;
	}

	let { activeProduct = "voice" }: Props = $props();
	const reduced = prefersReducedMotion;
</script>

{#snippet fallback()}
	<div class="handoff-fallback" aria-hidden="true">
		<span class="fallback-node fallback-node-voice"></span>
		<span class="fallback-node fallback-node-relay"></span>
		<span class="fallback-node fallback-node-core"></span>
	</div>
{/snippet}

{#if !browser || reduced.current}
	{@render fallback()}
{:else}
	{#await import("./HandoffField.svelte") then { default: HandoffField }}
		<svelte:boundary>
			<HandoffField {activeProduct} />
			{#snippet failed()}
				{@render fallback()}
			{/snippet}
		</svelte:boundary>
	{:catch}
		{@render fallback()}
	{/await}
{/if}

<style>
	.handoff-fallback {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
	}

	.fallback-node {
		position: absolute;
		width: 4rem;
		aspect-ratio: 1;
		border: 1px solid currentColor;
		transform: rotate(45deg);
	}

	.fallback-node-voice {
		left: 20%;
		top: 22%;
		color: var(--voice);
	}

	.fallback-node-relay {
		right: 20%;
		bottom: 22%;
		color: var(--relay);
	}

	.fallback-node-core {
		width: 5rem;
		color: var(--text);
		opacity: 0.72;
	}
</style>
