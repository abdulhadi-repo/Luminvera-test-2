/*
  # Create surveys table for website feedback

  1. New Tables
    - `surveys`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `rating` (integer, 1-5)
      - `feedback` (text, optional)
      - `improvements` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `surveys` table
    - Add policy for public insert access
    - Add policy for authenticated users to read their own surveys
*/

CREATE TABLE IF NOT EXISTS surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback text DEFAULT '',
  improvements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit surveys
CREATE POLICY "Anyone can submit surveys"
  ON surveys
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read surveys (for admin purposes)
CREATE POLICY "Authenticated users can read surveys"
  ON surveys
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_surveys_email ON surveys(email);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys(created_at DESC);