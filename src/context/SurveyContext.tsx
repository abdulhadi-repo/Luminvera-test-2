import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  useEffect(() => {
    // Check if user has seen survey before
    const surveyShown = localStorage.getItem('surveyShown');
    if (surveyShown) {
      setHasSeenSurvey(true);
    } else {
      // Show survey after 10 seconds for new users
      const timer = setTimeout(() => {
        setShowSurvey(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

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