<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";
	import { fade } from "svelte/transition";
	import HandoffFieldLoader from "$lib/components/HandoffFieldLoader.svelte";
	import ProductPanel from "$lib/components/ProductPanel.svelte";
	import { contentForProduct } from "$lib/domain/product-content";
	import { INTEREST_SELECTIONS, type InterestSelection } from "$lib/domain/products";
	import { PRODUCTS, productFor, type ProductId } from "@codeloud/family";
	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
	let activeProduct = $state<ProductId>("voice");
	let interestProduct = $state<InterestSelection>("both");
	let selectedProduct = $derived(productFor(activeProduct));
	let selectedContent = $derived(contentForProduct(activeProduct));

	function selectInterest(selection: InterestSelection): void {
		interestProduct = selection;
	}

	function requestInterest(selection: InterestSelection): void {
		interestProduct = selection;
		document.getElementById("interest")?.scrollIntoView({ behavior: "smooth", block: "start" });
	}
</script>

<svelte:head>
	<title>CodeLoud | The missing layer between developers and coding agents</title>
	<meta
		name="description"
		content="CodeLoud Voice improves what goes in. CodeLoud Relay improves the technical context coding agents can work from."
	/>
	<meta property="og:title" content="CodeLoud | Voice and Relay for coding agents" />
	<meta
		property="og:description"
		content="CodeLoud Voice improves what goes in. CodeLoud Relay improves what the agent can work from."
	/>
	{#if data.turnstileSiteKey}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
</svelte:head>

<header class="site-header page-shell">
	<a class="brand" href={resolve("/")} aria-label="CodeLoud home">
		<span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
		<span>CodeLoud</span>
	</a>
	<nav aria-label="Primary navigation">
		<a href="#voice">Voice</a>
		<a href="#relay">Relay</a>
		<a href="#handoff">The handoff</a>
	</nav>
	<a class="header-status" href="#interest"><span></span>Explore the family</a>
</header>

<main>
	<section class="hero page-shell" aria-labelledby="hero-title">
		<div class="hero-copy">
			<p class="hero-kicker mono-label">CodeLoud / developer systems</p>
			<h1 id="hero-title">The missing layer between developers and coding agents.</h1>
			<p class="hero-subtitle">
				Voice improves what goes in. Relay improves what the agent can work from.
			</p>
			<p class="hero-description">
				CodeLoud makes the handoff from human intent to machine context more legible, reviewable,
				and useful.
			</p>
			<div class="hero-actions">
				<a class="hero-link hero-link-voice" href="#voice"
					>Explore Voice <span aria-hidden="true">↘</span></a
				>
				<a class="hero-link hero-link-relay" href="#relay"
					>Explore Relay <span aria-hidden="true">↘</span></a
				>
			</div>
			<div class="hero-footnote">
				<span>01</span><span>two products / one handoff</span><span>2026 / private builds</span>
			</div>
		</div>
		<div class="hero-visual">
			<HandoffFieldLoader {activeProduct} />
			<div class="visual-caption">
				<span>Illustrative product field</span><span>Voice ↔ Relay</span>
			</div>
		</div>
	</section>

	<section id="handoff" class="handoff-section page-shell" aria-labelledby="handoff-title">
		<div class="section-intro">
			<p class="mono-label">The handoff</p>
			<h2 id="handoff-title">Coding agents fail at the edges.</h2>
			<p>
				Speech can lose a symbol. Documentation can drift from a version. CodeLoud gives both sides
				of the handoff somewhere to be checked.
			</p>
		</div>
		<div class="handoff-steps" aria-label="CodeLoud handoff sequence">
			<div class="handoff-step step-voice">
				<span class="step-index">01</span>
				<strong>Say it</strong>
				<span>Prompt, path, package, command, idea.</span>
			</div>
			<div class="handoff-connector" aria-hidden="true">→</div>
			<div class="handoff-step step-review">
				<span class="step-index">02</span>
				<strong>Review it</strong>
				<span>Keep uncertain terms visible before delivery.</span>
			</div>
			<div class="handoff-connector" aria-hidden="true">→</div>
			<div class="handoff-step step-relay">
				<span class="step-index">03</span>
				<strong>Ground it</strong>
				<span>Give the agent exact, sourced context.</span>
			</div>
		</div>
	</section>

	<section class="product-switch page-shell" aria-labelledby="product-switch-title">
		<div class="switch-heading">
			<p class="mono-label">Two equal surfaces</p>
			<h2 id="product-switch-title">Choose the layer you want to inspect.</h2>
		</div>
		<div class="product-tabs" role="tablist" aria-label="Product preview">
			{#each PRODUCTS as product (product.id)}
				<button
					class={`product-tab product-tab-${product.id} ${activeProduct === product.id ? "active" : ""}`}
					role="tab"
					aria-selected={activeProduct === product.id}
					tabindex={activeProduct === product.id ? 0 : -1}
					onclick={() => (activeProduct = product.id)}
				>
					<span>{product.name}</span>
					<small>{product.status}</small>
				</button>
			{/each}
		</div>
		<div class="selected-product" aria-live="polite">
			{#key activeProduct}
				<div in:fade={{ duration: 220 }}>
					<span class={`selected-marker selected-marker-${activeProduct}`}></span>
					<strong>{selectedProduct?.name}</strong>
					<span>{selectedContent.heading}</span>
				</div>
			{/key}
		</div>
	</section>

	<section class="products page-shell" aria-label="CodeLoud products">
		{#each PRODUCTS as product (product.id)}
			<ProductPanel
				{product}
				content={contentForProduct(product.id)}
				onInterest={requestInterest}
			/>
		{/each}
	</section>

	<section id="interest" class="interest-section page-shell" aria-labelledby="interest-title">
		<div class="interest-copy">
			<p class="mono-label">Product access</p>
			<h2 id="interest-title">Start with the part of the handoff that feels most broken.</h2>
			<p>
				Voice is in private development. Relay is accepting private-beta applications. We are
				measuring interest by product, not collecting a generic waitlist.
			</p>
		</div>
		<div class="interest-actions">
			<button
				class="interest-action interest-action-voice"
				type="button"
				onclick={() => requestInterest("voice")}
			>
				<span>Register Voice interest</span>
				<small>Private development</small>
				<b aria-hidden="true">↗</b>
			</button>
			<button
				class="interest-action interest-action-relay"
				type="button"
				onclick={() => requestInterest("relay")}
			>
				<span>Apply for Relay beta</span>
				<small>Application reviewed by a person</small>
				<b aria-hidden="true">↗</b>
			</button>
		</div>
	</section>

	<section class="interest-form-section page-shell" aria-labelledby="interest-form-title">
		<div class="interest-form-heading">
			<p class="mono-label">Product signal</p>
			<h2 id="interest-form-title">Tell us where to look first.</h2>
			<p>
				Choose a product, describe the workflow, and leave a way to reach you. Registering interest
				does not guarantee access.
			</p>
		</div>
		<form class="interest-form" method="POST" action="?/interest" use:enhance>
			{#if data.turnstileSiteKey}
				<div class="turnstile-shell">
					<div
						class="cf-turnstile"
						data-sitekey={data.turnstileSiteKey}
						data-action="codeloud_interest"
						data-theme="dark"
					></div>
				</div>
			{:else}
				<p class="turnstile-unavailable">Interest capture is not configured in this environment.</p>
			{/if}
			<input type="hidden" name="product" value={interestProduct} />
			<div class="interest-choice" role="group" aria-label="Product interest">
				{#each INTEREST_SELECTIONS as choice (choice)}
					<button
						aria-pressed={interestProduct === choice}
						class={`interest-choice-button ${interestProduct === choice ? "interest-choice-active" : ""}`}
						type="button"
						onclick={() => selectInterest(choice)}
					>
						{choice === "both"
							? "Voice + Relay"
							: choice === "voice"
								? "CodeLoud Voice"
								: "CodeLoud Relay"}
					</button>
				{/each}
			</div>
			<div class="interest-fields">
				<label
					><span>Email *</span><input
						name="email"
						type="email"
						autocomplete="email"
						required
					/></label
				>
				<label><span>Name</span><input name="name" autocomplete="name" maxlength="120" /></label>
			</div>
			<label class="interest-workflow"
				><span>What would you want to try first? *</span><textarea
					name="workflow"
					maxlength="500"
					rows="4"
					required></textarea></label
			>
			{#if interestProduct === "voice" || interestProduct === "both"}
				<div class="interest-fields">
					<label
						><span>Operating system</span><input
							name="operatingSystem"
							maxlength="80"
							placeholder="Linux, macOS, or Windows"
						/></label
					>
					<label
						><span>Editor or terminal</span><input
							name="editor"
							maxlength="120"
							placeholder="VS Code, Neovim, terminal..."
						/></label
					>
				</div>
			{/if}
			{#if interestProduct === "relay" || interestProduct === "both"}
				<div class="interest-fields">
					<label
						><span>Coding agent or client</span><input
							name="codingClient"
							maxlength="120"
							placeholder="Pi, Claude Code, Cursor..."
						/></label
					>
					<label
						><span>Private sources</span><select name="privateSourceNeeded"
							><option value="">Not sure yet</option><option value="false"
								>Public sources are enough</option
							><option value="true">Private sources matter</option></select
						></label
					>
				</div>
			{/if}
			<label class="interest-consent"
				><input type="checkbox" name="privacyConsent" value="true" required /><span
					>I agree that CodeLoud may use this information to understand product interest and contact
					me about access. *</span
				></label
			>
			<label class="interest-honeypot" aria-hidden="true"
				>Website <input name="website" tabindex="-1" autocomplete="off" /></label
			>
			{#if form && "ok" in form && form.ok === true}
				<p class="interest-result interest-result-success" role="status">
					Interest noted for {form.product}. We will use this signal to shape access.
				</p>
			{:else if form && "message" in form}
				<p class="interest-result interest-result-error" role="alert">{form.message}</p>
			{/if}
			<button class="interest-submit" type="submit"
				>Send product signal <span aria-hidden="true">→</span></button
			>
		</form>
	</section>

	<section class="policy-section page-shell" aria-labelledby="policy-title">
		<div>
			<p class="mono-label">A note on Voice</p>
			<h2 id="policy-title">Useful before it is overconfident.</h2>
		</div>
		<p>
			Voice currently uses external speech providers. Audio and transcript handling depends on the
			selected provider, and retention and training-use policies are not uniform. CodeLoud does not
			make a universal zero-retention or deletion claim. Do not dictate credentials, secrets, or
			sensitive source material until the applicable provider policy has been reviewed.
		</p>
	</section>
</main>

<footer class="site-footer page-shell">
	<div class="brand">
		<span class="brand-mark" aria-hidden="true"><i></i><i></i></span><span>CodeLoud</span>
	</div>
	<p>Voice improves what goes in. Relay improves what the agent can work from.</p>
	<nav aria-label="Footer navigation">
		<a href="#voice">Voice</a><a href="#relay">Relay</a><a href="#interest">Access</a>
	</nav>
</footer>

<style>
	.site-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		min-height: 5rem;
		border-bottom: 1px solid var(--line);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		width: fit-content;
		font-size: 1.05rem;
		font-weight: 680;
		letter-spacing: -0.04em;
		text-decoration: none;
	}

	.brand-mark {
		position: relative;
		display: inline-block;
		width: 1.1rem;
		height: 1.1rem;
		border: 1px solid var(--line-strong);
		transform: rotate(45deg);
	}

	.brand-mark i {
		position: absolute;
		display: block;
		background: var(--signal);
	}

	.brand-mark i:first-child {
		inset: 0.18rem auto 0.18rem 50%;
		width: 1px;
	}

	.brand-mark i:last-child {
		top: 50%;
		right: 0.18rem;
		left: 0.18rem;
		height: 1px;
	}

	.site-header nav,
	.site-footer nav {
		display: flex;
		gap: 1.6rem;
	}

	.site-header nav a,
	.site-footer nav a {
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.68rem;
		text-decoration: none;
	}

	.site-header nav a:hover,
	.site-footer nav a:hover {
		color: var(--text);
	}

	.header-status {
		justify-self: end;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.65rem;
		text-decoration: none;
		text-transform: uppercase;
	}

	.header-status span {
		display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		margin-right: 0.45rem;
		border-radius: 999px;
		background: var(--voice);
		box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--voice) 12%, transparent);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(30rem, 1.05fr);
		gap: clamp(3rem, 8vw, 9rem);
		align-items: center;
		min-height: calc(100svh - 5rem);
		padding: 4.5rem 0 5rem;
	}

	.hero-copy {
		position: relative;
		z-index: 1;
	}

	.hero-kicker {
		margin: 0 0 2rem;
		color: var(--voice);
	}

	.hero h1 {
		max-width: 9.5ch;
		margin: 0;
		font-size: clamp(3.5rem, 7vw, 7.6rem);
		font-weight: 560;
		line-height: 0.88;
		letter-spacing: -0.085em;
		text-wrap: balance;
	}

	.hero-subtitle {
		max-width: 31ch;
		margin: 2.2rem 0 0;
		font-size: clamp(1.25rem, 2vw, 1.7rem);
		line-height: 1.15;
		letter-spacing: -0.04em;
	}

	.hero-description {
		max-width: 38ch;
		margin: 1.2rem 0 0;
		color: var(--muted);
		font-size: 1rem;
	}

	.hero-actions {
		display: flex;
		gap: 1.6rem;
		margin-top: 2.4rem;
	}

	.hero-link {
		border-bottom: 1px solid currentColor;
		padding: 0.35rem 0;
		font-size: 0.9rem;
		font-weight: 650;
		text-decoration: none;
	}

	.hero-link span {
		padding-left: 0.65rem;
		font-size: 1.15rem;
	}

	.hero-link-voice {
		color: var(--voice);
	}

	.hero-link-relay {
		color: var(--relay);
	}

	.hero-footnote {
		display: flex;
		gap: 1.1rem;
		margin-top: 4.6rem;
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.hero-footnote span:first-child {
		color: var(--text);
	}

	.hero-visual {
		position: relative;
	}

	.visual-caption {
		display: flex;
		justify-content: space-between;
		padding-top: 0.75rem;
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.handoff-section,
	.product-switch,
	.interest-section,
	.interest-form-section,
	.policy-section {
		border-top: 1px solid var(--line);
	}

	.handoff-section {
		display: grid;
		grid-template-columns: minmax(14rem, 0.7fr) 1.3fr;
		gap: 9vw;
		padding: 8rem 0;
	}

	.section-intro h2,
	.switch-heading h2,
	.interest-copy h2,
	.policy-section h2 {
		max-width: 10ch;
		margin: 1.3rem 0 0;
		font-size: clamp(2.6rem, 5vw, 5.3rem);
		font-weight: 560;
		line-height: 0.94;
		letter-spacing: -0.075em;
	}

	.section-intro .mono-label,
	.switch-heading .mono-label,
	.interest-copy .mono-label,
	.policy-section .mono-label {
		margin: 0;
		color: var(--muted);
	}

	.section-intro > p:last-child {
		max-width: 29ch;
		margin: 2rem 0 0;
		color: var(--muted);
	}

	.handoff-steps {
		align-self: end;
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		gap: 1rem;
		align-items: center;
	}

	.handoff-step {
		display: grid;
		gap: 0.45rem;
		min-height: 8rem;
		align-content: start;
		border-top: 1px solid var(--line-strong);
		padding-top: 1rem;
	}

	.handoff-step .step-index {
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.65rem;
	}

	.handoff-step strong {
		font-size: 1.25rem;
		letter-spacing: -0.04em;
	}

	.handoff-step > span:last-child {
		color: var(--muted);
		font-size: 0.82rem;
	}

	.step-voice {
		border-color: var(--voice);
	}

	.step-voice .step-index {
		color: var(--voice);
	}

	.step-relay {
		border-color: var(--relay);
	}

	.step-relay .step-index {
		color: var(--relay);
	}

	.handoff-connector {
		color: var(--line-strong);
		font-size: 1.5rem;
	}

	.product-switch {
		display: grid;
		grid-template-columns: minmax(14rem, 0.7fr) 1.3fr;
		gap: 9vw;
		padding: 3.2rem 0;
	}

	.switch-heading h2 {
		font-size: clamp(2rem, 3.5vw, 3.5rem);
	}

	.product-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-self: start;
		border-bottom: 1px solid var(--line);
	}

	.product-tab {
		display: grid;
		gap: 0.5rem;
		border: 0;
		border-top: 2px solid var(--line-strong);
		background: transparent;
		padding: 1rem 0.7rem 1rem 0;
		color: var(--muted);
		cursor: pointer;
		text-align: left;
	}

	.product-tab.active.product-tab-voice {
		border-color: var(--voice);
		color: var(--voice);
	}

	.product-tab.active.product-tab-relay {
		border-color: var(--relay);
		color: var(--relay);
	}

	.product-tab span {
		font-size: 1.05rem;
		font-weight: 650;
	}

	.product-tab small {
		color: var(--faint);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.selected-product {
		grid-column: 2;
		min-height: 2rem;
		margin-top: -1.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.selected-product > div {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.selected-product strong {
		color: var(--text);
	}

	.selected-marker {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
	}

	.selected-marker-voice {
		background: var(--voice);
	}

	.selected-marker-relay {
		background: var(--relay);
	}

	.products {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2.5rem, 8vw, 8rem);
		padding: 7rem 0 9rem;
	}

	.interest-section {
		display: grid;
		grid-template-columns: minmax(14rem, 0.7fr) 1.3fr;
		gap: 9vw;
		padding: 8rem 0;
	}

	.interest-form-section {
		display: grid;
		grid-template-columns: minmax(14rem, 0.7fr) 1.3fr;
		gap: 9vw;
		padding: 4rem 0 8rem;
	}

	.interest-copy > p:last-child {
		max-width: 37ch;
		margin: 2rem 0 0;
		color: var(--muted);
	}

	.interest-actions {
		display: grid;
		align-content: end;
	}

	.interest-action {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.25rem 1rem;
		border-top: 1px solid var(--line-strong);
		padding: 1.2rem 0;
		text-decoration: none;
	}

	.interest-action,
	.interest-choice-button,
	.interest-submit {
		cursor: pointer;
	}

	.interest-action span {
		font-size: 1.15rem;
		font-weight: 650;
	}

	.interest-action small {
		grid-column: 1;
		color: var(--muted);
		font-family: var(--mono);
		font-size: 0.62rem;
		text-transform: uppercase;
	}

	.interest-action b {
		grid-column: 2;
		grid-row: 1 / 3;
		align-self: center;
		font-size: 1.4rem;
		font-weight: 400;
	}

	.interest-action-voice span,
	.interest-action-voice b {
		color: var(--voice);
	}

	.interest-action-relay span,
	.interest-action-relay b {
		color: var(--relay);
	}

	.interest-form-heading h2 {
		max-width: 10ch;
		margin: 1.3rem 0 0;
		font-size: clamp(2.3rem, 4vw, 4rem);
		font-weight: 560;
		line-height: 0.94;
		letter-spacing: -0.075em;
	}

	.interest-form-heading .mono-label {
		margin: 0;
		color: var(--muted);
	}

	.interest-form-heading > p:last-child {
		max-width: 34ch;
		margin-top: 2rem;
		color: var(--muted);
	}

	.interest-form {
		display: grid;
		gap: 1rem;
		border-top: 1px solid var(--line-strong);
		padding-top: 1rem;
	}

	.interest-choice {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
	}

	.interest-choice-button {
		border: 1px solid var(--line);
		background: transparent;
		padding: 0.9rem 0.7rem;
		color: var(--muted);
		font-size: 0.78rem;
		text-align: left;
	}

	.interest-choice-button:hover,
	.interest-choice-active {
		border-color: var(--voice);
		color: var(--text);
	}

	.interest-fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.interest-form label {
		display: grid;
		gap: 0.45rem;
		color: var(--muted);
		font-size: 0.78rem;
	}

	.interest-form label > span {
		color: var(--text);
		font-size: 0.78rem;
	}

	.interest-form input,
	.interest-form textarea,
	.interest-form select {
		width: 100%;
		border: 1px solid var(--line);
		border-radius: 0;
		background: var(--surface);
		padding: 0.8rem;
		color: var(--text);
		outline: none;
	}

	.interest-form input:focus,
	.interest-form textarea:focus,
	.interest-form select:focus {
		border-color: var(--voice);
		box-shadow: inset 3px 0 0 var(--voice);
	}

	.interest-workflow {
		grid-column: 1 / -1;
	}

	.interest-consent {
		display: grid !important;
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: 0.65rem;
		margin-top: 0.4rem;
		font-size: 0.72rem !important;
	}

	.interest-consent input {
		width: auto;
		margin-top: 0.15rem;
		accent-color: var(--voice);
	}

	.interest-honeypot {
		position: absolute;
		width: 1px !important;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.interest-result {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.7rem;
	}

	.interest-result-success {
		color: var(--voice);
	}

	.interest-result-error {
		color: var(--relay);
	}

	.interest-submit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid var(--voice);
		background: var(--voice);
		padding: 1rem 1.1rem;
		color: #07110e;
		font-weight: 720;
	}

	.interest-submit span {
		font-size: 1.3rem;
	}

	.policy-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 9vw;
		padding: 5rem 0 7rem;
	}

	.policy-section h2 {
		font-size: clamp(2.3rem, 4vw, 4rem);
	}

	.policy-section > p {
		align-self: end;
		max-width: 58ch;
		margin: 0;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.site-footer {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 2rem;
		align-items: center;
		min-height: 7rem;
		border-top: 1px solid var(--line);
	}

	.site-footer p {
		justify-self: center;
		margin: 0;
		color: var(--faint);
		font-size: 0.72rem;
	}

	@media (max-width: 900px) {
		.site-header {
			grid-template-columns: 1fr auto;
		}

		.site-header nav {
			display: none;
		}

		.hero,
		.handoff-section,
		.product-switch,
		.interest-section,
		.interest-form-section,
		.policy-section {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}

		.hero {
			min-height: auto;
			padding: 4rem 0 6rem;
		}

		.hero-visual {
			order: -1;
		}

		.handoff-section,
		.interest-section,
		.interest-form-section {
			padding: 6rem 0;
		}

		.selected-product {
			grid-column: auto;
			margin-top: -2.3rem;
		}

		.products {
			grid-template-columns: 1fr;
			gap: 5rem;
			padding: 5rem 0 7rem;
		}

		.product-panel {
			min-height: 40rem;
		}

		.policy-section > p {
			align-self: start;
		}

		.interest-fields,
		.interest-choice {
			grid-template-columns: 1fr;
		}

		.site-footer {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 2rem 0;
		}

		.site-footer p {
			justify-self: start;
		}
	}

	@media (max-width: 560px) {
		.header-status {
			font-size: 0.58rem;
		}

		.hero h1 {
			font-size: clamp(3.4rem, 16vw, 5.2rem);
		}

		.hero-actions,
		.hero-footnote {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.8rem;
		}

		.handoff-steps {
			grid-template-columns: 1fr;
			gap: 1.3rem;
		}

		.handoff-connector {
			transform: rotate(90deg);
			justify-self: start;
		}

		.product-panel {
			min-height: 0;
		}
	}
</style>
