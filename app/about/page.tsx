import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Industrial Jobs HQ, the premier job board for industrial sales professionals in manufacturing, automation, and industrial equipment.',
};

export default function AboutPage() {
  return (
    <div className="bg-steel-50 min-h-screen">
      {/* Hero */}
      <div className="bg-white border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-steel-800 mb-4">
            About Industrial Jobs HQ
          </h1>
          <p className="text-xl text-steel-600 max-w-3xl">
            Connecting industrial sales talent with the companies that need them.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-steel-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-steel-800 mb-6">Our Mission</h2>
              <p className="text-steel-600 mb-6 leading-relaxed">
                Industrial Jobs HQ was founded with a simple mission: to create the
                definitive destination for industrial sales job seekers and
                employers. We understand that industrial sales is a unique field
                that requires specialized skills, industry knowledge, and the
                ability to build lasting business relationships.
              </p>

              <p className="text-steel-600 mb-6 leading-relaxed">
                Our platform is designed specifically for professionals in
                manufacturing sales, automation and robotics, industrial equipment,
                raw materials, and related B2B sectors. We connect experienced sales
                professionals with companies looking for talent who understand the
                industrial landscape.
              </p>

              <h2 className="text-2xl font-bold text-steel-800 mb-6 mt-12">
                Why Industrial Sales?
              </h2>
              <p className="text-steel-600 mb-6 leading-relaxed">
                Industrial sales is the backbone of American manufacturing and
                commerce. These professionals drive billions of dollars in business
                annually, connecting manufacturers with the equipment, materials,
                and solutions they need to operate and grow.
              </p>

              <p className="text-steel-600 mb-6 leading-relaxed">
                Unlike other job boards that treat industrial sales as an
                afterthought, we put these careers front and center. Our team has
                deep experience in industrial markets and understands what both job
                seekers and employers need to make successful matches.
              </p>

              <h2 className="text-2xl font-bold text-steel-800 mb-6 mt-12">
                What We Offer
              </h2>
              <ul className="space-y-4">
                {[
                  'Curated job listings from verified employers',
                  'Industry-specific search and filtering',
                  'Salary transparency on all listings',
                  'Location-based job discovery',
                  'Direct links to employer application pages',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-steel-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-steel-200 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-steel-800 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="border-b border-steel-200 pb-4">
                  <p className="text-3xl font-bold text-blue-600">500+</p>
                  <p className="text-steel-600">Active job listings</p>
                </div>
                <div className="border-b border-steel-200 pb-4">
                  <p className="text-3xl font-bold text-blue-600">200+</p>
                  <p className="text-steel-600">Partner companies</p>
                </div>
                <div className="border-b border-steel-200 pb-4">
                  <p className="text-3xl font-bold text-blue-600">50</p>
                  <p className="text-steel-600">States covered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">$95K</p>
                  <p className="text-steel-600">Average salary</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-steel-200">
                <Link
                  href="/jobs"
                  className="block w-full px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
