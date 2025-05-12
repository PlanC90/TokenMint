/*
  # Alter token_requests table: Change total_supply column type to bigint

  1. Changes
    - Alter `token_requests` table to change the data type of the `total_supply` column from `integer` to `bigint`.
  2. Notes
    - This change is necessary because the submitted value for total_supply exceeds the maximum value for the integer data type.
*/

DO $$
BEGIN
  -- Check if the column exists and is not already bigint
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'token_requests'
    AND column_name = 'total_supply'
    AND data_type = 'integer' -- Only attempt to alter if it's currently integer
  ) THEN
    ALTER TABLE token_requests
    ALTER COLUMN total_supply TYPE bigint;
  END IF;
END $$;
