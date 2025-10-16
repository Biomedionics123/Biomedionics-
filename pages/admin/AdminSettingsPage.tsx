import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const AdminSettingsPage: React.FC = () => {
    const { siteSettings, setSiteSettings } = useAppContext();
    const [settingsForm, setSettingsForm] = useState(siteSettings);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [isSaved, setIsSaved] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    useEffect(() => {
      setSettingsForm(siteSettings);
    }, [siteSettings]);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettingsForm({ ...settingsForm, [e.target.name]: e.target.value });
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
                           <label htmlFor="teamImageUrl" className="block font-medium mb-1 text-gray-700">Team Image URL</label>
                           <input id="teamImageUrl" name="teamImageUrl" value={settingsForm.teamImageUrl} onChange={handleSettingsChange} className="w-full p-2 border rounded" />
                           {settingsForm.teamImageUrl && <img src={settingsForm.teamImageUrl} alt="Team Preview" className="mt-4 rounded-md max-h-48" />}
                        </div>
                        <div>
                           <label htmlFor="awardText" className="block font-medium mb-1 text-gray-700">Award Text</label>
                           <input id="awardText" name="awardText" value={settingsForm.awardText} onChange={handleSettingsChange} className="w-full p-2 border rounded" />
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