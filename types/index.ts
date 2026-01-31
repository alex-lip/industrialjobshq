export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string; // URL to square company logo
  location: {
    city: string;
    state: string;
  };
  salaryMin: number;
  salaryMax: number;
  jobType: 'full-time' | 'contract' | 'part-time';
  description: string;
  requirements: string[];
  postedDate: string; // ISO date string
  applyUrl: string; // Link to company's job posting
  territory?: string; // Optional: sales territory
  travelPercentage?: number; // Optional: travel requirement
  industryVertical?: string; // Optional: e.g., "Manufacturing", "Automation"
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
