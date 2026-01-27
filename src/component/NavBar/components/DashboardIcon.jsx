import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

const DashboardIcon = ({ isMobile = false }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      setIsAuthorized(false);
      return;
    }

    // Check if user is authenticated with authorized email
    supabase.auth.getUser().then(({ data, error }) => {
      setCheckingAuth(false);
      
      if (error || !data?.user) {
        setIsAuthorized(false);
        return;
      }

      const userEmail = data.user?.email?.toLowerCase().trim();
      const authorizedEmail = AUTHORIZED_EMAIL.toLowerCase().trim();
      
      setIsAuthorized(userEmail === authorizedEmail);
    });
  }, []);

  // Don't render if still checking or not authorized
  if (checkingAuth || !isAuthorized) {
    return null;
  }

  // For mobile, this is handled in MobileMenu, so we only show on desktop
  if (isMobile) {
    return null;
  }

  return (
    <Link
      to="/dashboard"
      className="hidden lg:flex items-center p-1.5 text-gray-800 hover:text-gray-600 transition-colors z-10"
      aria-label="Go to dashboard"
    >
      <FontAwesomeIcon 
        icon={faChartLine} 
        className="w-5 h-5" 
        style={{ 
          filter: 'opacity(0.85)',
          transform: 'scale(0.9)'
        }}
      />
    </Link>
  );
};

export default DashboardIcon;
