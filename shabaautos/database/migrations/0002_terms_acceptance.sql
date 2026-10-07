-- Terms acceptance tracking. Existing accounts remain ungated until a new account is provisioned.
-- Safe to rerun; the application also applies these columns through neon_schema.sql.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS terms_required BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS terms_version VARCHAR(64);
