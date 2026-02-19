import { createClient } from '@supabase/supabase-js';

// Single Supabase client instance for the entire application
// This prevents multiple GoTrueClient instances warning
// In Next.js, use NEXT_PUBLIC_ prefix for client-accessible env variables
// These are injected at build time and available in both server and client

// Create singleton instance
let supabaseInstance = null;

export const getSupabaseClient = () => {
  // Return existing instance if already created
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // In Next.js, NEXT_PUBLIC_* variables are injected at build time
  // Access them directly - they're available in both server and client code
  let supabaseUrl = '';
  let supabaseAnonKey = '';

  // Try to get from process.env (works in both server and client in Next.js)
  if (typeof process !== 'undefined' && process.env) {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
    supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  }

  // Debug logging (only in development)
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    console.log('[Supabase Client] Environment check:', {
      hasProcess: typeof process !== 'undefined',
      hasEnv: typeof process !== 'undefined' && !!process.env,
      NEXT_PUBLIC_SUPABASE_URL: typeof process !== 'undefined' ? !!process.env?.NEXT_PUBLIC_SUPABASE_URL : false,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: typeof process !== 'undefined' ? !!process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : false,
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET',
      supabaseAnonKey: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : 'NOT SET',
    });
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

  // Only warn in browser (not during SSR)
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env');
    console.warn('   Make sure to restart your Next.js dev server after changing .env files');
    console.warn('   Current values:', {
      url: supabaseUrl || 'NOT SET',
      key: supabaseAnonKey ? 'SET (hidden)' : 'NOT SET'
    });
  }
  return null;
};

// Export the client directly for convenience
// Lazy initialization - only creates client when first accessed
export const supabase = getSupabaseClient();
