<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { prefersReducedMotion } from "svelte/motion";
	import type { ProductId } from "$lib/domain/product-catalog";
	import HandoffScene from "./HandoffScene.svelte";

	interface Props {
		readonly activeProduct?: ProductId;
	}

	let { activeProduct = "voice" }: Props = $props();
	const reduced = prefersReducedMotion;
</script>

<div class="handoff-field" aria-hidden="true">
	<div class="field-label field-label-voice">VOICE / INPUT</div>
	<div class="field-label field-label-relay">RELAY / CONTEXT</div>
	{#if !reduced.current}
		<div class="handoff-canvas">
			<Canvas renderMode="on-demand" dpr={[1, 1.5]} colorManagementEnabled={true}>
				<HandoffScene {activeProduct} />
			</Canvas>
		</div>
	{/if}
</div>

<style>
	.handoff-field {
		position: relative;
		min-height: 28rem;
		border: 1px solid color-mix(in srgb, var(--line) 80%, transparent);
		background:
			radial-gradient(
				circle at 22% 26%,
				color-mix(in srgb, var(--voice) 12%, transparent),
				transparent 28%
			),
			radial-gradient(
				circle at 78% 74%,
				color-mix(in srgb, var(--relay) 12%, transparent),
				transparent 30%
			),
			var(--surface);
		overflow: hidden;
	}

	.handoff-field::before,
	.handoff-field::after {
		position: absolute;
		content: "";
		inset: 12% 10%;
		border: 1px solid color-mix(in srgb, var(--line-strong) 70%, transparent);
		transform: rotate(-13deg) skewX(-12deg);
		pointer-events: none;
	}

	.handoff-field::after {
		inset: 22% 18%;
		transform: rotate(9deg) skewX(9deg);
		border-color: color-mix(in srgb, var(--text) 20%, transparent);
	}

	.handoff-canvas,
	.handoff-canvas :global(div),
	.handoff-canvas :global(canvas) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.field-label {
		position: absolute;
		z-index: 2;
		font: 0.62rem/1 var(--mono);
		letter-spacing: 0.14em;
		color: var(--muted);
	}

	.field-label-voice {
		top: 1.25rem;
		left: 1.25rem;
		color: var(--voice);
	}

	.field-label-relay {
		right: 1.25rem;
		bottom: 1.25rem;
		color: var(--relay);
	}

	@media (max-width: 700px) {
		.handoff-field {
			min-height: 22rem;
		}
	}
</style>
