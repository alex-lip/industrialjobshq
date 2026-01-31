import { createClient } from '@/lib/supabase/server';
import { createStaticClient } from '@/lib/supabase/static';
import type { Job, JobFilters, JobWithCompany } from '@/types';

// Transform database row to UI-friendly format
function transformJob(row: JobWithCompany): Job {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    company: row.companies.name,
    companyLogo: row.companies.logo_url,
    location: {
      city: row.city,
      state: row.state,
    },
    salaryMin: row.salary_min,
    salaryMax: row.salary_max,
    jobType: row.job_type,
    description: row.description,
    requirements: row.requirements,
    postedDate: row.posted_at,
    applyUrl: row.apply_url,
    territory: row.territory,
    travelPercentage: row.travel_percentage,
    industryVertical: row.industry_vertical,
    isFeatured: row.is_featured,
    isNewsletterFeatured: row.is_newsletter_featured,
    featuredUntil: row.featured_until,
  };
}

/**
 * Fetch all active jobs with optional filters
 */
export async function getJobs(filters?: JobFilters): Promise<Job[]> {
  const supabase = await createClient();

  let query = supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('is_active', true)
    .order('posted_at', { ascending: false });

  // Apply filters
  if (filters?.query) {
    query = query.or(
      `title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`
    );
  }

  if (filters?.location) {
    query = query.or(
      `city.ilike.%${filters.location}%,state.ilike.%${filters.location}%`
    );
  }

  if (filters?.jobType && filters.jobType.length > 0) {
    query = query.in('job_type', filters.jobType);
  }

  if (filters?.salaryMin) {
    query = query.gte('salary_max', filters.salaryMin);
  }

  if (filters?.salaryMax) {
    query = query.lte('salary_min', filters.salaryMax);
  }

  if (filters?.industry && filters.industry.length > 0) {
    query = query.in('industry_vertical', filters.industry);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return (data as JobWithCompany[]).map(transformJob);
}

/**
 * Fetch a single job by slug
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error fetching job:', error);
    }
    return null;
  }

  return transformJob(data as JobWithCompany);
}

/**
 * Fetch jobs by location (for SEO pages)
 */
export async function getJobsByLocation(
  state: string,
  city: string
): Promise<Job[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('is_active', true)
    .ilike('state', state)
    .ilike('city', city)
    .order('posted_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs by location:', error);
    return [];
  }

  return (data as JobWithCompany[]).map(transformJob);
}

/**
 * Get all unique locations for generating static paths
 * Uses static client (no cookies) for build-time generation
 */
export async function getUniqueLocations(): Promise<
  { state: string; city: string }[]
> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('state, city')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  // Get unique combinations
  const uniqueLocations = new Map<string, { state: string; city: string }>();
  (data as { state: string; city: string }[]).forEach((row) => {
    const key = `${row.state.toLowerCase()}-${row.city.toLowerCase()}`;
    if (!uniqueLocations.has(key)) {
      uniqueLocations.set(key, { state: row.state, city: row.city });
    }
  });

  return Array.from(uniqueLocations.values());
}

/**
 * Get all job slugs for generating static paths
 * Uses static client (no cookies) for build-time generation
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('slug')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching job slugs:', error);
    return [];
  }

  return (data as { slug: string }[]).map((row) => row.slug);
}

/**
 * Fetch featured jobs for homepage display
 * Returns jobs that are featured and have a valid featured_until date
 */
export async function getFeaturedJobs(): Promise<Job[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .gt('featured_until', new Date().toISOString())
    .order('posted_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching featured jobs:', error);
    return [];
  }

  return (data as JobWithCompany[]).map(transformJob);
}
