import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Order, OrderStatus, Product } from '../../types';
import { formatCurrency, getDisplayableImageUrl } from '../../components/IconComponents';

const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void; onStatusChange: (orderId: string, newStatus: OrderStatus) => void; }> = ({ order, onClose, onStatusChange }) => {
    
    const getStatusColorClasses = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Pending: return 'bg-yellow-100 border-yellow-500 text-yellow-800';
            case OrderStatus.Processing: return 'bg-blue-100 border-blue-500 text-blue-800';
            case OrderStatus.Shipped: return 'bg-indigo-100 border-indigo-500 text-indigo-800';
            case OrderStatus.Completed: return 'bg-green-100 border-green-500 text-green-800';
            case OrderStatus.Cancelled: return 'bg-red-100 border-red-500 text-red-800';
            default: return 'bg-gray-100 border-gray-500 text-gray-800';
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
                </div>

                <div className="overflow-y-auto flex-grow pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                            <h3 className="font-semibold text-gray-600 mb-1">Customer Details</h3>
                            <p className="font-medium text-gray-800">{order.customerDetails.name}</p>
                            <p className="text-gray-600">{order.customerDetails.email}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <h3 className="font-semibold text-gray-600 mb-1">Shipping Address</h3>
                            <p className="text-gray-600 whitespace-pre-wrap">{order.customerDetails.address}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2 text-lg">Items Ordered</h3>
                        <div className="space-y-3">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b last:border-b-0">
                                   <div className="flex items-center gap-3">
                                       <img src={getDisplayableImageUrl(item.imageUrl)} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-gray-100" />
                                       <div>
                                           <p className="font-semibold text-gray-800">{item.name}</p>
                                           <p className="text-gray-500">{item.quantity} &times; {formatCurrency(item.price, order.currency)}</p>
                                       </div>
                                   </div>
                                   <p className="font-semibold text-gray-800">{formatCurrency(item.price * item.quantity, order.currency)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold text-xl mt-4 border-t-2 border-gray-200 pt-3">
                            <span>Total:</span>
                            <span>{formatCurrency(order.total, order.currency)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                    <div>
                        <label htmlFor="status-update" className="text-sm font-medium text-gray-700 mr-2">Update Status:</label>
                        <select
                            id="status-update"
                            value={order.status}
                            onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`p-2 rounded-md border-2 focus:ring-2 focus:ring-offset-1 text-sm font-semibold ${getStatusColorClasses(order.status)}`}
                        >
                            {Object.values(OrderStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                     <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                        Close
                    </button>
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
        // If the modal is open, update its state as well
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
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
            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatusChange={handleStatusChange} />}
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order.total, order.currency)}</td>
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