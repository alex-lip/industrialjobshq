-- Industrial Jobs HQ Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Create job_type enum
CREATE TYPE job_type AS ENUM ('full-time', 'contract', 'part-time');

-- Companies table
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL, -- 2-letter abbreviation (OH, MI, IL, etc.)
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  job_type job_type NOT NULL DEFAULT 'full-time',
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  apply_url TEXT NOT NULL,
  territory TEXT,
  travel_percentage INTEGER CHECK (travel_percentage >= 0 AND travel_percentage <= 100),
  industry_vertical TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for common queries
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_location ON jobs(state, city);
CREATE INDEX idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX idx_jobs_slug ON jobs(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
-- Anyone can read companies
CREATE POLICY "Companies are viewable by everyone"
  ON companies
  FOR SELECT
  USING (true);

-- Anyone can read active jobs
CREATE POLICY "Active jobs are viewable by everyone"
  ON jobs
  FOR SELECT
  USING (is_active = true);

-- Grant access to anon and authenticated users
GRANT SELECT ON companies TO anon, authenticated;
GRANT SELECT ON jobs TO anon, authenticated;
