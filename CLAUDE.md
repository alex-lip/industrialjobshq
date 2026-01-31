# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Industrial Jobs HQ is a job board focused on industrial sales jobs. Built as a learning project to gain skills in Next.js, Supabase, and deployment.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (planned)
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
└── mock-data.ts                      # Mock job data (until Supabase)

types/
└── index.ts                          # TypeScript type definitions
```

## Design System

### Colors
- **Blue palette** (blue-50 to blue-950): Primary brand color for industrial reliability
- **Steel grays** (steel-50 to steel-950): Neutral colors for text and UI
- **Semantic colors**: success, warning, error, info variants

### Typography
- **Font**: IBM Plex Sans (loaded via Google Fonts)
- **Base size**: 17px minimum (optimized for ages 35-65)

### Spacing
- 4px-based scale with 12 increments (spacing-1 through spacing-12)

## Key Types

```typescript
interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  location: { city: string; state: string };
  salaryMin: number;
  salaryMax: number;
  jobType: 'full-time' | 'contract' | 'part-time';
  description: string;
  requirements: string[];
  postedDate: string;
  applyUrl: string;
  territory?: string;
  travelPercentage?: number;
  industryVertical?: string;
}
```

## Development Notes

- Currently using mock data in `lib/mock-data.ts`
- Location pages (`/jobs/in/[state]/[city]`) are static SEO landing pages
- Job detail pages link to external company application URLs
- All components use the custom Tailwind color tokens (blue-*, steel-*)
