import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';

export default function HomePage() {
  const featuredJobs = mockJobs.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Find Your Next Industrial Sales Opportunity
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The premier job board for industrial sales professionals.
              Connect with top employers in manufacturing, automation, and
              industrial equipment.
            </p>
            <Suspense fallback={<div className="h-14 bg-blue-700/50 rounded-lg animate-pulse" />}>
              <SearchBar className="max-w-2xl" />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-steel-50 border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-steel-600">Active Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">200+</p>
              <p className="text-steel-600">Companies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">50</p>
              <p className="text-steel-600">States Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">$95K</p>
              <p className="text-steel-600">Avg. Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-steel-800">Featured Jobs</h2>
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              View all jobs
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-steel-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-steel-800 text-center mb-12">
            Industries We Serve
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Manufacturing', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { name: 'Automation', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { name: 'Equipment', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              { name: 'Materials', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            ].map((industry) => (
              <div
                key={industry.name}
                className="bg-white border border-steel-200 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={industry.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-steel-800">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Advance Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of industrial sales professionals who have found
              their next opportunity through Industrial Jobs HQ.
            </p>
            <Link
              href="/jobs"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
