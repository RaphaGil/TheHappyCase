import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const SignInModal = ({ show, onClose, onVerified, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(initialEmail ? 'code' : 'email'); // 'email' or 'code'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      // Set email from initialEmail if provided
      if (initialEmail) {
        setEmail(initialEmail);
        setCode('');
        setError('');
        setSuccess(false);
        // Automatically send code if email is provided
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(initialEmail)) {
          handleSendCodeAutomatically(initialEmail);
        } else {
          setStep('email');
        }
      } else {
        setEmail('');
        setStep('email');
        setCode('');
        setError('');
        setSuccess(false);
      }
    } else {
      // Reset form when modal closes
      setEmail('');
      setCode('');
      setStep('email');
      setError('');
      setSuccess(false);
      setLoading(false);
    }
  }, [show, initialEmail, onClose]);

  const handleSendCodeAutomatically = async (emailToUse) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
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
    if (!code || code.length !== 8) {
      setError('Please enter the 8-digit code');
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

      // Get user email (use authenticated email or fallback to input email)
      const userEmail = user.email || email;
      
      // Store user session in localStorage
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user.id); // Store user ID for order saving
      
      console.log('✅ User logged in:', userEmail);
      console.log('✅ User ID:', user.id);

      // Call onVerified callback with the email
      onVerified(userEmail);
      onClose();
    } catch (err) {
      console.error('❌ Exception verifying OTP:', err);
      setError(err.message || 'Invalid code. Please try again.');
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setCode('');
    setError('');
    handleSendCode({ preventDefault: () => {} });
  };

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-md w-full p-6 border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 font-inter">
            Sign In
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors rounded"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {success && step === 'code' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-light font-inter">
              Verification code sent to <strong>{email}</strong>
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-light font-inter">
              {error}
            </p>
          </div>
        )}

        {/* Email Step */}
        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-base text-gray-500 mb-1.5 font-light font-inter">
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
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm uppercase tracking-wider font-light font-inter border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm uppercase tracking-wider font-light font-inter bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </div>
          </form>
        )}

        {/* Code Verification Step */}
        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-light font-inter mb-4">
                We've sent an 8-digit verification code to <strong>{email}</strong>. Please enter it below.
              </p>
              <label className="block text-base text-gray-500 mb-1.5 font-light font-inter">
                Verification Code *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  // Only allow digits and limit to 8 characters
                  const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                  setCode(value);
                  setError('');
                }}
                placeholder="00000000"
                maxLength={8}
                autoFocus
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base text-center text-2xl tracking-widest"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 font-inter">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading || !code || code.length !== 8}
                className="w-full px-4 py-2 text-sm uppercase tracking-wider font-light font-inter bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
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
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError('');
                }}
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

export default SignInModal;

