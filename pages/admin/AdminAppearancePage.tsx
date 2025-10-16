import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { AppearanceSettings, CustomLink } from '../../types';
import { getDisplayableGoogleDriveImageUrl } from '../../components/IconComponents';

const AdminAppearancePage: React.FC = () => {
    const { appearanceSettings, setAppearanceSettings } = useAppContext();
    const [formState, setFormState] = useState<AppearanceSettings>(appearanceSettings);
    const [isSaved, setIsSaved] = useState(false);
    
    // State for new link forms
    const [newHeaderLink, setNewHeaderLink] = useState({ text: '', url: '' });
    const [newFooterLink, setNewFooterLink] = useState<{text: string, url: string, category: 'Solutions' | 'Company'}>({ text: '', url: '', category: 'Solutions' });

    useEffect(() => {
      setFormState(appearanceSettings);
    }, [appearanceSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ ...prev, logoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ ...prev, homepageVideoData: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleHeaderLinkChange = (id: string, field: 'text' | 'url', value: string) => {
        setFormState(prev => ({
            ...prev,
            headerLinks: prev.headerLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
        }));
    };
    
    const addHeaderLink = () => {
        if (newHeaderLink.text && newHeaderLink.url) {
            const newLink: CustomLink = { ...newHeaderLink, id: `h_${Date.now()}`, category: 'Company'};
            setFormState(prev => ({ ...prev, headerLinks: [...prev.headerLinks, newLink] }));
            setNewHeaderLink({ text: '', url: '' });
        }
    };

    const deleteHeaderLink = (id: string) => {
        setFormState(prev => ({ ...prev, headerLinks: prev.headerLinks.filter(link => link.id !== id) }));
    };

    const handleFooterLinkChange = (id: string, field: 'text' | 'url' | 'category', value: string) => {
        setFormState(prev => ({
            ...prev,
            footerLinks: prev.footerLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
        }));
    };
    
    const addFooterLink = () => {
        if (newFooterLink.text && newFooterLink.url) {
            const newLink: CustomLink = { ...newFooterLink, id: `f_${Date.now()}`};
            setFormState(prev => ({ ...prev, footerLinks: [...prev.footerLinks, newLink] }));
            setNewFooterLink({ text: '', url: '', category: 'Solutions' });
        }
    };

    const deleteFooterLink = (id: string) => {
        setFormState(prev => ({ ...prev, footerLinks: prev.footerLinks.filter(link => link.id !== id) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAppearanceSettings(formState);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Customize Appearance</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* General Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">General</h2>
                    <div className="space-y-4">
                        <div>
                           <label htmlFor="siteName" className="block font-medium mb-1 text-gray-700">Website Name</label>
                           <input id="siteName" name="siteName" value={formState.siteName} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                           <label htmlFor="logoUrl" className="block font-medium mb-1 text-gray-700">Logo</label>
                           <input id="logoUrl" name="logoUrl" type="file" accept="image/*" onChange={handleLogoChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                           {formState.logoUrl && <img src={getDisplayableGoogleDriveImageUrl(formState.logoUrl)} alt="Logo Preview" className="mt-4 rounded-md max-h-16 bg-gray-200 p-2" />}
                        </div>
                         <div>
                           <label className="block font-medium mb-2 text-gray-700">Homepage Video</label>
                           <div className="flex gap-4 mb-2 flex-wrap">
                               <label className="flex items-center">
                                   <input type="radio" name="videoSource" value="youtube" checked={formState.videoSource === 'youtube'} onChange={handleChange} className="form-radio" />
                                   <span className="ml-2">YouTube URL</span>
                               </label>
                               <label className="flex items-center">
                                   <input type="radio" name="videoSource" value="upload" checked={formState.videoSource === 'upload'} onChange={handleChange} className="form-radio" />
                                   <span className="ml-2">Upload Video</span>
                               </label>
                               <label className="flex items-center">
                                   <input type="radio" name="videoSource" value="googledrive" checked={formState.videoSource === 'googledrive'} onChange={handleChange} className="form-radio" />
                                   <span className="ml-2">Google Drive URL</span>
                               </label>
                           </div>
                           {formState.videoSource === 'youtube' && (
                                <input name="homepageVideoUrl" value={formState.homepageVideoUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter YouTube URL"/>
                           )}
                           {formState.videoSource === 'upload' && (
                               <div>
                                   <input id="videoUpload" name="videoUpload" type="file" accept="video/*" onChange={handleVideoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                   {formState.homepageVideoData && (
                                       <video src={formState.homepageVideoData} controls className="mt-4 rounded-md max-h-48" muted />
                                   )}
                               </div>
                           )}
                            {formState.videoSource === 'googledrive' && (
                                <input name="homepageVideoUrl" value={formState.homepageVideoUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Google Drive share URL"/>
                           )}
                        </div>
                    </div>
                </div>

                {/* Color Scheme */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-bold mb-4 text-gray-700">Color Scheme</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="primaryColor" className="block font-medium mb-1 text-gray-700">Primary Color</label>
                            <div className="flex items-center gap-2">
                                <input id="primaryColor" name="primaryColor" type="color" value={formState.primaryColor} onChange={handleChange} className="h-10 w-10 p-1 border rounded" />
                                <input type="text" value={formState.primaryColor} onChange={handleChange} name="primaryColor" className="p-2 border rounded w-full" />
                            </div>
                         </div>
                         <div>
                            <label htmlFor="secondaryColor" className="block font-medium mb-1 text-gray-700">Secondary Color</label>
                            <div className="flex items-center gap-2">
                                <input id="secondaryColor" name="secondaryColor" type="color" value={formState.secondaryColor} onChange={handleChange} className="h-10 w-10 p-1 border rounded" />
                                <input type="text" value={formState.secondaryColor} onChange={handleChange} name="secondaryColor" className="p-2 border rounded w-full" />
                            </div>
                         </div>
                     </div>
                </div>

                {/* Header Links */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Header Navigation Links</h2>
                    <div className="space-y-2">
                        {formState.headerLinks.map(link => (
                            <div key={link.id} className="flex gap-2 items-center">
                                <input value={link.text} onChange={(e) => handleHeaderLinkChange(link.id, 'text', e.target.value)} placeholder="Link Text" className="w-full p-2 border rounded" />
                                <input value={link.url} onChange={(e) => handleHeaderLinkChange(link.id, 'url', e.target.value)} placeholder="URL (e.g., /about)" className="w-full p-2 border rounded" />
                                <button type="button" onClick={() => deleteHeaderLink(link.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 font-bold">&times;</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center mt-4 border-t pt-4">
                         <input value={newHeaderLink.text} onChange={(e) => setNewHeaderLink({...newHeaderLink, text: e.target.value})} placeholder="New Link Text" className="w-full p-2 border rounded" />
                         <input value={newHeaderLink.url} onChange={(e) => setNewHeaderLink({...newHeaderLink, url: e.target.value})} placeholder="New Link URL" className="w-full p-2 border rounded" />
                         <button type="button" onClick={addHeaderLink} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 whitespace-nowrap">Add Link</button>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Footer Navigation Links</h2>
                    <div className="space-y-2">
                        {formState.footerLinks.map(link => (
                            <div key={link.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                <input value={link.text} onChange={(e) => handleFooterLinkChange(link.id, 'text', e.target.value)} placeholder="Link Text" className="p-2 border rounded" />
                                <input value={link.url} onChange={(e) => handleFooterLinkChange(link.id, 'url', e.target.value)} placeholder="URL" className="p-2 border rounded" />
                                <div className="flex gap-2">
                                    <select value={link.category} onChange={(e) => handleFooterLinkChange(link.id, 'category', e.target.value)} className="p-2 border rounded w-full">
                                        <option value="Solutions">Solutions</option>
                                        <option value="Company">Company</option>
                                    </select>
                                    <button type="button" onClick={() => deleteFooterLink(link.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 font-bold">&times;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mt-4 border-t pt-4">
                         <input value={newFooterLink.text} onChange={(e) => setNewFooterLink({...newFooterLink, text: e.target.value})} placeholder="New Link Text" className="p-2 border rounded" />
                         <input value={newFooterLink.url} onChange={(e) => setNewFooterLink({...newFooterLink, url: e.target.value})} placeholder="New Link URL" className="p-2 border rounded" />
                         <div className="flex gap-2">
                             <select value={newFooterLink.category} onChange={(e) => setNewFooterLink({...newFooterLink, category: e.target.value as 'Solutions' | 'Company'})} className="p-2 border rounded w-full">
                                <option value="Solutions">Solutions</option>
                                <option value="Company">Company</option>
                            </select>
                            <button type="button" onClick={addFooterLink} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 whitespace-nowrap">Add</button>
                         </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4 sticky bottom-0 bg-white/80 backdrop-blur-sm py-4 -mx-6 px-6 -mb-8 rounded-b-lg">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
                        Save Appearance Settings
                    </button>
                    {isSaved && <p className="text-green-600 font-semibold">Settings saved successfully!</p>}
                </div>
            </form>
        </div>
    );
};

export default AdminAppearancePage;