import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { DynamicPage } from '../../types';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Link } from 'react-router-dom';

const AdminPagesPage: React.FC = () => {
    const { dynamicPages, setDynamicPages } = useAppContext();
    const [pageForm, setPageForm] = useState<Omit<DynamicPage, 'id'>>({ slug: '', title: '', content: ''});
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'slug') {
            // Sanitize slug
            const sanitizedSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setPageForm({ ...pageForm, [name]: sanitizedSlug });
        } else {
            setPageForm({ ...pageForm, [name]: value });
        }
    };

    const handleContentChange = (content: string) => {
        setPageForm({ ...pageForm, content });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setDynamicPages(dynamicPages.map(p => p.id === isEditing ? { ...pageForm, id: isEditing } : p));
        } else {
            setDynamicPages([...dynamicPages, { ...pageForm, id: `page_${Date.now()}` }]);
        }
        resetForm();
    };

    const editPage = (page: DynamicPage) => {
        setIsEditing(page.id);
        setPageForm(page);
        window.scrollTo(0, 0);
    };
    
    const deletePage = (id: string) => {
        if (window.confirm('Are you sure you want to delete this page? This cannot be undone.')) {
            setDynamicPages(dynamicPages.filter(p => p.id !== id));
        }
    };
    
    const resetForm = () => {
        setIsEditing(null);
        setPageForm({ slug: '', title: '', content: '' });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Custom Pages</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{isEditing ? 'Edit Page' : 'Create New Page'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={pageForm.title} onChange={handleChange} placeholder="Page Title (e.g., Privacy Policy)" className="w-full p-2 border rounded" required />
                    <input name="slug" value={pageForm.slug} onChange={handleChange} placeholder="URL Slug (e.g., privacy-policy)" className="w-full p-2 border rounded" required />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Page Content</label>
                        <RichTextEditor value={pageForm.content} onChange={handleContentChange} />
                    </div>
                    
                    <div className="flex gap-4">
                      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">{isEditing ? 'Update Page' : 'Create Page'}</button>
                      {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel</button>}
                   </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Existing Pages</h2>
                <div className="space-y-3">
                  {dynamicPages.map(page => (
                      <div key={page.id} className="bg-gray-50 p-3 rounded-md shadow-sm flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{page.title}</p>
                            <Link to={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">/pages/{page.slug}</Link>
                          </div>
                          <div className="flex-shrink-0">
                              <button onClick={() => editPage(page)} className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-md mr-2 hover:bg-yellow-600">Edit</button>
                              <button onClick={() => deletePage(page.id)} className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                          </div>
                      </div>
                  ))}
               </div>
               {dynamicPages.length === 0 && <p className="text-center text-gray-500 py-4">You haven't created any custom pages yet.</p>}
            </div>
        </div>
    );
};

export default AdminPagesPage;
