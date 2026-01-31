import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import JobCard from '@/components/JobCard';
import { getLocationPage, getJobsByLocation, mockLocationPages } from '@/lib/mock-data';

interface LocationPageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  return mockLocationPages.map((page) => ({
    state: page.state.toLowerCase(),
    city: page.city.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { state, city } = await params;
  const locationPage = getLocationPage(state, city);

  if (!locationPage) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: locationPage.metaTitle,
    description: locationPage.metaDescription,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { state, city } = await params;
  const locationPage = getLocationPage(state, city);

  if (!locationPage) {
    notFound();
  }

  const jobs = getJobsByLocation(city, locationPage.stateAbbr);

  return (
    <div className="bg-steel-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-white">
              Jobs
            </Link>
            <span>/</span>
            <span className="text-white">
              {locationPage.city}, {locationPage.stateAbbr}
            </span>
          </nav>

          <h1 className="text-4xl font-bold mb-4">{locationPage.heading}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{locationPage.content}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Jobs in this location */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-steel-800 mb-6">
            Available Jobs in {locationPage.city}
          </h2>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-steel-200 rounded-lg p-8 text-center">
              <p className="text-steel-600 mb-4">
                No jobs currently available in {locationPage.city},{' '}
                {locationPage.stateAbbr}.
              </p>
              <Link
                href="/jobs"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse all jobs
              </Link>
            </div>
          )}
        </section>

        {/* SEO Content */}
        <section className="bg-white border border-steel-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-steel-800 mb-4">
            About Industrial Sales in {locationPage.city}, {locationPage.state}
          </h2>
          <div className="prose prose-steel max-w-none">
            <p className="text-steel-600 mb-4">{locationPage.content}</p>
            <p className="text-steel-600 mb-4">
              Industrial sales professionals in {locationPage.city} work across
              various sectors including manufacturing, automation, industrial
              equipment, and B2B services. The region offers competitive salaries
              and opportunities for career advancement.
            </p>
            <p className="text-steel-600">
              Whether you are looking for your first industrial sales role or are
              an experienced professional seeking new challenges,{' '}
              {locationPage.city} provides a dynamic market with diverse
              opportunities.
            </p>
          </div>
        </section>

        {/* Other Locations */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-steel-800 mb-6">
            Explore Other Locations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockLocationPages
              .filter(
                (page) =>
                  page.city.toLowerCase() !== city.toLowerCase() ||
                  page.state.toLowerCase() !== state.toLowerCase()
              )
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/jobs/in/${page.state.toLowerCase()}/${page.city.toLowerCase()}`}
                  className="bg-white border border-steel-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-steel-800">
                    {page.city}, {page.stateAbbr}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
