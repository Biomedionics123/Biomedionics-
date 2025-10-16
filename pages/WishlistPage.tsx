import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';
import { HeartIcon } from '../components/IconComponents';

const WishlistPage: React.FC = () => {
  const { wishlist } = useAppContext();

  return (
    <div className="bg-gray-50 py-16 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">My Wishlist</h1>
          <p className="mt-4 text-lg text-gray-600">Your favorite products, saved for later.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center max-w-lg mx-auto bg-white p-12 rounded-lg shadow-md">
            <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h2>
            <p className="mt-2 text-gray-600">
              Looks like you haven't added any items yet. Browse our products to find something you love!
            </p>
            <Link 
              to="/products" 
              className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
