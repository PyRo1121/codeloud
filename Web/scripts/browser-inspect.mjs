/**
 * Browser inspection for the deployed CodeLoud family site.
 *
 * Usage:
 *   node scripts/browser-inspect.mjs
 *   CODELOUD_SITE_URL=http://127.0.0.1:4174 node scripts/browser-inspect.mjs
 */

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const CHROMIUM_PATH = "/usr/bin/chromium";
const SITE_URL = process.env.CODELOUD_SITE_URL ?? "https://codeloud.xyz";
const SCREENSHOT_DIR = resolve("scripts", "screenshots");

function isTurnstileNoise(text) {
	return text.includes("challenges.cloudflare.com") || text.startsWith("%c");
}

const results = { passed: 0, failed: 0, errors: [] };

function report(message) {
	process.stdout.write(`${message}\n`);
}

function reportError(message) {
	process.stderr.write(`${message}\n`);
}

function pass(label) {
	results.passed++;
	report(`  ✓ ${label}`);
}

function fail(label, detail) {
	results.failed++;
	results.errors.push({ label, detail });
	reportError(`  ✗ ${label}: ${detail}`);
}

async function takeScreenshot(page, name) {
	try {
		await page.screenshot({ path: resolve(SCREENSHOT_DIR, `${name}.png`), fullPage: true });
	} catch {
		// Screenshots are diagnostic aids, not a test requirement.
	}
}

async function inspectLayout(page, label) {
	for (const path of ["/", "/voice", "/relay", "/privacy"]) {
		const response = await page.goto(`${SITE_URL}${path}`, { waitUntil: "domcontentloaded" });
		const layout = await page.evaluate(() => ({
			hasHeading: Boolean(document.querySelector("h1")),
			overflow: document.documentElement.scrollWidth - window.innerWidth,
		}));
		if (response?.ok() && layout.hasHeading && layout.overflow <= 1) {
			pass(`${label} ${path} renders without horizontal overflow`);
		} else {
			fail(`${label} ${path}`, JSON.stringify(layout));
		}
	}
}

const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
try {
	report("\nDesktop (1280×800):");
	const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	const consoleErrors = [];
	desktop.on("console", (message) => {
		if (message.type() === "error" && !isTurnstileNoise(message.text())) {
			consoleErrors.push(message.text());
		}
	});
	await desktop.goto(SITE_URL, { waitUntil: "domcontentloaded" });

	const desktopTitle = await desktop.title();
	if (desktopTitle.includes("CodeLoud")) pass("Page title includes CodeLoud");
	else fail("Page title", desktopTitle);

	if ((await desktop.locator(".handoff-record").count()) === 1) {
		pass("Semantic handoff record rendered");
	} else {
		fail("Handoff record", "Expected one .handoff-record");
	}

	const panels = desktop.locator("article.product-panel");
	if ((await panels.count()) === 2) pass("Two product briefs rendered");
	else fail("Product briefs", `Expected 2, got ${await panels.count()}`);

	const widgets = desktop.locator(".cf-turnstile");
	if ((await widgets.count()) === 2) pass("Both Turnstile widgets rendered");
	else fail("Turnstile widgets", `Expected 2, got ${await widgets.count()}`);

	const relayLinks = desktop.locator("a[href*='relay.codeloud.xyz']");
	if ((await relayLinks.count()) >= 2) pass("Relay links use the real service boundary");
	else fail("Relay links", `Expected 2+, got ${await relayLinks.count()}`);

	const voiceButton = desktop.locator(".product-voice .product-footer button");
	await voiceButton.click();
	const selectedProduct = await desktop.locator("input[name='product']").inputValue();
	if (selectedProduct === "voice") pass("Voice CTA selects Voice in the contact form");
	else fail("Voice CTA", `Expected voice, got ${selectedProduct}`);

	if (consoleErrors.length === 0) pass("No application console errors");
	else fail("Console errors", consoleErrors.join("; "));
	await takeScreenshot(desktop, "desktop-full");
	await desktop.close();

	report("\nResponsive routes:");
	const mobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
	await inspectLayout(mobile, "Mobile");
	await mobile.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	if (!(await mobile.locator("header.site-header nav").isVisible()))
		pass("Primary nav condenses on mobile");
	else fail("Mobile navigation", "Desktop navigation remains visible");
	await takeScreenshot(mobile, "mobile-full");
	await mobile.close();

	report("\nReduced motion:");
	const reduced = await browser.newPage({
		viewport: { width: 1280, height: 800 },
		reducedMotion: "reduce",
	});
	await reduced.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	if ((await reduced.locator(".handoff-record").count()) === 1) {
		pass("Core visual remains available without motion");
	} else {
		fail("Reduced motion", "Handoff record missing");
	}
	await reduced.close();

	report("\nKeyboard navigation:");
	const keyboard = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	await keyboard.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	await keyboard.keyboard.press("Tab");
	const focused = await keyboard.evaluate(() => {
		const active = document.activeElement;
		return active instanceof HTMLElement ? active.tagName : "";
	});
	if (focused === "A") pass("First navigation target is keyboard reachable");
	else fail("Keyboard navigation", `Expected A, got ${focused}`);
	await keyboard.close();

	report("\nContact form:");
	const formPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	await formPage.goto(SITE_URL, { waitUntil: "domcontentloaded" });
	await formPage.locator("input[name='email']").fill("browser-inspect@example.com");
	await formPage.locator("input[name='name']").fill("Browser Inspection");
	await formPage
		.locator("textarea[name='workflow']")
		.fill("Automated browser inspection of the early-access form.");
	await formPage.locator("input[name='privacyConsent']").check();
	const choices = formPage.locator(".product-choice button");
	if ((await choices.count()) === 3) pass("Three contact product choices rendered");
	else fail("Contact choices", `Expected 3, got ${await choices.count()}`);
	await choices.nth(2).click();

	const submitButton = formPage.locator("button.submit");
	if ((await submitButton.count()) === 1) pass("Contact submit button rendered");
	else fail("Contact submit button", "Missing");
	await submitButton.click();
	await formPage.waitForTimeout(2500);

	const successVisible = await formPage
		.locator(".result-success")
		.isVisible()
		.catch(() => false);
	const errorVisible = await formPage
		.locator(".result-error")
		.isVisible()
		.catch(() => false);
	if (successVisible || errorVisible) pass("Contact submission returns a visible result");
	else fail("Contact submission", "No visible success or failure result");

	if (successVisible && SITE_URL === "https://codeloud.xyz") {
		try {
			execSync(
				`npx wrangler d1 execute codeloud-family-interest --remote --command "DELETE FROM codeloud_product_interest WHERE email_normalized='browser-inspect@example.com'"`,
				{ cwd: resolve("."), stdio: "pipe" },
			);
			pass("Production browser-test row removed");
		} catch {
			fail("Test cleanup", "Could not remove the browser-test row");
		}
	}
	await takeScreenshot(formPage, "form-submission");
	await formPage.close();
} finally {
	await browser.close();
}

report(`\n${results.passed} passed, ${results.failed} failed.`);
if (results.failed > 0) {
	for (const error of results.errors) reportError(`- ${error.label}: ${error.detail}`);
	process.exitCode = 1;
}
