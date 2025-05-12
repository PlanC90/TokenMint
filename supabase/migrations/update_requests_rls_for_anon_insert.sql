/*
  # Update RLS policies for requests table

  1. Security
    - Ensure RLS is enabled on `requests` table.
    - Drop existing INSERT and SELECT policies.
    - Create a new INSERT policy allowing `anon` (with user_id IS NULL) and `authenticated` (with user_id = auth.uid()) roles.
    - Create a new SELECT policy allowing `authenticated` role to read their own requests (where user_id = auth.uid()).
*/

-- Ensure RLS is enabled
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can insert their own requests" ON requests;
DROP POLICY IF EXISTS "Authenticated users can read their own requests" ON requests;
-- Drop any other policies you might have added
-- DROP POLICY IF EXISTS "Allow anon and authenticated insert any" ON requests; -- If this policy was created in a previous attempt

-- Create the INSERT policy allowing anon and authenticated roles
CREATE POLICY "Allow anon and authenticated insert"
  ON requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL); -- Allows authenticated users to insert their own, and anon users to insert with null user_id

-- Create the SELECT policy for authenticated users to read their own requests
CREATE POLICY "Authenticated users can read own requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id); -- Allows authenticated users to read only rows where user_id matches their ID
