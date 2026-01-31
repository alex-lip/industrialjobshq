import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return stripeInstance;
}

// Pricing constants (in cents)
export const PRICING = {
  BASE_LISTING: 19900, // $199.00
  FEATURED_HOMEPAGE: 20000, // $200.00
  FEATURED_NEWSLETTER: 10000, // $100.00
} as const;

// Pricing display values (in dollars)
export const PRICING_DISPLAY = {
  BASE_LISTING: 199,
  FEATURED_HOMEPAGE: 200,
  FEATURED_NEWSLETTER: 100,
} as const;
