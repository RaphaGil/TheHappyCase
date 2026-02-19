"use client";

import { useEffect } from 'react';

const EnvDebug = () => {
  useEffect(() => {
    // In Next.js, use process.env.NEXT_PUBLIC_* for client-accessible env variables
    const supabaseUrl = 
      (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
      (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
      'Not set';
    const supabaseKey = 
      (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
      (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
      'Not set';
    
    console.log("SUPABASE URL:", supabaseUrl);
    console.log("SUPABASE KEY:", typeof supabaseKey === 'string' && supabaseKey.length > 10 ? supabaseKey.slice(0, 10) + '...' : supabaseKey);
  }, []);

  return null; // This component doesn't render anything
};

export default EnvDebug;
