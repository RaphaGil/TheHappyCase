import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSupabaseClient } from '../../utils/supabaseClient';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(initialEmail ? 'code' : 'email'); // 'email' or 'code'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Check if user is already logged in - keep them logged in
    const userEmail = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn && userEmail) {
      // User is already logged in, redirect to My Orders or requested page
      const redirectTo = searchParams.get('redirect') || '/my-orders';
      navigate(redirectTo, { replace: true });
      return;
    }
    
    // If email is in URL, automatically send code
    if (initialEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(initialEmail)) {
        handleSendCodeAutomatically(initialEmail);
      }
    }
  }, [navigate, searchParams, initialEmail]);

  const handleSendCodeAutomatically = async (emailToUse) => {
    setLoading(true);
    setError('');
    
    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Send OTP email using Supabase (code instead of magic link)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: {
          emailRedirectTo: null
        }
      });

      if (error) {
        console.error('❌ Error sending OTP:', error);
        setError(error.message || 'Failed to send verification code. Please try again.');
        setLoading(false);
        return;
      }

      console.log('✅ OTP sent successfully:', data);
      setLoading(false);
      setStep('code');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('❌ Exception sending OTP:', err);
      setLoading(false);
      setError(err.message || 'Failed to send verification code. Please try again.');
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Send OTP email using Supabase (code instead of magic link)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: null
        }
      });

      if (error) {
        console.error('❌ Error sending OTP:', error);
        setError(error.message || 'Failed to send verification code. Please try again.');
        setLoading(false);
        return;
      }

      console.log('✅ OTP sent successfully:', data);
      setLoading(false);
      setStep('code');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('❌ Exception sending OTP:', err);
      setLoading(false);
      setError(err.message || 'Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please check your environment variables.');
      }

      // Verify OTP code with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: 'email',
      });

      if (error) {
        console.error('❌ Error verifying OTP:', error);
        setError(error.message || 'Invalid code. Please try again.');
        setLoading(false);
        return;
      }

      console.log('✅ OTP verified successfully:', data);

      // Get the authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ Error getting user:', userError);
        setError('Failed to get user information. Please try again.');
        setLoading(false);
        return;
      }

      // Store user session in localStorage
      const userEmail = user.email || email;
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user.id); // Store user ID for order saving
      
      console.log('✅ User logged in:', userEmail);
      console.log('✅ User ID:', user.id);

      // Redirect to My Orders page (or previous page if redirected from another route)
      const redirectTo = searchParams.get('redirect') || '/my-orders';
      navigate(redirectTo);
    } catch (err) {
      console.error('❌ Exception verifying OTP:', err);
      setError(err.message || 'Invalid code. Please try again.');
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setCode('');
    setError('');
    setSuccess(false);
    handleSendCode({ preventDefault: () => {} });
  };

  const handleBackToEmail = () => {
    setStep('email');
    setCode('');
    setError('');
    setSuccess(false);
    // Update URL to remove email parameter
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-title md:text-title-lg font-light text-gray-900 mb-2 font-inter tracking-title">
            {step === 'email' ? 'Log In' : 'Verify Code'}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
        </div>

        {/* Success Message */}
        {success && step === 'code' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-light font-inter">
              Verification code sent to <strong>{email}</strong>
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-light font-inter">
              {error}
            </p>
          </div>
        )}

        {/* Email Input Step */}
        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-light font-inter">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your.email@example.com"
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-sm uppercase tracking-wider font-light font-inter bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>

            <p className="text-xs text-gray-500 text-center font-light font-inter">
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>
          </form>
        )}

        {/* Code Verification Step */}
        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 font-light font-inter mb-4 text-center">
                We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below.
              </p>
              <label className="block text-sm text-gray-700 mb-2 font-light font-inter">
                Verification Code *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                  setError('');
                }}
                placeholder="000000"
                maxLength={6}
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-2xl text-center tracking-widest"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full px-4 py-3 text-sm uppercase tracking-wider font-light font-inter bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter underline disabled:opacity-50"
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={handleBackToEmail}
                className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter"
              >
                ← Back to email
              </button>
            </div>
          </form>
        )}

     
      </div>
    </div>
  );
};

export default Login;

