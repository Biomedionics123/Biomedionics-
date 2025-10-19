import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { getDisplayableImageUrl } from '../../components/IconComponents';

const AdminSettingsPage: React.FC = () => {
    const { siteSettings, setSiteSettings } = useAppContext();
    const [settingsForm, setSettingsForm] = useState(siteSettings);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [isSaved, setIsSaved] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    useEffect(() => {
      setSettingsForm(siteSettings);
    }, [siteSettings]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettingsForm({ ...settingsForm, [e.target.name]: e.target.value });
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettingsForm(prev => ({ ...prev, awardImageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSiteSettings(settingsForm);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });

        if (passwordForm.currentPassword !== siteSettings.adminPassword) {
            setPasswordMessage({ type: 'error', text: 'Current password is incorrect.' });
            return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        if (passwordForm.newPassword.length < 4) {
             setPasswordMessage({ type: 'error', text: 'New password must be at least 4 characters long.' });
            return;
        }
        
        setSiteSettings({ ...siteSettings, adminPassword: passwordForm.newPassword });
        setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Site Settings</h1>
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">General Settings</h2>
                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                        <div>
                           <label htmlFor="awardImageUrl" className="block font-medium mb-1 text-gray-700">Award Image</label>
                           <input id="awardImageUrl" name="awardImageUrl" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                           {settingsForm.awardImageUrl && <img src={getDisplayableImageUrl(settingsForm.awardImageUrl)} alt="Award Image Preview" className="mt-4 rounded-md max-h-48" />}
                        </div>
                        <div>
                           <label htmlFor="awardText" className="block font-medium mb-1 text-gray-700">Award Text</label>
                           <input id="awardText" name="awardText" value={settingsForm.awardText} onChange={handleTextChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
                                Save General Settings
                            </button>
                            {isSaved && <p className="text-green-600 font-semibold">Settings saved successfully!</p>}
                        </div>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Security</h2>
                    <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                        <div>
                           <label htmlFor="currentPassword"  className="block font-medium mb-1 text-gray-700">Current Password</label>
                           <input id="currentPassword" name="currentPassword" type="password" value={passwordForm.currentPassword} onChange={handlePasswordFormChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                           <label htmlFor="newPassword"  className="block font-medium mb-1 text-gray-700">New Password</label>
                           <input id="newPassword" name="newPassword" type="password" value={passwordForm.newPassword} onChange={handlePasswordFormChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                           <label htmlFor="confirmPassword"  className="block font-medium mb-1 text-gray-700">Confirm New Password</label>
                           <input id="confirmPassword" name="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={handlePasswordFormChange} className="w-full p-2 border rounded" required />
                        </div>
                         {passwordMessage.text && (
                            <p className={`text-sm ${passwordMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                {passwordMessage.text}
                            </p>
                        )}
                        <div>
                             <button type="submit" className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition-colors">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;