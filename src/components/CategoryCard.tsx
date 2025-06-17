import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/Product';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:scale-105"
    >
      <div className="aspect-square relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end p-4 md:p-6">
          <div className="text-white w-full">
            <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 transform group-hover:scale-105 transition-transform duration-300">
              {category.name}
            </h3>
            <p className="text-xs md:text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              {category.productCount} products
            </p>
            
            {/* Hover indicator */}
            <div className="mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="inline-flex items-center text-xs md:text-sm font-medium text-orange-300">
                Shop Now →
              </span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;