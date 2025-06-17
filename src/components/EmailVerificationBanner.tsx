import React, { useState } from 'react';
import { Mail, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EmailVerificationBanner: React.FC = () => {
  const { user, isEmailVerified, resendVerification } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user || isEmailVerified || !isVisible) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const result = await resendVerification(user.email);
      if (result.success) {
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        setMessage(result.error || 'Failed to send verification email');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <strong>Please verify your email address.</strong> We've sent a verification link to {user.email}
              </p>
              {message && (
                <p className={`text-xs mt-1 ${
                  message.includes('sent') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1 border border-yellow-300 rounded-md text-xs font-medium text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={14} className="mr-1" />
              {isLoading ? 'Sending...' : 'Resend'}
            </button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;