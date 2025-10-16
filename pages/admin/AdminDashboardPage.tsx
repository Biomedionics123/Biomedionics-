import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { PackageIcon, FileTextIcon, ClipboardListIcon, MessageSquareIcon, PaletteIcon, LayersIcon, BellIcon } from '../../components/IconComponents';
import { ReviewStatus } from '../../types';

const AdminDashboardPage: React.FC = () => {
  const { products, blogPosts, orders, reviews, dynamicPages, notifications } = useAppContext();
  const pendingReviews = reviews.filter(r => r.status === ReviewStatus.Pending).length;
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-red-100 rounded-full relative">
            <BellIcon className="h-6 w-6 text-red-600" />
            {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{unreadNotifications}</span>}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Unread Notifications</p>
            <p className="text-2xl font-bold text-gray-800">{unreadNotifications}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <ClipboardListIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <PackageIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">{products.length}</p>
          </div>
        </div>
         <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full relative">
            <MessageSquareIcon className="h-6 w-6 text-yellow-600" />
            {pendingReviews > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{pendingReviews}</span>}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
            <p className="text-2xl font-bold text-gray-800">{pendingReviews}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <FileTextIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Blog Posts</p>
            <p className="text-2xl font-bold text-gray-800">{blogPosts.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-pink-100 rounded-full">
            <LayersIcon className="h-6 w-6 text-pink-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Custom Pages</p>
            <p className="text-2xl font-bold text-gray-800">{dynamicPages.length}</p>
          </div>
        </div>
      </div>
       <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
                 <Link to="/admin/notifications" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                    View Notifications
                </Link>
                <Link to="/admin/orders" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                    Manage Orders
                </Link>
                <Link to="/admin/products" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Manage Products
                </Link>
                <Link to="/admin/reviews" className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors">
                    Manage Reviews
                </Link>
                <Link to="/admin/blog" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                    Manage Blog
                </Link>
                 <Link to="/admin/pages" className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors">
                    Manage Pages
                </Link>
                 <Link to="/admin/appearance" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
                    Customize Appearance
                </Link>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboardPage;
