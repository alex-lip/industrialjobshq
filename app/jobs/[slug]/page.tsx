import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getJobBySlug, getAllJobSlugs } from '@/lib/jobs';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const formatSalary = (min: number, max: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-steel-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-steel-500 hover:text-blue-600">
              Home
            </Link>
            <span className="text-steel-400">/</span>
            <Link href="/jobs" className="text-steel-500 hover:text-blue-600">
              Jobs
            </Link>
            <span className="text-steel-400">/</span>
            <span className="text-steel-700">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-steel-200 rounded-lg p-8">
              {/* Header */}
              <div className="flex gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-steel-100 rounded-lg overflow-hidden">
                    {job.companyLogo ? (
                      <Image
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-steel-400">
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-steel-800 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg text-steel-600 mb-3">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-steel-600">
                    <span className="flex items-center gap-1">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location.city}, {job.location.state}
                    </span>
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-steel-800 mb-4">
                  About This Role
                </h2>
                <p className="text-steel-600 leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-steel-800 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
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
                      <span className="text-steel-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Details */}
              {(job.territory || job.travelPercentage || job.industryVertical) && (
                <div>
                  <h2 className="text-lg font-semibold text-steel-800 mb-4">
                    Additional Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.territory && (
                      <div className="bg-steel-50 rounded-lg p-4">
                        <p className="text-sm text-steel-500 mb-1">Territory</p>
                        <p className="text-steel-800 font-medium">{job.territory}</p>
                      </div>
                    )}
                    {job.travelPercentage != null && (
                      <div className="bg-steel-50 rounded-lg p-4">
                        <p className="text-sm text-steel-500 mb-1">Travel Required</p>
                        <p className="text-steel-800 font-medium">
                          {job.travelPercentage}%
                        </p>
                      </div>
                    )}
                    {job.industryVertical && (
                      <div className="bg-steel-50 rounded-lg p-4">
                        <p className="text-sm text-steel-500 mb-1">Industry</p>
                        <p className="text-steel-800 font-medium">
                          {job.industryVertical}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-steel-200 rounded-lg p-6 sticky top-8">
              <div className="mb-6">
                <p className="text-sm text-steel-500 mb-1">Salary Range</p>
                <p className="text-2xl font-bold text-steel-800">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </p>
                <p className="text-sm text-steel-500">per year</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-steel-500 mb-2">Job Type</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {job.jobType.replace('-', ' ')}
                </span>
              </div>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Apply Now
              </a>

              <Link
                href="/jobs"
                className="block w-full px-6 py-3 border border-steel-300 text-steel-700 text-center font-medium rounded-lg hover:bg-steel-50 transition-colors"
              >
                Back to Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
