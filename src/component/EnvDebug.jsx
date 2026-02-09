"use client";

import { useEffect } from 'react';

const EnvDebug = () => {
  useEffect(() => {
    // Check both NEXT_PUBLIC (Next.js) and VITE (Vite) environment variables
    console.log("SUPABASE URL (NEXT_PUBLIC):", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("SUPABASE KEY (NEXT_PUBLIC):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 10));
    console.log("SUPABASE URL (VITE):", import.meta.env.VITE_SUPABASE_URL);
    console.log("SUPABASE KEY (VITE):", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10));
  }, []);

  return null; // This component doesn't render anything
};

export default EnvDebug;
