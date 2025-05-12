/*
  # Make requests.user_id nullable

  1. Changes
    - Modify `requests` table:
      - Alter `user_id` column to allow NULL values.
  2. Notes
    - This change is necessary to allow anonymous users to submit requests, as they do not have an associated user ID in the auth.users table.
*/

ALTER TABLE requests ALTER COLUMN user_id DROP NOT NULL;
