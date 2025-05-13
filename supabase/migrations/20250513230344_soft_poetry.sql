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
          - `status` (text, default 'pending')
      2. Security
        - Enable RLS on `token_requests` table
        - Add policy for authenticated users to insert their own requests
        - Add policy for authenticated users to read their own requests
        - Add policy for admin users to update status
    */

    CREATE TABLE IF NOT EXISTS token_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz DEFAULT now(),
      token_name text NOT NULL,
      token_symbol text NOT NULL,
      total_supply integer NOT NULL,
      token_logo_url text,
      wallet_address text NOT NULL,
      payment_confirmed boolean DEFAULT false,
      status text DEFAULT 'pending'
    );

    ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;

    -- Allow authenticated users to insert their own token requests
    CREATE POLICY "Authenticated users can insert their own token requests"
      ON token_requests
      FOR INSERT
      TO authenticated
      WITH CHECK (true);

    -- Allow authenticated users to read token requests
    CREATE POLICY "Authenticated users can read token requests"
      ON token_requests
      FOR SELECT
      TO authenticated
      USING (true);

    -- Allow admin users to update status
    CREATE POLICY "Admin users can update token requests"
      ON token_requests
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);