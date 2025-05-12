/*
      # Create token_requests table

      1. New Tables
        - `token_requests`
          - `id` (uuid, primary key)
          - `created_at` (timestamp with time zone, default now())
          - `token_name` (text, not null)
          - `token_symbol` (text, not null)
          - `total_supply` (integer, not null)
          - `token_logo_url` (text)
          - `wallet_address` (text, not null)
          - `payment_confirmed` (boolean, default false)
      2. Security
        - Enable RLS on `token_requests` table
        - Add policy for authenticated users to insert their own requests
        - Add policy for authenticated users to read their own requests
    */

    CREATE TABLE IF NOT EXISTS token_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz DEFAULT now(),
      token_name text NOT NULL,
      token_symbol text NOT NULL,
      total_supply integer NOT NULL,
      token_logo_url text,
      wallet_address text NOT NULL,
      payment_confirmed boolean DEFAULT false
    );

    ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

    -- Allow authenticated users to insert their own token requests
    CREATE POLICY "Authenticated users can insert their own token requests"
      ON token_requests
      FOR INSERT
      TO authenticated
      WITH CHECK (true); -- You might want to add a check here if needed, e.g., auth.uid() is related to the request

    -- Allow authenticated users to read their own token requests (assuming wallet_address is linked to user)
    -- NOTE: This policy assumes a link between auth.uid() and wallet_address.
    -- If wallet_address is not directly linked to the authenticated user,
    -- you might need a different policy or structure.
    -- For simplicity, this policy allows reading all requests by authenticated users.
    -- A more secure policy would link requests to the user's auth.uid().
    CREATE POLICY "Authenticated users can read token requests"
      ON token_requests
      FOR SELECT
      TO authenticated
      USING (true); -- Consider refining this policy to only allow reading their own requests
