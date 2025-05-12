/*
  # Apply bigint type for total_supply and reconfigure RLS for token_requests table

  1. Changes
    - Alter `token_requests` table to change the data type of the `total_supply` column from `integer` to `bigint` if it's currently integer.
  2. Security
    - Ensure RLS is enabled on `token_requests` table.
    - Drop existing INSERT policies.
    - Create INSERT policy allowing `anon` and `authenticated` roles.
    - Create SELECT policy allowing `authenticated` role to read all requests.
*/

-- Alter total_supply column to bigint if it's currently integer
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'token_requests'
    AND column_name = 'total_supply'
    AND data_type = 'integer' -- Only attempt to alter if it's currently integer
  ) THEN
    ALTER TABLE token_requests
    ALTER COLUMN total_supply TYPE bigint;
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests; -- Drop the policy name used previously

-- Create the INSERT policy allowing anon and authenticated roles
CREATE POLICY "Allow anon and authenticated insert"
  ON token_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Re-create the SELECT policy for authenticated users (as in the initial migration)
-- Note: This policy allows authenticated users to read ALL requests.
-- A more secure policy would restrict reads to their own requests if linked by user ID.
DROP POLICY IF EXISTS "Authenticated users can read token requests" ON token_requests; -- Drop if it exists
CREATE POLICY "Authenticated users can read token requests"
  ON token_requests
  FOR SELECT
  TO authenticated
  USING (true);
