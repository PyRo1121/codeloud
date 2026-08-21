import js from "@eslint/js";
import tseslint from "typescript-eslint";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import prettier from "eslint-config-prettier";
import globals from "globals";

/**
 * ESLint flat config for the CodeLoud family landing site.
 *
 * Stack:
 *   - TypeScript 5 with Svelte 5 runes
 *   - ESM (`"type": "module"`)
 *   - Cloudflare Workers platform types via SvelteKit's adapter
 *
 * Order matters: later entries override earlier ones. `prettier` must stay
 * last so it disables any style-affecting rules from the presets.
 */
export default [
	{
		ignores: [
			"**/node_modules/**",
			"**/.svelte-kit/**",
			"**/dist/**",
			"**/build/**",
			"**/coverage/**",
			"**/playwright-report/**",
			"**/test-results/**",
			"**/.wrangler/**",
			"worker-configuration.d.ts",
			"**/*.min.js",
			// Archived pre-production mockup. Kept for history only; it is not
			// part of the app's tsconfig and must not gate lint.
			"mockup/**",
			"tools/oxlint/anti-slop/**",
		],
	},

	// Baseline JS hygiene.
	js.configs.recommended,

	// TypeScript: type-aware rules that reject unsafe assignment/member
	// access/calls/returns, floating/misused promises, unnecessary
	// assertions, and unused suppression directives (engineering standard §6).
	// Each entry is scoped to TypeScript and Svelte files so the type-aware
	// rule set never runs against plain JS config files without type info.
	...tseslint.configs.recommendedTypeChecked.map((config) => ({
		...config,
		files: config.files ?? ["**/*.ts", "**/*.svelte"],
	})),

	// Svelte: template + script linting.
	...sveltePlugin.configs["flat/recommended"],

	// Common language options shared by every scanned file.
	{
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			ecmaVersion: 2024,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2024,
			},
		},
		rules: {
			// Surface dead code with a sensible underscore escape hatch.
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],

			// Expected failures are typed action data or classified store
			// results; the interest store logs storage/turnstile diagnostics
			// explicitly. No stray console noise in domain modules.
			"no-console": "off",
		},
	},

	// TypeScript files: project-aware type info via service.
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				// Config files that are not in the generated SvelteKit
				// tsconfig program are still type-checked here.
				projectService: {
					allowDefaultProject: ["vitest.config.ts", "oxlint.config.ts"],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// Type imports must use `import type` because the generated
			// SvelteKit tsconfig uses `verbatimModuleSyntax: true`.
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports",
					disallowTypeAnnotations: false,
				},
			],
		},
	},

	// Svelte 5 files: runes-aware parsing (runes mode is auto-detected by
	// svelte-eslint-parser from the compiled component).
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				projectService: true,
				extraFileExtensions: [".svelte"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"svelte/no-at-html-tags": "error",
			"svelte/no-useless-mustaches": "error",
			// Type imports must use `import type` because the generated
			// SvelteKit tsconfig uses `verbatimModuleSyntax: true`.
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports",
					disallowTypeAnnotations: false,
				},
			],
		},
	},

	// Test and config files: relax a few strict rules.
	{
		files: [
			"**/*.test.ts",
			"**/*.spec.ts",
			"src/**/*.test.ts",
			"**/vitest.config.ts",
			"**/vite.config.ts",
			"**/svelte.config.js",
		],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unused-vars": "off",
		},
	},

	// Last entry — disables style rules that conflict with Prettier.
	prettier,
];
