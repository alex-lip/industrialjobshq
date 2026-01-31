'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CanceledBanner() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled') === 'true';

  if (!canceled) return null;

  return (
    <div className="mb-6 p-4 bg-warning-light border border-warning rounded-lg">
      <p className="text-warning-dark">
        Your payment was canceled. Your job listing has been saved - you
        can complete the payment below.
      </p>
    </div>
  );
}

const US_STATES = [
  { abbr: 'AL', name: 'Alabama' },
  { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' },
  { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' },
  { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' },
  { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' },
  { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' },
  { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' },
  { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' },
  { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' },
  { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' },
  { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' },
  { abbr: 'WY', name: 'Wyoming' },
];

const PRICING = {
  base: 199,
  featured: 200,
  newsletter: 100,
};

export default function PostJobPage() {
  // Form state
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [jobType, setJobType] = useState<'full-time' | 'contract' | 'part-time'>(
    'full-time'
  );
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [applyUrl, setApplyUrl] = useState('');
  const [territory, setTerritory] = useState('');
  const [travelPercentage, setTravelPercentage] = useState('');
  const [industryVertical, setIndustryVertical] = useState('');
  const [posterEmail, setPosterEmail] = useState('');

  // Pricing options
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewsletterFeatured, setIsNewsletterFeatured] = useState(false);

  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTotal = () => {
    let total = PRICING.base;
    if (isFeatured) total += PRICING.featured;
    if (isNewsletterFeatured) total += PRICING.newsletter;
    return total;
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobData: {
            title,
            companyName,
            companyWebsite,
            city,
            state,
            jobType,
            salaryMin: parseInt(salaryMin) || 0,
            salaryMax: parseInt(salaryMax) || 0,
            description,
            requirements: requirements.filter((r) => r.trim() !== ''),
            applyUrl,
            territory,
            travelPercentage: parseInt(travelPercentage) || 0,
            industryVertical,
            posterEmail,
          },
          pricing: {
            isFeatured,
            isNewsletterFeatured,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-steel-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/jobs"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            &larr; Back to Jobs
          </Link>
        </div>

        <div className="bg-white border border-steel-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-steel-800 mb-2">
            Post a Job
          </h1>
          <p className="text-steel-600 mb-8">
            Reach thousands of qualified industrial sales professionals.
          </p>

          <Suspense fallback={null}>
            <CanceledBanner />
          </Suspense>

          {error && (
            <div className="mb-6 p-4 bg-error-light border border-error rounded-lg">
              <p className="text-error-dark">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Details Section */}
            <section>
              <h2 className="text-xl font-semibold text-steel-800 mb-6 pb-2 border-b border-steel-200">
                Job Details
              </h2>

              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-steel-700 mb-2"
                  >
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Senior Sales Engineer"
                    className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                  />
                </div>

                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Acme Industrial"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyWebsite"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Company Website
                    </label>
                    <input
                      type="url"
                      id="companyWebsite"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Columbus"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      State *
                    </label>
                    <select
                      id="state"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-steel-700"
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map((s) => (
                        <option key={s.abbr} value={s.abbr}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Job Type & Salary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="jobType"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Job Type *
                    </label>
                    <select
                      id="jobType"
                      required
                      value={jobType}
                      onChange={(e) =>
                        setJobType(
                          e.target.value as 'full-time' | 'contract' | 'part-time'
                        )
                      }
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-steel-700"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="contract">Contract</option>
                      <option value="part-time">Part-time</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="salaryMin"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Salary Min ($) *
                    </label>
                    <input
                      type="number"
                      id="salaryMin"
                      required
                      min="0"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="60000"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="salaryMax"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Salary Max ($) *
                    </label>
                    <input
                      type="number"
                      id="salaryMax"
                      required
                      min="0"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="90000"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-steel-700 mb-2"
                  >
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Requirements *
                  </label>
                  <div className="space-y-3">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) =>
                            updateRequirement(index, e.target.value)
                          }
                          placeholder={`Requirement ${index + 1}`}
                          className="flex-1 px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                        />
                        {requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="px-3 py-3 text-steel-500 hover:text-error hover:bg-error-light rounded-lg transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add another requirement
                  </button>
                </div>

                {/* Apply URL */}
                <div>
                  <label
                    htmlFor="applyUrl"
                    className="block text-sm font-medium text-steel-700 mb-2"
                  >
                    Application URL *
                  </label>
                  <input
                    type="url"
                    id="applyUrl"
                    required
                    value={applyUrl}
                    onChange={(e) => setApplyUrl(e.target.value)}
                    placeholder="https://yourcompany.com/careers/apply"
                    className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                  />
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="territory"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Territory
                    </label>
                    <input
                      type="text"
                      id="territory"
                      value={territory}
                      onChange={(e) => setTerritory(e.target.value)}
                      placeholder="e.g., Midwest Region"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="travelPercentage"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Travel %
                    </label>
                    <input
                      type="number"
                      id="travelPercentage"
                      min="0"
                      max="100"
                      value={travelPercentage}
                      onChange={(e) => setTravelPercentage(e.target.value)}
                      placeholder="25"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="industryVertical"
                      className="block text-sm font-medium text-steel-700 mb-2"
                    >
                      Industry Vertical
                    </label>
                    <input
                      type="text"
                      id="industryVertical"
                      value={industryVertical}
                      onChange={(e) => setIndustryVertical(e.target.value)}
                      placeholder="e.g., Manufacturing"
                      className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                    />
                  </div>
                </div>

                {/* Poster Email */}
                <div>
                  <label
                    htmlFor="posterEmail"
                    className="block text-sm font-medium text-steel-700 mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="posterEmail"
                    required
                    value={posterEmail}
                    onChange={(e) => setPosterEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-steel-400"
                  />
                  <p className="mt-1 text-sm text-steel-500">
                    We&apos;ll send your receipt and job confirmation here.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section>
              <h2 className="text-xl font-semibold text-steel-800 mb-6 pb-2 border-b border-steel-200">
                Choose Your Package
              </h2>

              <div className="space-y-4">
                {/* Base Package */}
                <div className="p-4 border border-steel-200 rounded-lg bg-steel-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-steel-800">
                        Standard Job Listing
                      </h3>
                      <p className="text-sm text-steel-600">
                        30-day listing on our job board
                      </p>
                    </div>
                    <span className="text-xl font-bold text-steel-800">
                      ${PRICING.base}
                    </span>
                  </div>
                </div>

                {/* Featured Add-on */}
                <label className="block p-4 border border-steel-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 border-steel-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-steel-800">
                            Featured on Homepage
                          </h3>
                          <p className="text-sm text-steel-600">
                            Premium placement at the top of our homepage for 30
                            days
                          </p>
                        </div>
                        <span className="text-xl font-bold text-blue-600">
                          +${PRICING.featured}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Newsletter Add-on */}
                <label className="block p-4 border border-steel-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isNewsletterFeatured}
                      onChange={(e) => setIsNewsletterFeatured(e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 border-steel-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-steel-800">
                            Featured in Newsletter
                          </h3>
                          <p className="text-sm text-steel-600">
                            Highlighted in our weekly email to 5,000+ subscribers
                          </p>
                        </div>
                        <span className="text-xl font-bold text-blue-600">
                          +${PRICING.newsletter}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Total */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-steel-800">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Processing...'
                  : `Proceed to Payment - $${calculateTotal()}`}
              </button>
              <p className="mt-4 text-center text-sm text-steel-500">
                Secure payment powered by Stripe. Your job listing will go live
                immediately after payment.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
