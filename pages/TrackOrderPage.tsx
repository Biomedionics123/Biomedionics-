import React, { useState, FormEvent } from 'react';
import { useAppContext } from '../contexts/AppContext';
import type { Order } from '../types';
import StarRating from '../components/StarRating';

const TrackOrderPage: React.FC = () => {
    const { orders, addReview } = useAppContext();
    const [orderId, setOrderId] = useState('');
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setFoundOrder(null);
        setReviewSubmitted(false);

        const order = orders.find(o => o.id === orderId.trim());
        if (order) {
            setFoundOrder(order);
        } else {
            setError('Order ID not found. Please check the ID and try again.');
        }
    };
    
    const handleReviewSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (rating > 0 && comment.trim() !== '' && foundOrder) {
            addReview(foundOrder, rating, comment);
            setReviewSubmitted(true);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-yellow-600';
            case 'Processing': return 'text-blue-600';
            case 'Shipped': return 'text-indigo-600';
            case 'Completed': return 'text-green-600';
            case 'Cancelled': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-gray-50 py-16 min-h-[60vh]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Track Your Order</h1>
                    <p className="mt-4 text-lg text-gray-600">Enter your Order ID to see its status or leave a review.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter your Order ID (e.g., order_123456789)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                            Search
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
                
                {foundOrder && (
                    <div className="bg-white p-8 rounded-lg shadow-md mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                        <div className="mt-4 space-y-2">
                            <p><strong>Order ID:</strong> {foundOrder.id}</p>
                            <p><strong>Customer:</strong> {foundOrder.customerDetails.name}</p>
                            <p><strong>Status:</strong> <span className={`font-semibold ${getStatusColor(foundOrder.status)}`}>{foundOrder.status}</span></p>
                        </div>

                        {foundOrder.status === 'Completed' && !foundOrder.reviewSubmitted && !reviewSubmitted && (
                             <div className="mt-6 border-t pt-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Leave a Review</h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label className="block font-medium text-gray-700 mb-2">Your Rating</label>
                                        <StarRating rating={rating} onRatingChange={setRating} size="h-8 w-8" />
                                    </div>
                                    <div>
                                        <label htmlFor="comment" className="block font-medium text-gray-700">Your Comments</label>
                                        <textarea 
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={4}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Tell us about your experience..."
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition-colors">
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        )}
                         {(foundOrder.reviewSubmitted || reviewSubmitted) && foundOrder.status === 'Completed' &&(
                            <div className="mt-6 border-t pt-6 text-center">
                                <p className="text-lg text-green-600 font-semibold">Thank you for your review!</p>
                            </div>
                         )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrderPage;