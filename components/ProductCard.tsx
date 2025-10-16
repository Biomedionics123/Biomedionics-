import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { HeartIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div className="block group relative">
       <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {product.stock === 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
          <button 
            onClick={handleWishlistToggle}
            className={`bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
            aria-label="Toggle Wishlist"
          >
            <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

      <Link to={`/products/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
          <img className="w-full h-56 object-cover object-center" src={product.imageUrl} alt={product.name} />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-sm text-blue-500 font-semibold tracking-widest uppercase">{product.category}</h3>
            <h2 className="text-xl font-semibold text-gray-900 mt-1">{product.name}</h2>
            <p className="text-gray-600 mt-2 text-base flex-grow">{product.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-4">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
