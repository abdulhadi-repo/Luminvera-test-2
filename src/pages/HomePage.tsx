import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories, featuredProducts, trendingProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Shop All
                <br />
                <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Categories
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover our wide selection of premium products across all your favorite categories
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/category/home-kitchen"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/category/tech-gadgets"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-500 transform hover:scale-105 transition-all duration-300"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:max-w-none">
                <div className="space-y-3 md:space-y-4">
                  <img
                    src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Product showcase"
                    className="rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src="https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Product showcase"
                    className="rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
                  <img
                    src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Product showcase"
                    className="rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src="https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Product showcase"
                    className="rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-200 rounded-full opacity-60 animate-pulse hidden lg:block"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-200 rounded-full opacity-40 animate-pulse hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Find exactly what you're looking for in our carefully curated categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Deals Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Shop the
                <br />
                <span className="text-orange-400">Latest Deals</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover new arrivals and best-selling products with exclusive discounts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/category/tech-gadgets"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-orange-400 hover:bg-orange-400/10 transform hover:scale-105 transition-all duration-300"
                >
                  View All Deals
                </Link>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Latest deals"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {/* Floating discount badge */}
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg animate-bounce">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Categories Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Explore our most loved product categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg md:rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors text-sm md:text-base">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {category.productCount} items
                </p>
              </Link>
            ))}
          </div>

          {/* Health & Beauty Featured */}
          <div className="bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Health & Beauty
                </h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                  Premium beauty and wellness products for your daily routine. Discover skincare, cosmetics, and health essentials from trusted brands.
                </p>
                <Link
                  to="/category/health-beauty"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Explore Collection
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <img
                  src="https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Beauty product"
                  className="rounded-lg md:rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                />
                <img
                  src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Beauty product"
                  className="rounded-lg md:rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                />
                <img
                  src="https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Beauty product"
                  className="rounded-lg md:rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Discover our handpicked selection of the best products across all categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trending Now
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              The most popular products our customers are loving right now
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/category/tech-gadgets"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;