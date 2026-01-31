import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PRICING } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import Stripe from 'stripe';

interface JobFormData {
  title: string;
  companyName: string;
  companyWebsite: string;
  city: string;
  state: string;
  jobType: 'full-time' | 'contract' | 'part-time';
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  applyUrl: string;
  territory: string;
  travelPercentage: number;
  industryVertical: string;
  posterEmail: string;
}

interface CheckoutRequest {
  jobData: JobFormData;
  pricing: {
    isFeatured: boolean;
    isNewsletterFeatured: boolean;
  };
}

function generateSlug(title: string, companyName: string): string {
  const base = `${title}-${companyName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${suffix}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { jobData, pricing } = body;

    // Validate required fields
    if (!jobData.title || !jobData.companyName || !jobData.posterEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Create company in Supabase
    const { data: company, error: companyError } = await getSupabaseAdmin()
      .from('companies')
      .insert({
        name: jobData.companyName,
        website: jobData.companyWebsite || null,
      })
      .select()
      .single();

    if (companyError) {
      console.error('Company creation error:', companyError);
      return NextResponse.json(
        { error: 'Failed to create company' },
        { status: 500 }
      );
    }

    // 2. Create job with status='pending_payment'
    const slug = generateSlug(jobData.title, jobData.companyName);

    const { data: job, error: jobError } = await getSupabaseAdmin()
      .from('jobs')
      .insert({
        company_id: company.id,
        slug,
        title: jobData.title,
        city: jobData.city,
        state: jobData.state,
        salary_min: jobData.salaryMin,
        salary_max: jobData.salaryMax,
        job_type: jobData.jobType,
        description: jobData.description,
        requirements: jobData.requirements.filter((r) => r.trim() !== ''),
        apply_url: jobData.applyUrl,
        territory: jobData.territory || null,
        travel_percentage: jobData.travelPercentage || null,
        industry_vertical: jobData.industryVertical || null,
        status: 'pending_payment',
        is_active: false,
        poster_email: jobData.posterEmail,
      })
      .select()
      .single();

    if (jobError) {
      console.error('Job creation error:', jobError);
      return NextResponse.json(
        { error: 'Failed to create job listing' },
        { status: 500 }
      );
    }

    // 3. Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Job Listing (30 days)',
            description: `${jobData.title} at ${jobData.companyName}`,
          },
          unit_amount: PRICING.BASE_LISTING,
        },
        quantity: 1,
      },
    ];

    if (pricing.isFeatured) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Featured on Homepage (30 days)',
            description: 'Premium placement on the homepage',
          },
          unit_amount: PRICING.FEATURED_HOMEPAGE,
        },
        quantity: 1,
      });
    }

    if (pricing.isNewsletterFeatured) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Featured in Newsletter',
            description: 'Highlighted in our weekly email newsletter',
          },
          unit_amount: PRICING.FEATURED_NEWSLETTER,
        },
        quantity: 1,
      });
    }

    // 4. Create Stripe Checkout session
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/post-job/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/post-job?canceled=true`,
      customer_email: jobData.posterEmail,
      metadata: {
        job_id: job.id,
        is_featured: pricing.isFeatured ? 'true' : 'false',
        is_newsletter_featured: pricing.isNewsletterFeatured ? 'true' : 'false',
      },
    });

    // 5. Update job with stripe_session_id
    await getSupabaseAdmin()
      .from('jobs')
      .update({ stripe_session_id: session.id })
      .eq('id', job.id);

    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    // Return more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
