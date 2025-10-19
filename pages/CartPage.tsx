import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { XIcon, getDisplayableImageUrl, MapPinIcon, formatCurrency } from '../components/IconComponents';
import type { CustomerDetails } from '../types';

const CheckoutModal: React.FC<{onClose: () => void, onCheckout: (details: CustomerDetails) => void}> = ({onClose, onCheckout}) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({name: '', email: '', address: ''});
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCustomerDetails({...customerDetails, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCheckout(customerDetails);
    }
    
    const handleFetchLocation = async () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLocating(true);
        setLocationError('');

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using OpenStreetMap's free Nominatim reverse geocoding service
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                if (!response.ok) throw new Error('Failed to fetch address.');
                
                const data = await response.json();
                if (data && data.address) {
                    const addr = data.address;
                    const formattedAddress = [
                        addr.road || '',
                        addr.house_number || '',
                        addr.city || addr.town || addr.village || '',
                        addr.state || '',
                        addr.postcode || '',
                        addr.country || ''
                    ].filter(Boolean).join(', ');
                    setCustomerDetails(prev => ({...prev, address: formattedAddress}));
                } else {
                    throw new Error('Could not find address details.');
                }
            } catch (error) {
                console.error("Reverse geocoding error:", error);
                setLocationError('Could not retrieve address. Please enter it manually.');
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    setLocationError("You denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    setLocationError("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    setLocationError("The request to get user location timed out.");
                    break;
                default:
                    setLocationError("An unknown error occurred.");
                    break;
            }
            setIsLocating(false);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Shipping Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" id="name" required value={customerDetails.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" id="email" required value={customerDetails.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                       <div>
                         <div className="flex justify-between items-center mb-1">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                            <button type="button" onClick={handleFetchLocation} disabled={isLocating} className="text-xs text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-wait">
                                <MapPinIcon className="w-4 h-4" />
                                {isLocating ? 'Fetching...' : 'Use My Location'}
                            </button>
                         </div>
                        <textarea name="address" id="address" rows={3} required value={customerDetails.address} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                        {locationError && <p className="text-xs text-red-500 mt-1">{locationError}</p>}
                      </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    )
}


const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, addOrder } = useAppContext();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (customerDetails: CustomerDetails) => {
      const newOrder = addOrder(customerDetails);
      setIsCheckoutModalOpen(false);
      navigate('/order-confirmation', { state: { order: newOrder } });
  }

  return (
    <div className="bg-gray-50 py-16 min-h-[60vh]">
      {isCheckoutModalOpen && <CheckoutModal onClose={() => setIsCheckoutModalOpen(false)} onCheckout={handleCheckout} />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <Link to="/products" className="mt-4 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <img src={getDisplayableImageUrl(item.imageUrl)} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="ml-4">
                      <Link to={`/products/${item.id}`} className="font-bold text-lg hover:text-blue-600">{item.name}</Link>
                      <p className="text-gray-500">{formatCurrency(item.price, item.currency)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border rounded-md py-1"
                      min="1"
                    />
                    <p className="font-semibold w-24 text-right">
                      {formatCurrency(item.price * item.quantity, item.currency)}
                    </p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold text-xl">&times;</button>
                  </div>
                </div>
              ))}
              <div className="p-4 flex justify-end items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold ml-4">{formatCurrency(cartTotal, cart.length > 0 ? cart[0].currency : 'USD')}</span>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={() => setIsCheckoutModalOpen(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;