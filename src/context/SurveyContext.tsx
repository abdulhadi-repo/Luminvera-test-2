import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SurveyContextType {
  showSurvey: boolean;
  setShowSurvey: (show: boolean) => void;
  hasSeenSurvey: boolean;
  markSurveyAsSeen: () => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [hasSeenSurvey, setHasSeenSurvey] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has seen survey before
    const surveyShown = localStorage.getItem('surveyShown');
    if (surveyShown) {
      setHasSeenSurvey(true);
    } else {
      // Only show survey on product pages, not on home page
      const isProductPage = location.pathname.startsWith('/product/');
      
      if (isProductPage) {
        // Show survey after 15 seconds on product pages for new users
        const timer = setTimeout(() => {
          setShowSurvey(true);
        }, 15000);

        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  const markSurveyAsSeen = () => {
    localStorage.setItem('surveyShown', 'true');
    setHasSeenSurvey(true);
    setShowSurvey(false);
  };

  return (
    <SurveyContext.Provider value={{
      showSurvey,
      setShowSurvey,
      hasSeenSurvey,
      markSurveyAsSeen
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};