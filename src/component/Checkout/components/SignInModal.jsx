import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SignInModal = ({ show, onClose, onVerified, initialEmail = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(initialEmail ? 'code' : 'email'); // 'email' or 'code'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      // Set email from initialEmail if provided
      if (initialEmail) {
        setEmail(initialEmail);
        setCode('');
        setError('');
        // Automatically send code if email is provided
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(initialEmail)) {
          setLoading(true);
          // Simulate sending code and redirect
          setTimeout(() => {
            setLoading(false);
            // Build query parameters for redirect
            const params = new URLSearchParams();
            params.set('email', initialEmail);
            
            // Preserve existing query parameters if they exist
            const clientId = searchParams.get('client_id');
            const redirectUri = searchParams.get('redirect_uri');
            const locale = searchParams.get('locale') || 'en-GL';
            
            if (clientId) params.set('client_id', clientId);
            if (redirectUri) params.set('redirect_uri', redirectUri);
            if (locale) params.set('locale', locale);
            
            // Close modal and redirect to authentication code page
            onClose();
            navigate(`/authentication/code?${params.toString()}`);
          }, 1000);
        } else {
          setStep('email');
        }
      } else {
        setEmail('');
        setStep('email');
        setCode('');
        setError('');
      }
    } else {
      // Reset form when modal closes
      setEmail('');
      setCode('');
      setStep('email');
      setError('');
      setLoading(false);
    }
  }, [show, initialEmail, navigate, searchParams, onClose]);

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

    try {
      // In production, call your API endpoint here to send the code
      // await sendVerificationCode(email);
      
      // Simulate sending code
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Build query parameters for redirect
      const params = new URLSearchParams();
      params.set('email', email);
      
      // Preserve existing query parameters if they exist
      const clientId = searchParams.get('client_id');
      const redirectUri = searchParams.get('redirect_uri');
      const locale = searchParams.get('locale') || 'en-GL';
      
      if (clientId) params.set('client_id', clientId);
      if (redirectUri) params.set('redirect_uri', redirectUri);
      if (locale) params.set('locale', locale);
      
      // Close modal first
      onClose();
      
      // Redirect to authentication code page
      navigate(`/authentication/code?${params.toString()}`, { replace: true });
    } catch (err) {
      setLoading(false);
      setError('Failed to send verification code. Please try again.');
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

    // Simulate code verification (in production, this would call an API)
    setTimeout(() => {
      setLoading(false);
      // In production, verify the code with the backend
      // const isValid = await verifyCode(email, code);
      // For demo purposes, accept any 6-digit code
      if (code.length === 6) {
        onVerified(email);
        onClose();
      } else {
        setError('Invalid code. Please try again.');
      }
    }, 1000);
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
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 font-inter">
                {error}
              </div>
            )}

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
                We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below.
              </p>
              <label className="block text-base text-gray-500 mb-1.5 font-light font-inter">
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
                disabled={loading || code.length !== 6}
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

