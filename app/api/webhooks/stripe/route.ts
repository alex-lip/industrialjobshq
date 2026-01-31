import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata?.job_id) {
      console.error('No job_id in session metadata');
      return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    const isFeatured = metadata.is_featured === 'true';
    const isNewsletterFeatured = metadata.is_newsletter_featured === 'true';

    // Calculate featured_until (30 days from now if featured)
    const featuredUntil = isFeatured
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Activate the job
    const { error } = await getSupabaseAdmin()
      .from('jobs')
      .update({
        status: 'active',
        is_active: true,
        is_featured: isFeatured,
        is_newsletter_featured: isNewsletterFeatured,
        featured_until: featuredUntil,
        posted_at: new Date().toISOString(),
      })
      .eq('id', metadata.job_id);

    if (error) {
      console.error('Failed to activate job:', error);
      return NextResponse.json(
        { error: 'Failed to activate job' },
        { status: 500 }
      );
    }

    console.log(`Job ${metadata.job_id} activated successfully`);
  }

  return NextResponse.json({ received: true });
}
