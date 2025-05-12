/*
      # Make max_supply column nullable

      1. Changes
        - Modify `token_requests` table
          - Make `max_supply` column nullable by dropping the NOT NULL constraint.
      2. Notes
        - This addresses the "null value in column 'max_supply' violates not-null constraint" error.
        - Assumes 'max_supply' is an existing column in the table.
    */

    -- Check if the column exists before attempting to alter it
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'token_requests' AND column_name = 'max_supply'
      ) THEN
        -- Drop the NOT NULL constraint on the max_supply column
        ALTER TABLE token_requests ALTER COLUMN max_supply DROP NOT NULL;
      END IF;
    END $$;
