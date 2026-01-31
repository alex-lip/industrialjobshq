import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Browse Industrial Sales Jobs',
  description:
    'Search and filter industrial sales job opportunities. Find positions in manufacturing, automation, industrial equipment, and more.',
};

export default function JobsPage() {
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
                Showing <span className="font-semibold">{mockJobs.length}</span> jobs
              </p>
              <select className="border border-steel-300 rounded-lg px-4 py-2 text-steel-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Most Recent</option>
                <option>Highest Salary</option>
                <option>Most Relevant</option>
              </select>
            </div>

            <div className="space-y-4">
              {mockJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
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
                2
              </button>
              <button className="px-4 py-2 border border-steel-300 rounded-lg text-steel-700 hover:bg-steel-50">
                3
              </button>
              <button className="px-4 py-2 border border-steel-300 rounded-lg text-steel-700 hover:bg-steel-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
