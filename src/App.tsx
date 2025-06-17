import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SurveyProvider } from './context/SurveyContext';
import Header from './components/Header';
import Footer from './components/Footer';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import SurveyModal from './components/SurveyModal';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import { useSurvey } from './context/SurveyContext';

const AppContent: React.FC = () => {
  const { showSurvey, setShowSurvey, markSurveyAsSeen } = useSurvey();

  const handleCloseSurvey = () => {
    markSurveyAsSeen();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <EmailVerificationBanner />
      <main className="flex-1 pt-24 md:pt-28">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
      
      <SurveyModal 
        isOpen={showSurvey} 
        onClose={handleCloseSurvey}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SurveyProvider>
          <Router>
            <AppContent />
          </Router>
        </SurveyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;