"use client";

import { useEffect } from 'react';

const EnvDebug = () => {
  useEffect(() => {
    // Only run in development to avoid console noise in production
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      // In Next.js, NEXT_PUBLIC_* variables are injected at build time
      // They're available directly via process.env in both server and client
      // Note: process.env is available in Next.js client-side code
      const supabaseUrl = 
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.VITE_SUPABASE_URL ||
        'Not set';
      const supabaseKey = 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.VITE_SUPABASE_ANON_KEY ||
        'Not set';
      
      console.log("SUPABASE URL:", supabaseUrl);
      console.log("SUPABASE KEY:", typeof supabaseKey === 'string' && supabaseKey.length > 10 ? supabaseKey.slice(0, 10) + '...' : supabaseKey);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default EnvDebug;
