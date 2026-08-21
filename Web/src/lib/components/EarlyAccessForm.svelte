<script lang="ts">
	import { resolve } from "$app/paths";
	import { INTEREST_SELECTIONS, type InterestSelection } from "$lib/domain/products";

	interface ActionResult {
		readonly ok?: boolean;
		readonly kind?: string;
		readonly message?: string;
		readonly product?: string;
	}

	interface Props {
		readonly siteKey: string | null;
		readonly selection: InterestSelection;
		readonly result?: ActionResult | null;
		readonly onSelect: (selection: InterestSelection) => void;
	}

	let { siteKey, selection, result = null, onSelect }: Props = $props();
</script>

<form class="contact-form" method="POST" action="?/interest">
	{#if siteKey}
		<div class="turnstile-shell">
			<div
				class="cf-turnstile"
				data-sitekey={siteKey}
				data-action="codeloud_interest"
				data-theme="dark"
			></div>
		</div>
	{:else}
		<p class="turnstile-unavailable">Interest capture is not configured in this environment.</p>
	{/if}

	<input type="hidden" name="product" value={selection} />
	<div class="product-choice" role="group" aria-label="Product interest">
		{#each INTEREST_SELECTIONS as choice (choice)}
			<button
				aria-pressed={selection === choice}
				class={selection === choice ? "choice-active" : ""}
				type="button"
				onclick={() => onSelect(choice)}
			>
				{choice === "both"
					? "Voice + Relay"
					: choice === "voice"
						? "CodeLoud Voice"
						: "CodeLoud Relay"}
			</button>
		{/each}
	</div>

	<div class="field-row">
		<label
			><span>Email *</span><input name="email" type="email" autocomplete="email" required /></label
		>
		<label><span>Name</span><input name="name" autocomplete="name" maxlength="120" /></label>
	</div>
	<label>
		<span>What would you want to try first? *</span>
		<textarea name="workflow" maxlength="500" rows="4" required></textarea>
	</label>

	{#if selection === "voice" || selection === "both"}
		<div class="field-row">
			<label>
				<span>Operating system</span>
				<input name="operatingSystem" maxlength="80" placeholder="Linux, macOS, or Windows" />
			</label>
			<label>
				<span>Editor or terminal</span>
				<input name="editor" maxlength="120" placeholder="VS Code, Neovim, terminal…" />
			</label>
		</div>
	{/if}

	{#if selection === "relay" || selection === "both"}
		<div class="field-row">
			<label>
				<span>Coding agent or client</span>
				<input name="codingClient" maxlength="120" placeholder="Pi, Claude Code, Cursor…" />
			</label>
			<label>
				<span>Private sources</span>
				<select name="privateSourceNeeded">
					<option value="">Not sure yet</option>
					<option value="false">Public sources are enough</option>
					<option value="true">Private sources matter</option>
				</select>
			</label>
		</div>
	{/if}

	<label class="consent">
		<input type="checkbox" name="privacyConsent" value="true" required />
		<span>
			CodeLoud may use this information to understand product interest and contact me about access.
			See the <a href={resolve("/privacy")}>privacy notice</a>. *
		</span>
	</label>
	<label class="honeypot" aria-hidden="true">
		Website <input name="website" tabindex="-1" autocomplete="off" />
	</label>

	{#if result?.kind === "contact" && result.ok === true}
		<p class="result result-success" role="status">
			Interest noted for {result.product}. We will use this signal to shape access.
		</p>
	{:else if result?.kind === "contact" && result.message}
		<p class="result result-error" role="alert">{result.message}</p>
	{/if}

	<button class="submit" type="submit">
		Request early access <span aria-hidden="true">→</span>
	</button>
</form>

<style>
	.contact-form {
		display: grid;
		gap: 1rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: var(--surface);
		padding: clamp(1rem, 3vw, 1.5rem);
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
	}

	.product-choice,
	.field-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.55rem;
	}

	.field-row {
		grid-template-columns: 1fr 1fr;
	}

	.product-choice button {
		border: 1px solid var(--line-strong);
		border-radius: 0.6rem;
		background: transparent;
		padding: 0.85rem;
		color: var(--muted);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 0.67rem;
		text-align: left;
		transition:
			background 180ms cubic-bezier(0.16, 1, 0.3, 1),
			color 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.product-choice button:hover,
	.product-choice button.choice-active {
		background: var(--text);
		color: var(--bg);
	}

	.product-choice button:active,
	.submit:active {
		transform: translateY(1px);
	}

	label {
		display: grid;
		gap: 0.4rem;
		color: var(--text);
		font-size: 0.75rem;
	}

	input,
	textarea,
	select {
		width: 100%;
		border: 1px solid var(--line-strong);
		border-radius: 0.55rem;
		background: var(--surface-raised);
		padding: 0.8rem;
		color: var(--text);
		outline: none;
	}

	input:focus,
	textarea:focus,
	select:focus {
		border-color: var(--accent);
		box-shadow: inset 3px 0 0 var(--accent);
	}

	.consent {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: 0.65rem;
		color: var(--muted);
		font-size: 0.7rem;
	}

	.consent input {
		width: auto;
		margin-top: 0.18rem;
		accent-color: var(--accent);
	}

	.honeypot {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.result {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.68rem;
	}

	.result-success {
		color: var(--positive);
	}

	.result-error {
		color: var(--accent);
	}

	.submit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 0;
		border-radius: 0.65rem;
		background: var(--text);
		padding: 1rem 1.1rem;
		color: var(--bg);
		cursor: pointer;
		font-weight: 720;
		transition:
			background 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.submit:hover {
		background: var(--accent);
	}

	.submit span {
		font-size: 1.2rem;
	}

	@media (max-width: 620px) {
		.product-choice,
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
