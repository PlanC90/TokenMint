/*
      # Add sample token request

      1. Changes
        - Inserts a sample record into the `token_requests` table.
    */

    INSERT INTO token_requests (token_name, token_symbol, total_supply, wallet_address, status)
    VALUES (
      'Sample Token',
      'SMPL',
      1000000,
      '0x1234567890abcdef1234567890abcdef12345678',
      'pending'
    );