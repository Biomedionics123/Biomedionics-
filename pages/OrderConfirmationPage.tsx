
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { Order } from '../types';

const OrderConfirmationPage: React.FC = () => {
    const location = useLocation();
    const order = location.state?.order as Order;

    if (!order) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">No order details found.</h1>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Homepage</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You For Your Order!</h1>
                    <p className="text-gray-700">Your order has been successfully placed. A confirmation email has been sent to <strong>{order.customerDetails.email}</strong>.</p>
                    <div className="text-left mt-8 border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary (ID: {order.id})</h2>
                        <div className="space-y-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                            <span>Total</span>
                            <span>${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="mt-6">
                             <h3 className="font-bold">Shipping to:</h3>
                             <p className="text-gray-600">{order.customerDetails.name}</p>
                             <p className="text-gray-600 whitespace-pre-wrap">{order.customerDetails.address}</p>
                        </div>
                    </div>
                     <Link to="/products" className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
