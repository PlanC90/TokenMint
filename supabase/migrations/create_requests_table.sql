/*
  # Create requests table

  1. New Tables
    - `requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `token_type` (text, e.g., 'ERC20', 'ERC721')
      - `amount` (numeric, for fungible tokens)
      - `status` (text, e.g., 'pending', 'approved', 'rejected')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `requests` table
    - Add policy for authenticated users to insert their own requests
    - Add policy for authenticated users to read their own requests
*/

CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  token_type text NOT NULL,
  amount numeric, -- Optional, for fungible tokens
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own requests
CREATE POLICY "Authenticated users can insert their own requests"
  ON requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to read their own requests
CREATE POLICY "Authenticated users can read their own requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Optional: Add policies for update/delete if needed, but start simple.
-- CREATE POLICY "Authenticated users can update their own requests"
--   ON requests
--   FOR UPDATE
--   TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Authenticated users can delete their own requests"
--   ON requests
--   FOR DELETE
--   TO authenticated
--   USING (auth.uid() = user_id);
