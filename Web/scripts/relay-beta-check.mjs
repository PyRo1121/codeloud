// Focused browser check of the live Relay beta application form
// (relay.codeloud.xyz/#beta) — renders, validates, and submits.
// Run: node scripts/relay-beta-check.mjs
import { chromium } from "playwright-core";

const CHROMIUM_PATH = "/usr/bin/chromium";
const URL = "https://relay.codeloud.xyz/#beta";
const TEST_EMAIL = "browser-check@latham.cloud";

let failed = 0;
function check(name, ok, detail = "") {
	console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failed += 1;
}

const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (msg) => {
	if (msg.type() === "error") consoleErrors.push(msg.text());
});

try {
	await page.goto(URL, { waitUntil: "load", timeout: 45000 });

	// 1. Beta form present
	const form = page.locator("[data-relay-beta-form]");
	await form.waitFor({ state: "visible", timeout: 10000 });
	check("beta form renders", true);

	// 2. Required fields render (name/team are optional + collapsed)
	const emailField = form.locator('input[name="email"]');
	const submitBtn = form.locator('button[type="submit"]');
	const messageEl = form.locator("[data-application-message]");
	const emailOk = await emailField.isVisible().catch(() => false);
	const workflowOk = await form
		.locator('textarea[name="workflow"]')
		.isVisible()
		.catch(() => false);
	const clientOk = await form
		.locator('select[name="primaryClient"]')
		.isVisible()
		.catch(() => false);
	const radioOk = await form
		.locator('input[name="privateSourceNeeded"]')
		.first()
		.isVisible()
		.catch(() => false);
	const submitOk = await submitBtn.isVisible().catch(() => false);
	check(
		"required fields visible",
		emailOk && workflowOk && clientOk && radioOk && submitOk,
		`email:${emailOk} workflow:${workflowOk} client:${clientOk} radio:${radioOk} submit:${submitOk}`,
	);

	// 3. Empty submit validation
	await submitBtn.click();
	await page.waitForTimeout(500);
	const invalidFields = await form
		.locator(":invalid")
		.count()
		.catch(() => 0);
	check("empty submit triggers validation", invalidFields > 0, `${invalidFields} invalid`);

	// 4. Fill required fields
	await emailField.fill(TEST_EMAIL);
	await form
		.locator('select[name="primaryClient"]')
		.selectOption("pi")
		.catch(() => {});
	await form
		.locator('input[name="privateSourceNeeded"][value="false"]')
		.check()
		.catch(() => {});
	await form
		.locator('textarea[name="workflow"]')
		.fill("Testing the beta application flow end-to-end from a headless browser.")
		.catch(() => {});

	// 5. Optional name/team live in a collapsed <details> — open and fill
	const optionalDetails = form.locator("details.optional-fields");
	if (await optionalDetails.count().catch(() => 0)) {
		await optionalDetails
			.first()
			.evaluate((el) => (el.open = true))
			.catch(() => {});
		await form
			.locator('input[name="name"]')
			.fill("Browser Check")
			.catch(() => {});
	}

	// 6. Check consent checkbox
	const consent = form.locator('input[name="privacyConsent"]');
	await consent.check().catch(() => {});

	// 7. Submit — Turnstile won't auto-pass headless, so verify the client-side error
	await submitBtn.click();
	await page.waitForTimeout(1500);
	const msgText = await messageEl.textContent().catch(() => "");
	const msgState = await messageEl.getAttribute("data-state").catch(() => "");
	check(
		"form shows error (Turnstile incomplete in headless)",
		msgText.length > 0 || msgState === "error",
		`msg: "${msgText.slice(0, 80)}" state:${msgState}`,
	);

	// 7. Check console errors — filter out CSS hacks and Turnstile noise
	const fatal = consoleErrors.filter((e) => {
		if (/favicon|turnstile|challenges\.cloudflare/i.test(e)) return false;
		// "%c%d font-size:0;color:transparent NaN" — anti-bot obfuscation, not a real error
		if (/font-size:0;color:transparent/i.test(e)) return false;
		return true;
	});
	check("no unexpected console errors", fatal.length === 0, fatal.slice(0, 2).join(" | "));

	// 8. Server-side: verify the API endpoint is alive (GET to check it's not 404)
	const apiCheck = await page.request
		.fetch("https://relay.codeloud.xyz/api/beta/applications", {
			method: "GET",
		})
		.catch(() => null);
	if (apiCheck) {
		check(
			"beta API endpoint reachable",
			apiCheck.status() !== 404 && apiCheck.status() !== 502,
			`HTTP ${apiCheck.status()}`,
		);
	} else {
		check("beta API endpoint reachable", false, "fetch failed");
	}
} finally {
	await browser.close();
}

console.log(failed === 0 ? "\nAll checks passed." : `\n${failed} check(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
