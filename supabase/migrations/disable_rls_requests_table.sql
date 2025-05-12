/*
  # Disable RLS and drop all policies for requests table

  1. Security
    - Disable RLS on `requests` table.
    - Drop all known RLS policies on `requests` table.
  2. Notes
    - Disabling RLS makes the table fully accessible to anyone with database credentials, bypassing all policy checks. This is generally NOT recommended for production environments due to significant security risks.
*/

-- Drop all known policies on requests
DROP POLICY IF EXISTS "Authenticated users can insert their own requests" ON requests;
DROP POLICY IF EXISTS "Authenticated users can read their own requests" ON requests;
-- Add other policies if you have created them for the 'requests' table
-- DROP POLICY IF EXISTS "Authenticated users can update their own requests" ON requests;
-- DROP POLICY IF EXISTS "Authenticated users can delete their own requests" ON requests;


-- Disable Row Level Security for the requests table
ALTER TABLE requests DISABLE ROW LEVEL SECURITY;
