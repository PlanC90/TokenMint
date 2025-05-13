/*
  # Create token_requests table with all required columns and policies

  1. New Table Structure
    - `token_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `token_name` (text, not null)
      - `token_symbol` (text, not null)
      - `total_supply` (bigint, not null)
      - `token_logo_url` (text)
      - `wallet_address` (text, not null)
      - `payment_confirmed` (boolean, default false)
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS
    - Allow anon and authenticated users to insert
    - Allow authenticated users to read all requests
    - Allow authenticated users to update requests (for admin functionality)
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS token_requests;

-- Create the table with all required columns
CREATE TABLE token_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    token_name text NOT NULL,
    token_symbol text NOT NULL,
    total_supply bigint NOT NULL,
    token_logo_url text,
    wallet_address text NOT NULL,
    payment_confirmed boolean DEFAULT false,
    status text DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anon and authenticated insert"
    ON token_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can read token requests"
    ON token_requests
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can update token requests"
    ON token_requests
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);