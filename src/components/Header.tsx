import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number>();

  const cartCount = getCartCount();

  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Kitchen & Home', path: '/category/home-kitchen' },
    { name: 'Tech & Gadgets', path: '/category/tech-gadgets' },
    { name: 'Fashion & Travel', path: '/category/fashion-travel' },
    { name: 'Health & Beauty', path: '/category/health-beauty' },
    { name: 'Baby & Family', path: '/category/baby-family' },
    { name: 'Pets & Outdoors', path: '/category/pets-outdoors' },
    { name: 'Auto & DIY', path: '/category/auto-diy' },
    { name: 'Office & Stationery', path: '/category/office-stationery' }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && navRef.current) {
      const scrollContainer = navRef.current;
      let scrollDirection = 1;
      
      const scroll = () => {
        if (scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          if (scrollContainer.scrollLeft >= maxScroll) {
            scrollDirection = -1;
          } else if (scrollContainer.scrollLeft <= 0) {
            scrollDirection = 1;
          }
          
          scrollContainer.scrollLeft += scrollDirection * 1;
        }
      };

      autoScrollRef.current = window.setInterval(scroll, 50);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  const handleNavInteraction = () => {
    setIsAutoScrolling(false);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleNavLeave = () => {
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000); // Resume auto-scroll after 3 seconds of no interaction
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Logo, Desktop Search, Icons */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
              Luminvera
            </h1>
          </Link>

          {/* Desktop Search Bar (only on desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Tablet/Mobile Search Icon */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 md:p-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300"
              >
                <Search size={20} />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 md:p-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 md:p-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300"
              >
                <User size={20} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 md:p-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom Row - Auto-scrolling Categories (all devices) */}
        <div className="border-t border-gray-100 py-3 overflow-hidden">
          <div 
            ref={navRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide"
            onMouseEnter={handleNavInteraction}
            onMouseLeave={handleNavLeave}
            onTouchStart={handleNavInteraction}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex space-x-6 min-w-max">
              {categories.map((category) => (
                <Link 
                  key={category.path}
                  to={category.path} 
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium relative group whitespace-nowrap text-sm md:text-base py-1 flex-shrink-0"
                >
                  {category.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;