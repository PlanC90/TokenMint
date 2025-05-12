/*
      # Update token_requests insert policy

      1. Security
        - Update RLS policy on `token_requests` table to allow inserts from `anon` and `authenticated` roles.
    */

    -- Drop the existing policy if it exists
    DROP POLICY IF EXISTS "Authenticated users can insert their own token requests" ON token_requests;

    -- Create a new policy allowing insert for anon and authenticated roles
    CREATE POLICY "Allow anon and authenticated insert"
      ON token_requests
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
