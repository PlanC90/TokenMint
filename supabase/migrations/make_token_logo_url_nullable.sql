/*
  # Make token_logo_url column nullable

  1. Changes
    - Alter `token_requests` table to allow NULL values in the `token_logo_url` column.
  2. Security
    - Ensure RLS is enabled on `token_requests` table.
    - Ensure existing INSERT and SELECT policies are in place.
*/

-- Alter token_logo_url column to allow NULL values
DO $$
BEGIN
  -- Check if the column exists and is currently NOT NULL
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'token_requests'
    AND column_name = 'token_logo_url'
    AND is_nullable = 'NO' -- Check if it's currently NOT NULL
  ) THEN
    ALTER TABLE token_requests
    ALTER COLUMN token_logo_url DROP NOT NULL;
  END IF;
END $$;

-- Ensure RLS is enabled (should already be, but good practice to include)
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Re-create the INSERT policy allowing anon and authenticated roles (ensure it's still there)
-- This policy allows inserts without checking auth.uid(), which is needed for anon users.
-- If you later require users to be logged in to submit, this policy needs adjustment.
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests;
CREATE POLICY "Allow anon and authenticated insert"
  ON token_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Re-create the SELECT policy for authenticated users (ensure it's still there)
-- Note: This policy allows authenticated users to read ALL requests.
-- A more secure policy would restrict reads to their own requests if linked by user ID.
DROP POLICY IF EXISTS "Authenticated users can read token requests" ON token_requests;
CREATE POLICY "Authenticated users can read token requests"
  ON token_requests
  FOR SELECT
  TO authenticated
  USING (true);
