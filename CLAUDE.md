# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Industrial Jobs HQ is a job board focused on industrial sales jobs. Built as a learning project to gain skills in Next.js, Supabase, and deployment.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: npm

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
app/
├── page.tsx                          # Homepage
├── layout.tsx                        # Root layout with Header/Footer
├── globals.css                       # Global styles and design tokens
├── jobs/
│   ├── page.tsx                      # Job listings with search/filters
│   ├── [slug]/page.tsx               # Individual job detail pages
│   └── in/[state]/[city]/page.tsx    # SEO location pages
├── about/page.tsx                    # About page
└── contact/page.tsx                  # Contact page

components/
├── Header.tsx                        # Site header with navigation
├── Footer.tsx                        # Site footer
├── JobCard.tsx                       # Job listing card component
├── SearchBar.tsx                     # Search form component
└── FilterSidebar.tsx                 # Job filter sidebar

lib/
├── jobs.ts                           # Data fetching functions
├── locations.ts                      # Static SEO location page data
├── mock-data.ts                      # Mock job data (fallback)
└── supabase/
    ├── server.ts                     # Server-side Supabase client (uses cookies)
    ├── client.ts                     # Browser-side Supabase client
    └── static.ts                     # Build-time Supabase client (no cookies)

supabase/
├── schema.sql                        # Database schema (tables, RLS policies)
└── seed.sql                          # Seed data (25 sample jobs)

types/
├── index.ts                          # UI-friendly TypeScript types
└── database.ts                       # Supabase database types
```

## Database Schema

Two tables with a foreign key relationship:

```
companies
├── id (uuid, primary key)
├── name, logo_url, website, created_at

jobs
├── id (uuid, primary key)
├── company_id (uuid, FK → companies.id)
├── slug, title, city, state
├── salary_min, salary_max, job_type
├── description, requirements[], apply_url
├── territory, travel_percentage, industry_vertical
├── is_active, posted_at, created_at
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Data Fetching

Key functions in `lib/jobs.ts`:
- `getJobs(filters?)` - Fetch all active jobs with optional filters
- `getJobBySlug(slug)` - Fetch single job by slug
- `getJobsByLocation(state, city)` - Fetch jobs for location pages
- `getAllJobSlugs()` - For static generation (uses static client)

## Design System

### Colors
- **Blue palette** (blue-50 to blue-950): Primary brand color
- **Steel grays** (steel-50 to steel-950): Neutral colors for text and UI
- **Semantic colors**: success, warning, error, info variants

### Typography
- **Font**: IBM Plex Sans (loaded via Google Fonts)
- **Base size**: 17px minimum (optimized for ages 35-65)

### Spacing
- 4px-based scale with 12 increments (spacing-1 through spacing-12)

## Development Notes

- Location pages use static SEO content from `lib/locations.ts`
- Job detail pages link to external company application URLs
- All components use the custom Tailwind color tokens (blue-*, steel-*)
- Build-time static generation uses `createStaticClient()` (no cookies)
- Runtime data fetching uses `createClient()` from server.ts (with cookies)
