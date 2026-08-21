<section class="demo-shell" aria-label="How CodeLoud Voice and Relay reduce correction work">
	<header class="ledger-head" aria-hidden="true">
		<span>Failure</span>
		<span>CodeLoud</span>
		<span>Agent-ready result</span>
	</header>

	<article class="ledger-row">
		<div class="product-id">
			<span>01 / Input</span>
			<h2>Voice</h2>
		</div>
		<div class="example before">
			<span>Spoken intent</span>
			<p>“Add a retry to relay client when rate limit error returns.”</p>
		</div>
		<div class="operation" aria-label="Voice reviews the instruction">
			<b aria-hidden="true">/</b>
			<span>Review</span>
		</div>
		<div class="example after">
			<span>Reviewed instruction</span>
			<p>Add a retry to <mark>RelayClient</mark> when <mark>RateLimitError</mark> returns.</p>
		</div>
	</article>

	<article class="ledger-row">
		<div class="product-id">
			<span>02 / Context</span>
			<h2>Relay</h2>
		</div>
		<div class="example before">
			<span>Agent request</span>
			<p>“Find retry guidance for the Wrangler version installed here.”</p>
		</div>
		<div class="operation" aria-label="Relay resolves the technical context">
			<b aria-hidden="true">/</b>
			<span>Resolve</span>
		</div>
		<div class="example after">
			<span>Sourced context</span>
			<p><mark>wrangler@4.123.0</mark> · exact identity, bounded passages, source locators.</p>
		</div>
	</article>

	<footer>
		<span>Human review stays in the loop</span>
		<span>Ambiguity fails closed</span>
	</footer>
</section>

<style>
	.demo-shell {
		border-block: 1px solid var(--line-strong);
	}

	.ledger-head,
	.ledger-row {
		display: grid;
		grid-template-columns: 10rem minmax(0, 1fr) 4.25rem minmax(0, 1fr);
	}

	.ledger-head {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.58rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.ledger-head span {
		padding: 0.7rem 1rem;
	}

	.ledger-head span:first-child {
		grid-column: 2;
	}

	.ledger-head span:nth-child(2) {
		grid-column: 3;
		padding-inline: 0;
		text-align: center;
	}

	.ledger-head span:last-child {
		grid-column: 4;
	}

	.ledger-row {
		min-height: 10.5rem;
		border-top: 1px solid var(--line);
	}

	.product-id,
	.example {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1.5rem;
	}

	.product-id {
		border-right: 1px solid var(--line);
		padding-left: 0;
	}

	.product-id span,
	.example > span,
	footer {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.58rem;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	.product-id h2 {
		margin: 0.65rem 0 0;
		font-size: clamp(1.5rem, 2.2vw, 2.25rem);
		font-weight: 650;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.example p {
		max-width: 30ch;
		margin: 0.7rem 0 0;
		font-size: clamp(0.95rem, 1.4vw, 1.25rem);
		font-weight: 560;
		letter-spacing: -0.025em;
		line-height: 1.25;
	}

	.before {
		color: var(--muted-light, var(--text));
	}

	.after {
		background: var(--surface);
	}

	mark {
		background: var(--accent-soft);
		padding: 0.05em 0.14em;
		color: var(--text);
	}

	.operation {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		background: var(--accent);
		color: #111;
	}

	.operation b {
		font-size: 1.6rem;
		line-height: 1;
	}

	.operation span {
		font-family: var(--mono);
		font-size: 0.54rem;
		text-transform: uppercase;
		writing-mode: vertical-rl;
	}

	footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-top: 1px solid var(--line);
		padding: 0.75rem 0;
	}

	@media (max-width: 760px) {
		.ledger-head {
			display: none;
		}

		.ledger-row {
			grid-template-columns: 4.4rem minmax(0, 1fr) 2.5rem minmax(0, 1fr);
			min-height: 9.5rem;
		}

		.product-id,
		.example {
			padding: 0.75rem;
		}

		.product-id {
			padding-left: 0;
		}

		.product-id span,
		.example > span,
		footer {
			font-size: 0.48rem;
		}

		.product-id h2 {
			font-size: 1rem;
			writing-mode: vertical-rl;
		}

		.example p {
			font-size: 0.76rem;
			line-height: 1.3;
		}

		.operation span {
			display: none;
		}

		.operation b {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 480px) {
		.ledger-row {
			grid-template-columns: 3.35rem minmax(0, 1fr) 2rem minmax(0, 1fr);
		}

		.product-id,
		.example {
			padding: 0.6rem;
		}

		.product-id {
			padding-left: 0;
		}

		.product-id span {
			display: none;
		}

		.example p {
			font-size: 0.68rem;
		}

		footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
