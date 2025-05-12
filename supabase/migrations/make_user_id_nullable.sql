/*
      # Make user_id nullable in requests table

      1. Modified Tables
        - `requests`
          - Altered `user_id` column to allow NULL values.
      2. Notes
        - This change is necessary to allow anonymous users to submit requests, as they do not have an associated user ID in the auth.users table.
    */

    ALTER TABLE IF EXISTS requests
    ALTER COLUMN user_id DROP NOT NULL;
