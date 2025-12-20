import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthenticationCode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Extract query parameters
  const email = searchParams.get('email') || '';
  const clientId = searchParams.get('client_id') || '';
  const redirectUri = searchParams.get('redirect_uri') || '';
  const locale = searchParams.get('locale') || 'en-GL';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const inputRefs = useRef([]);

  // Send verification code
  const handleSendCode = useCallback(async () => {
    if (!email) {
      setError('Email address is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In production, call your API endpoint here
      // const response = await fetch('/api/send-verification-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, clientId })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCodeSent(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      setLoading(false);
    }
  }, [email, clientId]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    
    // Auto-send code if email is provided
    if (email) {
      handleSendCode();
    }
  }, [email, handleSendCode]);

  // Handle code input change
  const handleCodeChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(0, 1);
    
    if (digit) {
      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);
      setError('');

      // Auto-focus next input
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      setError('');
      // Focus last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  // Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In production, call your API endpoint here
      // const response = await fetch('/api/verify-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, code: fullCode, clientId })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      // In production, check response.isValid
      
      // Redirect after successful verification
      if (redirectUri) {
        // Decode redirect URI if needed
        const decodedRedirectUri = decodeURIComponent(redirectUri);
        // Add authentication token/state to redirect URI
        window.location.href = decodedRedirectUri;
      } else {
        // Fallback redirect
        navigate('/');
      }
    } catch (err) {
      setError('Invalid code. Please try again.');
      setLoading(false);
      // Reset code on error
      setCode(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  // Resend code
  const handleResendCode = () => {
    setCode(['', '', '', '', '', '']);
    setError('');
    handleSendCode();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            Verification Code
          </h1>
          {email && (
            <p className="text-base text-gray-600 font-light font-inter">
              We've sent a 6-digit verification code to
            </p>
          )}
          {email && (
            <p className="text-base font-medium text-gray-900 mt-1 font-inter">
              {email}
            </p>
          )}
        </div>

        {/* Code Input Form */}
        <form onSubmit={handleVerifyCode} className="space-y-6">
          {/* 6-Digit Code Input */}
          <div>
            <label className="block text-sm text-gray-700 mb-4 text-center font-light font-inter">
              Enter Verification Code
            </label>
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-light border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 font-inter"
                  disabled={loading}
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 text-center font-inter bg-red-50 border border-red-200 rounded-sm py-2 px-4">
              {error}
            </div>
          )}

          {/* Success Message */}
          {codeSent && !error && (
            <div className="text-sm text-green-600 text-center font-inter bg-green-50 border border-green-200 rounded-sm py-2 px-4">
              Code sent successfully!
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || code.join('').length !== 6}
            className="w-full px-4 py-3 text-sm uppercase tracking-wider font-light font-inter bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter underline disabled:opacity-50"
            >
              Resend Code
            </button>
          </div>

          {/* Back to Email (if no email in URL) */}
          {!email && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter"
              >
                ← Back
              </button>
            </div>
          )}
        </form>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 font-light font-inter">
            Didn't receive the code? Check your spam folder or{' '}
            <button
              type="button"
              onClick={handleResendCode}
              className="text-gray-900 underline hover:text-gray-700"
            >
              resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCode;

