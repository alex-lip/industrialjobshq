import Link from 'next/link';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let jobSlug: string | null = null;
  let jobTitle: string | null = null;

  if (session_id) {
    try {
      // Retrieve session to get job_id from metadata
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      const jobId = session.metadata?.job_id;

      if (jobId) {
        const { data: job } = await getSupabaseAdmin()
          .from('jobs')
          .select('slug, title')
          .eq('id', jobId)
          .single();

        if (job) {
          jobSlug = job.slug;
          jobTitle = job.title;
        }
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  }

  return (
    <div className="bg-steel-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border border-steel-200 rounded-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-success-light rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-success"
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
          </div>

          <h1 className="text-2xl font-bold text-steel-800 mb-4">
            Thank You for Your Payment!
          </h1>

          <p className="text-steel-600 mb-6">
            Your job posting has been submitted successfully.
            {jobTitle && (
              <>
                {' '}
                <strong>&quot;{jobTitle}&quot;</strong> is now live on our job
                board.
              </>
            )}
          </p>

          <div className="bg-steel-50 border border-steel-200 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-steel-800 mb-2">What happens next?</h2>
            <ul className="text-sm text-steel-600 text-left space-y-2">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
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
                <span>Your job listing is now visible to thousands of job seekers</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
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
                <span>A confirmation receipt has been sent to your email</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
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
                <span>Your listing will remain active for 30 days</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {jobSlug && (
              <Link
                href={`/jobs/${jobSlug}`}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Your Job Listing
              </Link>
            )}
            <Link
              href="/jobs"
              className="px-8 py-3 border border-steel-300 text-steel-700 font-semibold rounded-lg hover:bg-steel-50 transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
