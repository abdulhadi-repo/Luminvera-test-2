import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:scale-105"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            SALE
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingCart size={16} />
        </button>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 text-sm md:text-base leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          
          {product.inStock && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Free Shipping
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;