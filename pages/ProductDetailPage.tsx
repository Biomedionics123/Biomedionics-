import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { HeartIcon, getDisplayableImageUrl, formatCurrency } from '../components/IconComponents';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === productId);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };
  
  const handleQuantityChange = (newQuantity: number) => {
      if (newQuantity < 1) {
          setQuantity(1);
      } else if (newQuantity > product.stock) {
          setQuantity(product.stock);
      } else {
          setQuantity(newQuantity);
      }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const stockStatus = () => {
      if (product.stock <= 0) {
          return <span className="font-semibold text-red-500">Out of Stock</span>;
      }
      if (product.stock < 10) {
          return <span className="font-semibold text-yellow-500">Only {product.stock} left in stock!</span>;
      }
      return <span className="font-semibold text-green-500">In Stock</span>;
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img src={getDisplayableImageUrl(product.imageUrl)} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-sm text-blue-500 font-semibold tracking-widest uppercase">{product.category}</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-800 mt-4">
              {formatCurrency(product.price, product.currency)}
            </p>
            <p className="mt-4">{stockStatus()}</p>
            <p className="text-gray-600 mt-4 text-lg">{product.longDescription}</p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                  disabled={product.stock === 0}
                >-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-l border-r py-2 focus:outline-none"
                  min="1"
                  max={product.stock}
                  disabled={product.stock === 0}
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50"
                  disabled={product.stock === 0}
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-grow font-bold py-3 px-6 rounded-md transition-colors text-white ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                disabled={product.stock === 0 || added}
              >
                {product.stock === 0 ? 'Out of Stock' : (added ? 'Added to Cart!' : 'Add to Cart')}
              </button>
               <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-md border transition-colors ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`}
                  aria-label="Add to wishlist"
                >
                  <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;