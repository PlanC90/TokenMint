/*
  # Create tokens table

  1. New Tables
    - `tokens`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `created_at` (timestamp)
      - `status` (text)
  2. Security
    - Enable RLS on `tokens` table
    - Add policy for authenticated users to read all data
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to update data
    - Add policy for authenticated users to delete data
*/

CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  status text
);

ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all data"
  ON tokens
  FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Authenticated users can insert data"
  ON tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can update data"
  ON tokens
  FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can delete data"
  ON tokens
  FOR DELETE
  TO authenticated
  USING (TRUE);
