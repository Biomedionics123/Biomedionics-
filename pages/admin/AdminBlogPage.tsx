import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { BlogPost, BlogPostFile } from '../../types';
import { PaperclipIcon, XIcon } from '../../components/IconComponents';
import RichTextEditor from '../../components/admin/RichTextEditor';

const AdminBlogPage: React.FC = () => {
    const { blogPosts, setBlogPosts } = useAppContext();
    const [blogForm, setBlogForm] = useState<BlogPost>({ id: '', title: '', content: '', imageUrl: '', author: '', date: '', files: []});
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setBlogForm({ ...blogForm, content });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // FIX: Replaced Array.from().forEach with a for...of loop.
            // This corrects a type inference issue where the 'file' variable was being incorrectly typed as 'unknown',
            // leading to errors when accessing its properties or using it as a Blob.
            // The for...of loop correctly infers the type of `file` as `File`.
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (readEvent) => {
                    const fileData: BlogPostFile = {
                        name: file.name,
                        type: file.type,
                        data: readEvent.target?.result as string,
                    };
                    setBlogForm(prev => ({ ...prev, files: [...prev.files, fileData]}));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const removeFile = (fileName: string) => {
        setBlogForm(prev => ({ ...prev, files: prev.files.filter(f => f.name !== fileName) }));
    };

    const handleBlogSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setBlogPosts(blogPosts.map(p => p.id === isEditing ? blogForm : p));
        } else {
            setBlogPosts([{ ...blogForm, id: `post_${Date.now()}`, date: new Date().toISOString().split('T')[0] }, ...blogPosts]);
        }
        resetBlogForm();
    };

    const editBlog = (post: BlogPost) => {
        setIsEditing(post.id);
        setBlogForm(post);
        window.scrollTo(0, 0);
    };
    
    const deleteBlog = (id: string) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setBlogPosts(blogPosts.filter(p => p.id !== id));
        }
    };
    
    const resetBlogForm = () => {
        setIsEditing(null);
        setBlogForm({ id: '', title: '', content: '', imageUrl: '', author: '', date: '', files: [] });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Blog Posts</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <input name="title" value={blogForm.title} onChange={handleBlogChange} placeholder="Post Title" className="w-full p-2 border rounded" required />
                    <input name="imageUrl" value={blogForm.imageUrl} onChange={handleBlogChange} placeholder="Cover Image URL" className="w-full p-2 border rounded" required />
                    <input name="author" value={blogForm.author} onChange={handleBlogChange} placeholder="Author" className="w-full p-2 border rounded" required />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <RichTextEditor value={blogForm.content} onChange={handleContentChange} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attach Files (Datasheets, Manuals, etc.)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <PaperclipIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, DOCX, XLSX, PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                        {blogForm.files.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
                                <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                                    {blogForm.files.map(file => (
                                        <li key={file.name} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <PaperclipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <button type="button" onClick={() => removeFile(file.name)} className="font-medium text-red-600 hover:text-red-500"><XIcon className="w-4 h-4" /></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex gap-4">
                      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">{isEditing ? 'Update Post' : 'Add Post'}</button>
                      {isEditing && <button type="button" onClick={resetBlogForm} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel Edit</button>}
                   </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Existing Posts</h2>
                <div className="space-y-3">
                  {blogPosts.map(post => (
                      <div key={post.id} className="bg-gray-50 p-3 rounded-md shadow-sm flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{post.title}</p>
                            <p className="text-sm text-gray-500">by {post.author}</p>
                          </div>
                          <div className="flex-shrink-0">
                              <button onClick={() => editBlog(post)} className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-md mr-2 hover:bg-yellow-600">Edit</button>
                              <button onClick={() => deleteBlog(post.id)} className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                          </div>
                      </div>
                  ))}
               </div>
            </div>
        </div>
    );
};

export default AdminBlogPage;