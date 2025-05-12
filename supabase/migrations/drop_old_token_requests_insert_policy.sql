/*
      # Drop old token_requests insert policy

      1. Security
        - Drop the old RLS policy on `token_requests` table that only allowed authenticated inserts.
      2. Notes
        - The new policy "Allow anon and authenticated insert" is assumed to already exist.
    */

    -- Drop the existing policy if it exists
    DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;
