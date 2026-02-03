import { createClient } from '@supabase/supabase-js';

// Single Supabase client instance for the entire application
// This prevents multiple GoTrueClient instances warning
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create singleton instance
let supabaseInstance = null;

export const getSupabaseClient = () => {
  // Return existing instance if already created
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Create new instance only if credentials are available
  if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    console.log('✅ Supabase client initialized (singleton)');
    return supabaseInstance;
  }

  console.warn('⚠️ Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  return null;
};

// Export the client directly for convenience
export const supabase = getSupabaseClient();
