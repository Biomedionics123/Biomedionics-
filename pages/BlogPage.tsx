import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { getDisplayableImageUrl } from '../components/IconComponents';

const BlogPage: React.FC = () => {
    const { blogPosts } = useAppContext();

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Our Blog</h1>
                    <p className="mt-4 text-lg text-gray-600">News, insights, and updates from the Biomedionics team.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-12">
                    {blogPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                           <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
                                <img className="w-full h-64 object-cover" src={getDisplayableImageUrl(post.imageUrl)} alt={post.title} />
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                                    <p className="text-sm text-gray-500 mt-2">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
                                    <p className="mt-4 text-gray-600">{post.content.substring(0, 150)}...</p>
                                    <p className="mt-4 font-semibold text-blue-600">Read More &rarr;</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;