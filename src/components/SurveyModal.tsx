import React, { useState, useEffect } from 'react';
import { X, Star, Gift, Users, Clock } from 'lucide-react';
import { submitSurvey, getSurveyCount, checkEmailExists } from '../lib/supabase';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [surveyCount, setSurveyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
    improvements: [] as string[]
  });

  const improvementOptions = [
    'Product Quality',
    'Website Design',
    'Customer Service',
    'Shipping Speed',
    'Product Variety',
    'Pricing',
    'Mobile Experience',
    'Search Functionality'
  ];

  useEffect(() => {
    if (isOpen) {
      loadSurveyCount();
    }
  }, [isOpen]);

  const loadSurveyCount = async () => {
    try {
      const count = await getSurveyCount();
      setSurveyCount(count);
    } catch (err) {
      console.error('Error loading survey count:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleImprovementToggle = (improvement: string) => {
    const improvements = formData.improvements.includes(improvement)
      ? formData.improvements.filter(item => item !== improvement)
      : [...formData.improvements, improvement];
    
    setFormData({ ...formData, improvements });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError('This email has already been used for a survey.');
        setIsLoading(false);
        return;
      }

      // Submit survey
      await submitSurvey(formData);
      
      // Generate discount code if within first 100
      const newCount = surveyCount + 1;
      if (newCount <= 100) {
        const code = `SURVEY${newCount.toString().padStart(3, '0')}`;
        setDiscountCode(code);
      }
      
      setSuccess(true);
      setStep(4);
    } catch (err) {
      setError('Failed to submit survey. Please try again.');
      console.error('Survey submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  const isEligibleForDiscount = surveyCount < 100;
  const remainingSlots = Math.max(0, 100 - surveyCount);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Gift className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Website Survey</h2>
              <p className="text-sm text-gray-600">Help us improve & get rewarded!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Discount Banner */}
        {isEligibleForDiscount && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 m-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8" />
                <div>
                  <h3 className="font-bold text-lg">10% OFF for First 100 Users!</h3>
                  <p className="text-orange-100">Complete our survey and get instant discount</p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-2 text-orange-100">
                  <Users size={16} />
                  <span className="text-sm">{remainingSlots} spots left</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-100 mt-1">
                  <Clock size={16} />
                  <span className="text-sm">Limited time</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about yourself</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your email address"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send your discount code to this email
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Rating */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate your experience</h3>
                <div className="text-center">
                  <p className="text-gray-600 mb-6">How would you rate our website overall?</p>
                  <div className="flex justify-center space-x-2 mb-6">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(rating)}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={32}
                          className={rating <= formData.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 hover:text-yellow-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <p className="text-sm text-gray-600">
                      {formData.rating === 5 && "Excellent! 🌟"}
                      {formData.rating === 4 && "Great! 👍"}
                      {formData.rating === 3 && "Good 👌"}
                      {formData.rating === 2 && "Fair 😐"}
                      {formData.rating === 1 && "Needs improvement 😔"}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.rating === 0}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Feedback */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Help us improve</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What areas should we improve? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {improvementOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.improvements.includes(option)}
                          onChange={() => handleImprovementToggle(option)}
                          className="mr-2 text-orange-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional feedback (optional)
                  </label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Tell us more about your experience..."
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Submitting...' : 'Submit Survey'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && success && (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Gift className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your feedback has been submitted successfully.</p>
              </div>

              {discountCode && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-2">🎉 Congratulations!</h4>
                  <p className="mb-4">You're one of our first 100 users! Here's your exclusive discount code:</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <code className="text-2xl font-bold tracking-wider">{discountCode}</code>
                  </div>
                  <p className="text-sm text-orange-100">
                    Use this code at checkout to get 10% off all items!
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SurveyModal;