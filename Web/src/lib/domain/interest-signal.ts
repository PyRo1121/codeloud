import { Schema } from "@effect/schema";
import { Effect } from "effect";
import type { Effect as EffectType } from "effect/Effect";

/** Problems a visitor can identify without supplying contact information. */
export const INTEREST_SIGNAL_PROBLEMS = [
	"dictation_cleanup",
	"spoken_code_terms",
	"exact_version_docs",
	"package_evaluation",
	"sourced_research",
] as const;
export type InterestSignalProblem = (typeof INTEREST_SIGNAL_PROBLEMS)[number];

/** Near-term willingness to try an early build. */
export const TRIAL_INTENTS = ["yes", "maybe", "not_yet"] as const;
export type TrialIntent = (typeof TRIAL_INTENTS)[number];

const interestSignalSchema = Schema.Struct({
	problem: Schema.Literal(...INTEREST_SIGNAL_PROBLEMS),
	trialIntent: Schema.Literal(...TRIAL_INTENTS),
	website: Schema.optionalWith(Schema.Literal(""), { exact: true }),
});

/** Parsed no-contact signal persisted only as part of a daily aggregate. */
export interface InterestSignalInput {
	readonly problem: InterestSignalProblem;
	readonly trialIntent: TrialIntent;
}

/** Expected rejection of malformed no-contact signal form data. */
export class InterestSignalFormError extends Schema.TaggedError<InterestSignalFormError>()(
	"InterestSignalFormError",
	{ message: Schema.String },
) {}

const FORM_FIELD_NAMES = ["problem", "trialIntent", "website"] as const;
type InterestSignalFormField = (typeof FORM_FIELD_NAMES)[number];
type InterestSignalFormRecord = { readonly [K in InterestSignalFormField]?: string };

function formRecord(formData: FormData): InterestSignalFormRecord {
	const result: Partial<Record<InterestSignalFormField, string>> = {};
	for (const name of FORM_FIELD_NAMES) {
		const value = formData.get(name);
		if (value === null || value instanceof File) continue;
		result[name] = value.trim();
	}
	return result;
}

/** Parse an untrusted no-contact signal form into its bounded domain values. */
export const parseInterestSignalFormData = (
	formData: FormData,
): EffectType<InterestSignalInput, InterestSignalFormError, never> =>
	Schema.decodeUnknown(interestSignalSchema)(formRecord(formData)).pipe(
		Effect.map(({ problem, trialIntent }) => ({ problem, trialIntent })),
		Effect.mapError(
			() =>
				new InterestSignalFormError({
					message: "Choose one problem and when you would try an early build.",
				}),
		),
	);
