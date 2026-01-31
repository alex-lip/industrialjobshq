import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Client for build-time/static operations (no cookies needed)
// Use this in generateStaticParams and other build-time functions
export function createStaticClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
