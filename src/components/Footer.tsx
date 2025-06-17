import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Luminvera</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Your trusted global store for everyday essentials. Quality products, exceptional service, worldwide delivery.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 bg-white rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:contact@luminvera.com"
                className="p-2 md:p-3 bg-white rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>About Us</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Contact</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>FAQs</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Privacy Policy</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Shop Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/home-kitchen" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Home & Kitchen</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/category/tech-gadgets" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Gadgets & Tech</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/category/fashion-travel" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Fashion & Travel</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/category/baby-family" className="text-gray-600 hover:text-orange-500 transition-colors text-sm md:text-base group flex items-center">
                  <span>Baby & Kids</span>
                  <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Stay Connected</h4>
            <p className="text-gray-600 text-sm md:text-base">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
            <div className="text-xs text-gray-500">
              <p>📧 contact@luminvera.com</p>
              <p>📱 Follow us on social media</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
           <center> <p className="text-center md:text-left text-gray-500 text-sm">
              © 2024- {new Date().getFullYear()} Luminvera. All rights reserved. Made with ❤️ for our customers worldwide.
            </p>
             <center/>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link to="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
              <Link to="/cookies" className="hover:text-orange-500 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;