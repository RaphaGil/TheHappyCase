"use client";

import { useEffect } from 'react';

const EnvDebug = () => {
  useEffect(() => {
    console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10));
  }, []);

  return null; // This component doesn't render anything
};

export default EnvDebug;
