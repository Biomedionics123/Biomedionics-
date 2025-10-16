import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { DashboardIcon, PackageIcon, FileTextIcon, SettingsIcon, LogOutIcon, DnaIcon, ClipboardListIcon, MessageSquareIcon, PaletteIcon, LayersIcon, BellIcon } from '../IconComponents';
import { useAppContext } from '../../contexts/AppContext';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { notifications } = useAppContext();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    sessionStorage.removeItem('biomedionics_admin_auth');
    navigate('/admin/login');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
            <Link to="/admin" className="flex items-center gap-2">
                <DnaIcon className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Admin Panel</span>
            </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink to="/admin/dashboard" className={linkClasses}>
                <div className="flex items-center"><DashboardIcon className="h-5 w-5 mr-3" />Dashboard</div>
            </NavLink>
             <NavLink to="/admin/notifications" className={linkClasses}>
                <div className="flex items-center"><BellIcon className="h-5 w-5 mr-3" />Notifications</div>
                {unreadCount > 0 && <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{unreadCount}</span>}
            </NavLink>
            <NavLink to="/admin/orders" className={linkClasses}>
                <div className="flex items-center"><ClipboardListIcon className="h-5 w-5 mr-3" />Orders</div>
            </NavLink>
            <NavLink to="/admin/products" className={linkClasses}>
                <div className="flex items-center"><PackageIcon className="h-5 w-5 mr-3" />Products</div>
            </NavLink>
            <NavLink to="/admin/reviews" className={linkClasses}>
                <div className="flex items-center"><MessageSquareIcon className="h-5 w-5 mr-3" />Reviews</div>
            </NavLink>
            <NavLink to="/admin/blog" className={linkClasses}>
                <div className="flex items-center"><FileTextIcon className="h-5 w-5 mr-3" />Blog Posts</div>
            </NavLink>
            <NavLink to="/admin/pages" className={linkClasses}>
                <div className="flex items-center"><LayersIcon className="h-5 w-5 mr-3" />Pages</div>
            </NavLink>
            <NavLink to="/admin/appearance" className={linkClasses}>
                <div className="flex items-center"><PaletteIcon className="h-5 w-5 mr-3" />Appearance</div>
            </NavLink>
            <NavLink to="/admin/settings" className={linkClasses}>
                <div className="flex items-center"><SettingsIcon className="h-5 w-5 mr-3" />Site Settings</div>
            </NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
            <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
                <LogOutIcon className="h-5 w-5 mr-3" />
                Logout
            </button>
        </div>
    </aside>
  );
};

export default AdminSidebar;
