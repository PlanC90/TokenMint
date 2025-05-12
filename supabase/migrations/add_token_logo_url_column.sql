/*
      # Add token_logo_url column to requests table

      1. Modified Tables
        - `requests`
          - Added `token_logo_url` (text, nullable)
      2. Security
        - No security changes.
    */

    ALTER TABLE IF EXISTS requests
    ADD COLUMN IF NOT EXISTS token_logo_url text;
