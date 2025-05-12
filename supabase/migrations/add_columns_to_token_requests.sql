/*
  # Add missing columns and reconfigure RLS for token_requests table

  1. Changes
    - Add `token_name` (text) column.
    - Add `token_symbol` (text) column.
    - Add `total_supply` (integer) column.
    - Add `token_logo_url` (text) column.
    - Add `wallet_address` (text) column.
    - Add `payment_confirmed` (boolean) column.
  2. Security
    - Ensure RLS is enabled on `token_requests` table.
    - Drop existing INSERT policies.
    - Create INSERT policy allowing `anon` and `authenticated` roles.
    - Create SELECT policy allowing `authenticated` role to read all requests (Note: This SELECT policy is broad and should be refined if requests need to be linked to specific authenticated users).
*/

-- Add new columns if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'token_name') THEN
    ALTER TABLE token_requests ADD COLUMN token_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'token_symbol') THEN
    ALTER TABLE token_requests ADD COLUMN token_symbol text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'total_supply') THEN
    ALTER TABLE token_requests ADD COLUMN total_supply integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'token_logo_url') THEN
    ALTER TABLE token_requests ADD COLUMN token_logo_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'wallet_address') THEN
    ALTER TABLE token_requests ADD COLUMN wallet_address text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'token_requests' AND column_name = 'payment_confirmed') THEN
    ALTER TABLE token_requests ADD COLUMN payment_confirmed boolean DEFAULT false; -- Added a default value
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests;

-- Create the INSERT policy allowing anon and authenticated roles
CREATE POLICY "Allow anon and authenticated insert"
  ON token_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Re-create the SELECT policy for authenticated users (as in the initial migration)
-- Note: This policy allows authenticated users to read ALL requests.
-- A more secure policy would restrict reads to their own requests if linked by user ID.
DROP POLICY IF EXISTS "Authenticated users can read token requests" ON token_requests;
CREATE POLICY "Authenticated users can read token requests"
  ON token_requests
  FOR SELECT
  TO authenticated
  USING (true);
