/*
      # Add payment_confirmed column to requests table

      1. Modified Tables
        - `requests`
          - Added `payment_confirmed` (boolean, default false)
      2. Security
        - No security changes.
    */

    ALTER TABLE IF EXISTS requests
    ADD COLUMN IF NOT EXISTS payment_confirmed BOOLEAN DEFAULT FALSE;
