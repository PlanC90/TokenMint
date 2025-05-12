/*
  # Reconfigure RLS policies for token_requests table

  1. Security
    - Ensure RLS is enabled on `token_requests` table.
    - Drop existing INSERT policies.
    - Drop existing SELECT policies.
    - Create INSERT policy allowing `anon` and `authenticated` roles to insert any row (including those with payment_confirmed = false).
    - Create SELECT policy allowing `authenticated` role to read all requests.
*/

-- Ensure RLS is enabled
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests;

-- Drop existing SELECT policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can read token requests" ON token_requests;

-- Create the INSERT policy allowing anon and authenticated roles for any row
CREATE POLICY "Allow anon and authenticated insert any"
  ON token_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true); -- This allows inserting rows regardless of payment_confirmed status

-- Create the SELECT policy for authenticated users
CREATE POLICY "Authenticated users can read token requests"
  ON token_requests
  FOR SELECT
  TO authenticated
  USING (true); -- This allows authenticated users to read all requests
