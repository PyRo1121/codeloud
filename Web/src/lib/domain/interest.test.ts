import { Effect, Either } from "effect";
import { describe, expect, it } from "vitest";
import {
	InterestFormError,
	parseProductInterestFormData,
	type ProductInterestInput,
} from "./interest";

function form(overrides: Readonly<Record<string, string>> = {}): FormData {
	const result = new FormData();
	const values = {
		product: "both",
		email: "dev@example.com",
		workflow: "I want to dictate a prompt and test exact package context.",
		privacyConsent: "true",
		website: "",
		...overrides,
	} satisfies Record<string, string>;
	for (const [key, value] of Object.entries(values)) {
		result.set(key, value);
	}
	return result;
}

function runParse(formData: FormData): Either.Either<ProductInterestInput, InterestFormError> {
	return Effect.runSync(Effect.either(parseProductInterestFormData(formData)));
}

function parsedInput(formData: FormData): ProductInterestInput {
	const result = runParse(formData);
	if (Either.isLeft(result)) throw new Error("expected success");
	return result.right;
}

describe("product interest boundary", () => {
	it("parses product-specific interest without retaining a raw FormData object", () => {
		const parsed = parsedInput(
			form({
				product: "voice",
				name: "Ada",
				operatingSystem: "Linux",
				editor: "Neovim",
			}),
		);

		expect(parsed).toEqual({
			product: "voice",
			email: "dev@example.com",
			name: "Ada",
			workflow: "I want to dictate a prompt and test exact package context.",
			operatingSystem: "Linux",
			editor: "Neovim",
		});
	});

	it("normalizes email to lowercase before the domain layer", () => {
		expect(parsedInput(form({ email: "  DEV@Example.COM " })).email).toBe("dev@example.com");
	});

	it.each([
		["invalid product", { product: "everything" }],
		["invalid email", { email: "not-an-email" }],
		["missing workflow", { workflow: "" }],
		["missing consent", { privacyConsent: "false" }],
		["honeypot", { website: "bot" }],
	] as const)("rejects %s", (_name, overrides) => {
		const result = runParse(form(overrides));
		expect(Either.isLeft(result)).toBe(true);
		if (Either.isLeft(result)) {
			expect(result.left).toBeInstanceOf(InterestFormError);
		}
	});
});
