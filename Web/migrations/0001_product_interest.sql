-- Public-family interest measurement only.
-- This is intentionally separate from Relay's beta application authority.
CREATE TABLE codeloud_product_interest (
	email_normalized TEXT NOT NULL,
	product_selection TEXT NOT NULL CHECK (product_selection IN ('voice', 'relay', 'both')),
	applicant_name TEXT,
	workflow TEXT NOT NULL,
	operating_system TEXT,
	editor_name TEXT,
	coding_client TEXT,
	private_source_needed INTEGER,
	created_at TEXT NOT NULL,
	PRIMARY KEY (email_normalized, product_selection)
);
