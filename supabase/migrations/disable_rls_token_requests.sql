/*
  # Disable RLS and drop all policies for token_requests table

  1. Security
    - Disable RLS on `token_requests` table.
    - Drop all known RLS policies on `token_requests` table.
  2. Notes
    - Disabling RLS makes the table fully accessible to anyone with database credentials, bypassing all policy checks. This is generally NOT recommended for production environments due to significant security risks.
*/

-- Drop all known policies on token_requests
DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert" ON token_requests;
DROP POLICY IF EXISTS "Allow anon and authenticated insert any" ON token_requests;
DROP POLICY IF EXISTS "Authenticated users can read token requests" ON token_requests;

-- Disable Row Level Security for the token_requests table
ALTER TABLE token_requests DISABLE ROW LEVEL SECURITY;
