export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          company_id: string;
          slug: string;
          title: string;
          city: string;
          state: string;
          salary_min: number;
          salary_max: number;
          job_type: 'full-time' | 'contract' | 'part-time';
          description: string;
          requirements: string[];
          apply_url: string;
          territory: string | null;
          travel_percentage: number | null;
          industry_vertical: string | null;
          is_active: boolean;
          posted_at: string;
          created_at: string;
          status: 'pending_payment' | 'active' | 'expired';
          stripe_session_id: string | null;
          is_featured: boolean;
          is_newsletter_featured: boolean;
          featured_until: string | null;
          poster_email: string | null;
        };
        Insert: {
          id?: string;
          company_id: string;
          slug: string;
          title: string;
          city: string;
          state: string;
          salary_min: number;
          salary_max: number;
          job_type?: 'full-time' | 'contract' | 'part-time';
          description: string;
          requirements?: string[];
          apply_url: string;
          territory?: string | null;
          travel_percentage?: number | null;
          industry_vertical?: string | null;
          is_active?: boolean;
          posted_at?: string;
          created_at?: string;
          status?: 'pending_payment' | 'active' | 'expired';
          stripe_session_id?: string | null;
          is_featured?: boolean;
          is_newsletter_featured?: boolean;
          featured_until?: string | null;
          poster_email?: string | null;
        };
        Update: {
          id?: string;
          company_id?: string;
          slug?: string;
          title?: string;
          city?: string;
          state?: string;
          salary_min?: number;
          salary_max?: number;
          job_type?: 'full-time' | 'contract' | 'part-time';
          description?: string;
          requirements?: string[];
          apply_url?: string;
          territory?: string | null;
          travel_percentage?: number | null;
          industry_vertical?: string | null;
          is_active?: boolean;
          posted_at?: string;
          created_at?: string;
          status?: 'pending_payment' | 'active' | 'expired';
          stripe_session_id?: string | null;
          is_featured?: boolean;
          is_newsletter_featured?: boolean;
          featured_until?: string | null;
          poster_email?: string | null;
        };
      };
    };
    Enums: {
      job_type: 'full-time' | 'contract' | 'part-time';
      job_status: 'pending_payment' | 'active' | 'expired';
    };
  };
};

// Convenience types for working with data
export type Company = Database['public']['Tables']['companies']['Row'];
export type Job = Database['public']['Tables']['jobs']['Row'];

// Job with company data joined
export type JobWithCompany = Job & {
  companies: Company;
};
