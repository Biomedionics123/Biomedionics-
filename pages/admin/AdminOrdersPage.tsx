
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Order, OrderStatus } from '../../types';

const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
                <h2 className="text-xl font-bold mb-4">Order Details: {order.id}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <h3 className="font-semibold">Customer:</h3>
                        <p>{order.customerDetails.name}</p>
                        <p>{order.customerDetails.email}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Shipping Address:</h3>
                        <p className="whitespace-pre-wrap">{order.customerDetails.address}</p>
                    </div>
                </div>
                <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold mb-2">Items Ordered:</h3>
                    {order.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                           <span>{item.name} x {item.quantity}</span>
                           <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-base mt-2 border-t pt-2">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AdminOrdersPage: React.FC = () => {
    const { orders, updateOrderStatus } = useAppContext();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Pending: return 'bg-yellow-200 text-yellow-800';
            case OrderStatus.Processing: return 'bg-blue-200 text-blue-800';
            case OrderStatus.Shipped: return 'bg-indigo-200 text-indigo-800';
            case OrderStatus.Completed: return 'bg-green-200 text-green-800';
            case OrderStatus.Cancelled: return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div>
            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">All Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerDetails.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                         <select 
                                            value={order.status} 
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className={`p-1 rounded-md border-transparent focus:ring-0 focus:outline-none ${getStatusColor(order.status)}`}
                                         >
                                            {Object.values(OrderStatus).map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                         </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:text-blue-900">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {orders.length === 0 && <p className="text-center text-gray-500 py-8">No orders have been placed yet.</p>}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
