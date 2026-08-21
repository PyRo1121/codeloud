import { Effect, Either } from "effect";
import { describe, expect, it } from "vitest";
import {
	InterestSignalFormError,
	parseInterestSignalFormData,
	type InterestSignalInput,
} from "./interest-signal";

function form(overrides: Readonly<Record<string, string>> = {}): FormData {
	const result = new FormData();
	const values = {
		problem: "exact_version_docs",
		trialIntent: "yes",
		website: "",
		...overrides,
	} satisfies Record<string, string>;
	for (const [key, value] of Object.entries(values)) result.set(key, value);
	return result;
}

function runParse(formData: FormData): Either.Either<InterestSignalInput, InterestSignalFormError> {
	const parseEffect = parseInterestSignalFormData(formData);
	return Effect.runSync(Effect.either(parseEffect));
}

describe("no-contact interest signal boundary", () => {
	it("parses only the declared problem and trial intent", () => {
		const result = runParse(form());
		expect(Either.isRight(result)).toBe(true);
		if (Either.isRight(result)) {
			expect(result.right).toEqual({
				problem: "exact_version_docs",
				trialIntent: "yes",
			});
		}
	});

	it.each([
		["unknown problem", { problem: "other" }],
		["unknown trial intent", { trialIntent: "later" }],
		["honeypot", { website: "bot" }],
	] as const)("rejects %s", (_name, overrides) => {
		const result = runParse(form(overrides));
		expect(Either.isLeft(result)).toBe(true);
		if (Either.isLeft(result)) expect(result.left).toBeInstanceOf(InterestSignalFormError);
	});
});
