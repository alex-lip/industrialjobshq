import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdminInstance: SupabaseClient | null = null;

/**
 * Get Supabase admin client (uses service role, bypasses RLS)
 * Use this for server-side operations that need to bypass Row Level Security
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdminInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
      );
    }

    supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey);
  }

  return supabaseAdminInstance;
}
