/*
      # Add transaction_id column to requests table

      1. Modified Tables
        - `requests`
          - Added `transaction_id` (text) column to store the transaction ID.
      2. Security
        - No security changes.
    */

    ALTER TABLE IF EXISTS requests
    ADD COLUMN IF NOT EXISTS transaction_id TEXT;