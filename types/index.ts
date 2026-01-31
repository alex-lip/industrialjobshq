// Re-export database types
export type { Database, Company, Job as DbJob, JobWithCompany } from './database';

// UI-friendly job type (used by components)
// This transforms the database structure for easier use in the frontend
export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string | null;
  location: {
    city: string;
    state: string;
  };
  salaryMin: number;
  salaryMax: number;
  jobType: 'full-time' | 'contract' | 'part-time';
  description: string;
  requirements: string[];
  postedDate: string;
  applyUrl: string;
  territory: string | null;
  travelPercentage: number | null;
  industryVertical: string | null;
}

export interface LocationPage {
  state: string;
  stateAbbr: string;
  city: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  content: string;
}

// Filter options for job search
export interface JobFilters {
  query?: string;
  location?: string;
  jobType?: ('full-time' | 'contract' | 'part-time')[];
  salaryMin?: number;
  salaryMax?: number;
  industry?: string[];
}
