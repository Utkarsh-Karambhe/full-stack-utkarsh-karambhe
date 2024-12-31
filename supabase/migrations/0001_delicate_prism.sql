/*
  # Initial Cricket Match Schema

  1. New Tables
    - `matches`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `score` (integer)
      - `wickets` (integer)
      - `current_over` (numeric)
      - `status` (text)
    
    - `overs`
      - `id` (uuid, primary key)
      - `match_id` (uuid, foreign key)
      - `over_number` (integer)
      - `runs` (integer)
      - `wickets` (integer)
      - `balls` (jsonb)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  score integer DEFAULT 0,
  wickets integer DEFAULT 0,
  current_over numeric(3,1) DEFAULT 0,
  status text DEFAULT 'in_progress'
);

CREATE TABLE overs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id),
  over_number integer NOT NULL,
  runs integer DEFAULT 0,
  wickets integer DEFAULT 0,
  balls jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE overs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view matches"
  ON matches
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view overs"
  ON overs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert matches"
  ON matches
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update matches"
  ON matches
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');