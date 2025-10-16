import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Notification, NotificationType } from '../../types';
import { BellIcon, MailIcon, ClipboardListIcon, XIcon } from '../../components/IconComponents';

const NotificationModal: React.FC<{ notification: Notification, onClose: () => void }> = ({ notification, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <XIcon className="w-6 h-6"/>
                </button>
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{notification.subject}</h2>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p><span className="font-semibold">From:</span> {notification.from || 'System Notification'}</p>
                        <p><span className="font-semibold">To:</span> biomedionics@gmail.com</p>
                        <p><span className="font-semibold">Date:</span> {new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-gray-700 max-h-[60vh] overflow-y-auto">
                    {notification.body}
                </div>
            </div>
        </div>
    );
};


const AdminNotificationsPage: React.FC = () => {
    const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppContext();
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const handleViewNotification = (notification: Notification) => {
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
        }
        setSelectedNotification(notification);
    };
    
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case NotificationType.NewOrder:
                return <ClipboardListIcon className="w-6 h-6 text-purple-600" />;
            case NotificationType.ContactInquiry:
                return <MailIcon className="w-6 h-6 text-blue-600" />;
            default:
                return <BellIcon className="w-6 h-6 text-gray-500" />;
        }
    };

    return (
        <div>
            {selectedNotification && <NotificationModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                {unreadCount > 0 && (
                    <button onClick={markAllNotificationsAsRead} className="text-sm text-blue-600 hover:underline">
                        Mark all as read
                    </button>
                )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-3">
                    {notifications.length > 0 ? notifications.map(notif => (
                        <div 
                            key={notif.id} 
                            onClick={() => handleViewNotification(notif)}
                            className={`p-4 rounded-md flex items-start gap-4 cursor-pointer transition-colors ${notif.isRead ? 'bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'}`}
                        >
                            <div className={`flex-shrink-0 p-2 rounded-full ${notif.isRead ? 'bg-gray-200' : 'bg-blue-200'}`}>
                                {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-grow">
                                <p className={`font-semibold ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{notif.subject}</p>
                                <p className="text-sm text-gray-500 line-clamp-1">{notif.body}</p>
                            </div>
                             <div className="text-right text-xs text-gray-400 flex-shrink-0">
                                {new Date(notif.createdAt).toLocaleDateString()}
                                {!notif.isRead && <div className="mt-1 flex justify-end"><span className="w-2 h-2 bg-blue-500 rounded-full"></span></div>}
                             </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 py-12">You have no notifications.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminNotificationsPage;