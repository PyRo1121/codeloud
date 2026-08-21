<section class="family-map" aria-label="The CodeLoud product family">
	<header aria-hidden="true">
		<span>Tool</span>
		<span>What it fixes</span>
		<span>What you get</span>
	</header>

	<article>
		<div class="product-id">
			<span>01 / Input</span>
			<h2>Voice</h2>
		</div>
		<div class="problem">
			<span>Developer → agent</span>
			<p>Spoken instructions lose project terms, identifiers, paths, and commands.</p>
		</div>
		<div class="slash" aria-hidden="true">/</div>
		<div class="outcome">
			<span>Review before sending</span>
			<p>Code-aware text you can inspect before it reaches your editor or agent.</p>
		</div>
	</article>

	<article>
		<div class="product-id">
			<span>02 / Context</span>
			<h2>Relay</h2>
		</div>
		<div class="problem">
			<span>Agent → answer</span>
			<p>Technical answers drift across versions, weak sources, and missing evidence.</p>
		</div>
		<div class="slash" aria-hidden="true">/</div>
		<div class="outcome">
			<span>Verify before trusting</span>
			<p>Exact-version, source-linked context with ambiguity handled explicitly.</p>
		</div>
	</article>

	<footer>
		<span>Use either tool independently</span>
		<strong>Together: cleaner instructions in / inspectable context back</strong>
	</footer>
</section>

<style>
	.family-map {
		border-block: 1px solid var(--line-strong);
	}

	header,
	article {
		display: grid;
		grid-template-columns: 10rem minmax(0, 1fr) 4.25rem minmax(0, 1fr);
	}

	header {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.58rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	header span {
		padding: 0.7rem 1rem;
	}

	header span:first-child {
		padding-left: 0;
	}

	header span:nth-child(2) {
		grid-column: 2;
	}

	header span:last-child {
		grid-column: 4;
	}

	article {
		min-height: 9.5rem;
		border-top: 1px solid var(--line);
	}

	.product-id,
	.problem,
	.outcome {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1.4rem;
	}

	.product-id {
		border-right: 1px solid var(--line);
		padding-left: 0;
	}

	.product-id span,
	.problem > span,
	.outcome > span,
	footer {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.58rem;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	.product-id h2 {
		margin: 0.6rem 0 0;
		font-size: clamp(1.5rem, 2vw, 2.15rem);
		font-weight: 650;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.problem p,
	.outcome p {
		max-width: 36ch;
		margin: 0.65rem 0 0;
		font-size: clamp(0.92rem, 1.25vw, 1.12rem);
		font-weight: 550;
		letter-spacing: -0.02em;
		line-height: 1.3;
	}

	.problem p {
		color: var(--muted);
	}

	.outcome {
		background: var(--surface);
	}

	.outcome > span {
		color: var(--accent);
	}

	.slash {
		display: grid;
		place-items: center;
		background: var(--accent);
		color: #111;
		font-size: 1.6rem;
		font-weight: 800;
	}

	footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-top: 1px solid var(--line);
		padding: 0.75rem 0;
	}

	footer strong {
		color: var(--text);
		font-weight: 500;
	}

	@media (max-width: 760px) {
		header {
			display: none;
		}

		article {
			grid-template-columns: 4.4rem minmax(0, 1fr) 2.5rem minmax(0, 1fr);
			min-height: 9.5rem;
		}

		.product-id,
		.problem,
		.outcome {
			padding: 0.75rem;
		}

		.product-id {
			padding-left: 0;
		}

		.product-id span,
		.problem > span,
		.outcome > span,
		footer {
			font-size: 0.48rem;
		}

		.product-id h2 {
			font-size: 1rem;
			writing-mode: vertical-rl;
		}

		.problem p,
		.outcome p {
			font-size: 0.74rem;
		}

		.slash {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 480px) {
		article {
			grid-template-columns: 3.35rem minmax(0, 1fr) 2rem minmax(0, 1fr);
		}

		.product-id,
		.problem,
		.outcome {
			padding: 0.6rem;
		}

		.product-id {
			padding-left: 0;
		}

		.product-id span {
			display: none;
		}

		.problem p,
		.outcome p {
			font-size: 0.68rem;
		}

		footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
