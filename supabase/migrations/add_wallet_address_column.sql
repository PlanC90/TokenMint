/*
      # Add wallet_address column to requests table

      1. Modified Tables
        - `requests`
          - Added `wallet_address` (text, nullable)
      2. Security
        - No security changes.
    */

    ALTER TABLE IF EXISTS requests
    ADD COLUMN IF NOT EXISTS wallet_address text;
