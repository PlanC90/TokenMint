/*
      # Add token_name column to requests table

      1. Modified Tables
        - `requests`
          - Added `token_name` (text, nullable)
      2. Security
        - No security changes.
    */

    ALTER TABLE IF EXISTS requests
    ADD COLUMN IF NOT EXISTS token_name text;
