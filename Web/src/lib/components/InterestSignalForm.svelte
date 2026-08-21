<script lang="ts">
	import {
		INTEREST_SIGNAL_PROBLEMS,
		TRIAL_INTENTS,
		type InterestSignalProblem,
		type TrialIntent,
	} from "$lib/domain/interest-signal";

	interface ActionResult {
		readonly ok: boolean;
		readonly kind?: string;
		readonly message?: string;
	}

	interface Props {
		readonly siteKey: string | null;
		readonly result?: ActionResult | null;
	}

	let { siteKey, result = null }: Props = $props();

	const problemLabels = {
		dictation_cleanup: "Fixing code terms after dictation",
		spoken_code_terms: "Speaking filenames, symbols, paths, and commands",
		exact_version_docs: "Finding documentation for the exact version in use",
		package_evaluation: "Evaluating packages before installation",
		sourced_research: "Getting sourced technical research into an agent",
	} satisfies Readonly<Record<InterestSignalProblem, string>>;

	const intentLabels = {
		yes: "Yes",
		maybe: "Maybe",
		not_yet: "Not yet",
	} satisfies Readonly<Record<TrialIntent, string>>;
</script>

<form class="signal-form" method="POST" action="?/signal">
	<fieldset>
		<legend>What costs you the most time?</legend>
		<div class="signal-options">
			{#each INTEREST_SIGNAL_PROBLEMS as problem, index (problem)}
				<label>
					<input name="problem" type="radio" value={problem} required={index === 0} />
					<span><b>{String(index + 1).padStart(2, "0")}</b>{problemLabels[problem]}</span>
				</label>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend>Would you try an early build in the next 30 days?</legend>
		<div class="intent-options">
			{#each TRIAL_INTENTS as intent, index (intent)}
				<label>
					<input name="trialIntent" type="radio" value={intent} required={index === 0} />
					<span>{intentLabels[intent]}</span>
				</label>
			{/each}
		</div>
	</fieldset>

	<label class="signal-honeypot" aria-hidden="true">
		Website <input name="website" tabindex="-1" autocomplete="off" />
	</label>

	{#if siteKey}
		<div class="turnstile-shell">
			<div
				class="cf-turnstile"
				data-sitekey={siteKey}
				data-action="codeloud_signal"
				data-theme="dark"
			></div>
		</div>
	{:else}
		<p class="turnstile-unavailable">Anonymous signals are not configured here.</p>
	{/if}

	{#if result?.kind === "signal" && result.ok}
		<p class="signal-result signal-success" role="status">Signal counted. Thank you.</p>
	{:else if result?.kind === "signal" && result.message}
		<p class="signal-result signal-error" role="alert">{result.message}</p>
	{/if}

	<button type="submit" disabled={!siteKey}>Send no-contact signal <span>→</span></button>
	<p class="privacy-note">
		No email or account. We retain only a daily aggregate of these choices—not your IP address, user
		agent, or an individual event row.
	</p>
</form>

<style>
	.signal-form,
	.signal-form fieldset {
		display: grid;
		gap: 1rem;
	}

	.signal-form fieldset {
		margin: 0;
		border: 0;
		padding: 0;
	}

	.signal-form legend {
		margin-bottom: 0.9rem;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.signal-options,
	.intent-options {
		display: grid;
		gap: 0.55rem;
	}

	.intent-options {
		grid-template-columns: repeat(3, 1fr);
	}

	label {
		cursor: pointer;
	}

	label input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	label span {
		display: flex;
		gap: 1rem;
		align-items: center;
		min-height: 3.2rem;
		border: 1px solid var(--line);
		padding: 0.75rem 0.9rem;
		background: rgb(17 21 21 / 76%);
		color: var(--muted);
		transition:
			border-color 160ms ease,
			color 160ms ease,
			background 160ms ease;
	}

	label span b {
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.62rem;
	}

	label input:checked + span {
		border-color: var(--voice);
		background: rgb(115 224 191 / 8%);
		color: var(--text);
	}

	label input:focus-visible + span {
		outline: 2px solid var(--voice);
		outline-offset: 3px;
	}

	.intent-options span {
		justify-content: center;
	}

	button {
		display: flex;
		justify-content: space-between;
		border: 0;
		padding: 1rem 1.1rem;
		background: var(--signal);
		color: #101313;
		font-weight: 750;
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	.privacy-note,
	.signal-result {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.66rem;
	}

	.privacy-note {
		color: var(--faint);
	}

	.signal-success {
		color: var(--voice);
	}

	.signal-error {
		color: #ff9b79;
	}

	.signal-honeypot {
		position: absolute;
		left: -10000px;
	}

	@media (max-width: 560px) {
		.intent-options {
			grid-template-columns: 1fr;
		}
	}
</style>
