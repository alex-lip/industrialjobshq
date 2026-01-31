-- Migration: Add job posting and Stripe integration fields
-- Run this in Supabase SQL Editor after the initial schema

-- Create job status enum
CREATE TYPE job_status AS ENUM ('pending_payment', 'active', 'expired');

-- Add new columns to jobs table
ALTER TABLE jobs
  ADD COLUMN status job_status NOT NULL DEFAULT 'active',
  ADD COLUMN stripe_session_id TEXT,
  ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN is_newsletter_featured BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN featured_until TIMESTAMPTZ,
  ADD COLUMN poster_email TEXT;

-- Update existing jobs to have 'active' status (they were already live)
UPDATE jobs SET status = 'active' WHERE is_active = true;

-- Create indexes for new columns
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_is_featured ON jobs(is_featured) WHERE is_featured = true;
CREATE INDEX idx_jobs_featured_until ON jobs(featured_until) WHERE featured_until IS NOT NULL;
CREATE INDEX idx_jobs_stripe_session ON jobs(stripe_session_id) WHERE stripe_session_id IS NOT NULL;

-- Update the SELECT policy to include status check
DROP POLICY IF EXISTS "Active jobs are viewable by everyone" ON jobs;
CREATE POLICY "Active jobs are viewable by everyone"
  ON jobs
  FOR SELECT
  USING (status = 'active' AND is_active = true);

-- Allow anyone to insert jobs (they will have pending_payment status)
CREATE POLICY "Anyone can insert pending jobs"
  ON jobs
  FOR INSERT
  WITH CHECK (status = 'pending_payment');

-- Allow anyone to insert companies (for new job postings)
CREATE POLICY "Anyone can insert companies"
  ON companies
  FOR INSERT
  WITH CHECK (true);

-- Grant INSERT permissions
GRANT INSERT ON jobs TO anon, authenticated;
GRANT INSERT ON companies TO anon, authenticated;
