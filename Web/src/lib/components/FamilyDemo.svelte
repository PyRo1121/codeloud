<script lang="ts">
	type DemoProduct = "voice" | "relay";

	let activeProduct = $state<DemoProduct>("voice");
</script>

<div class="demo-shell">
	<header>
		<div class="demo-tabs" role="tablist" aria-label="CodeLoud product demonstration">
			<button
				class={activeProduct === "voice" ? "active" : ""}
				type="button"
				role="tab"
				aria-selected={activeProduct === "voice"}
				onclick={() => (activeProduct = "voice")}
			>
				Voice
			</button>
			<button
				class={activeProduct === "relay" ? "active" : ""}
				type="button"
				role="tab"
				aria-selected={activeProduct === "relay"}
				onclick={() => (activeProduct = "relay")}
			>
				Relay
			</button>
		</div>
		<span>Example workflow</span>
	</header>

	<div class="demo-content" aria-live="polite">
		{#if activeProduct === "voice"}
			<div class="demo-step input-step">
				<span>Spoken input</span>
				<p>“Add a retry to relay client when rate limit error returns.”</p>
			</div>
			<div class="demo-divider" aria-hidden="true"><b>/</b><span>review</span></div>
			<div class="demo-step output-step">
				<span>Reviewed text</span>
				<p>Add a retry to <mark>RelayClient</mark> when <mark>RateLimitError</mark> returns.</p>
				<small>Project terms remain visible before insertion.</small>
			</div>
		{:else}
			<div class="demo-step input-step">
				<span>Agent request</span>
				<p>“Find retry guidance for the Wrangler version installed here.”</p>
			</div>
			<div class="demo-divider" aria-hidden="true"><b>/</b><span>resolve</span></div>
			<div class="demo-step output-step">
				<span>Context returned</span>
				<p><mark>wrangler@4.123.0</mark> · exact identity resolved</p>
				<small>Bounded passages, source locators, and evidence status attached.</small>
			</div>
		{/if}
	</div>

	<footer>
		<span
			>{activeProduct === "voice"
				? "Human review stays in the loop"
				: "Ambiguity fails closed"}</span
		>
		<span>{activeProduct === "voice" ? "Input layer" : "Context layer"}</span>
	</footer>
</div>

<style>
	.demo-shell {
		border: 1px solid var(--line);
		border-radius: 1.15rem;
		background: var(--surface);
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
		overflow: hidden;
	}

	header,
	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.8rem 1rem;
	}

	header {
		border-bottom: 1px solid var(--line);
	}

	header > span,
	footer {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.6rem;
	}

	.demo-tabs {
		display: flex;
		gap: 0.25rem;
		padding: 0.2rem;
		border-radius: 0.65rem;
		background: var(--bg);
	}

	.demo-tabs button {
		border: 0;
		border-radius: 0.45rem;
		background: transparent;
		padding: 0.45rem 0.75rem;
		color: var(--muted);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 0.64rem;
		transition:
			background 180ms cubic-bezier(0.16, 1, 0.3, 1),
			color 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.demo-tabs button.active {
		background: var(--surface-raised);
		color: var(--text);
	}

	.demo-tabs button:active {
		transform: translateY(1px);
	}

	.demo-content {
		display: grid;
		grid-template-columns: 1fr 4.5rem 1fr;
		align-items: stretch;
		min-height: 21rem;
	}

	.demo-step {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(1.4rem, 4vw, 2.5rem);
	}

	.demo-step > span {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.demo-step p {
		margin: 1rem 0 0;
		font-size: clamp(1.15rem, 2vw, 1.65rem);
		font-weight: 580;
		line-height: 1.25;
		letter-spacing: -0.025em;
	}

	.demo-step small {
		max-width: 34ch;
		margin-top: 1.2rem;
		color: var(--muted);
		font-size: 0.72rem;
	}

	.demo-step mark {
		border-radius: 0.25rem;
		background: var(--accent-soft);
		padding: 0.08em 0.18em;
		color: var(--text);
	}

	.output-step {
		background: var(--surface-raised);
	}

	.demo-divider {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		background: var(--accent);
		color: #111;
	}

	.demo-divider b {
		font-size: 2rem;
		font-weight: 800;
	}

	.demo-divider span {
		font-family: var(--mono);
		font-size: 0.55rem;
		text-transform: uppercase;
		writing-mode: vertical-rl;
	}

	footer {
		border-top: 1px solid var(--line);
	}

	@media (max-width: 620px) {
		header > span {
			display: none;
		}

		.demo-content {
			grid-template-columns: 1fr;
			min-height: auto;
		}

		.demo-divider {
			min-height: 2.5rem;
			flex-direction: row;
		}

		.demo-divider b {
			font-size: 1.2rem;
		}

		.demo-divider span {
			writing-mode: initial;
		}

		footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
