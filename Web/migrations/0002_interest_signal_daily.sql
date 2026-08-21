-- Privacy-minimized no-contact demand signals.
-- Only daily aggregates are retained; no event rows or network identifiers.
CREATE TABLE codeloud_interest_signal_daily (
	signal_day TEXT NOT NULL,
	problem TEXT NOT NULL CHECK (
		problem IN (
			'dictation_cleanup',
			'spoken_code_terms',
			'exact_version_docs',
			'package_evaluation',
			'sourced_research'
		)
	),
	trial_intent TEXT NOT NULL CHECK (trial_intent IN ('yes', 'maybe', 'not_yet')),
	signal_count INTEGER NOT NULL CHECK (signal_count > 0),
	updated_at TEXT NOT NULL,
	PRIMARY KEY (signal_day, problem, trial_intent)
);
