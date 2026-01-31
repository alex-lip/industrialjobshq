import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/jobs';

export const metadata: Metadata = {
  title: 'Browse Industrial Sales Jobs',
  description:
    'Search and filter industrial sales job opportunities. Find positions in manufacturing, automation, industrial equipment, and more.',
};

interface JobsPageProps {
  searchParams: Promise<{ q?: string; location?: string }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const jobs = await getJobs({
    query: params.q,
    location: params.location,
  });

  return (
    <div className="bg-steel-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-steel-800 mb-6">
            Industrial Sales Jobs
          </h1>
          <Suspense fallback={<div className="h-14 bg-steel-100 rounded-lg animate-pulse" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-steel-600">
                Showing <span className="font-semibold">{jobs.length}</span> jobs
              </p>
              <select className="border border-steel-300 rounded-lg px-4 py-2 text-steel-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Most Recent</option>
                <option>Highest Salary</option>
                <option>Most Relevant</option>
              </select>
            </div>

            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-steel-200 rounded-lg p-8 text-center">
                <p className="text-steel-600 mb-4">
                  No jobs found matching your criteria.
                </p>
                <p className="text-steel-500 text-sm">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* Pagination - simplified for now */}
            {jobs.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled
                  className="px-4 py-2 border border-steel-300 rounded-lg text-steel-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-steel-300 rounded-lg text-steel-700 hover:bg-steel-50">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
