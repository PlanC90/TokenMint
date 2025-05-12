/*
  # Reconfigure token_requests RLS policies

  1. Security
    - Ensure RLS is enabled on `token_requests` table.
    - Drop existing INSERT policies.
    - Create INSERT policy allowing `anon` and `authenticated` roles.
    - Create SELECT policy allowing `authenticated` role to read all requests (Note: This SELECT policy is broad and should be refined if requests need to be linked to specific authenticated users).
*/

-- Ensure RLS is enabled
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests; -- Drop the one user reported already exists

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
