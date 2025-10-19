import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { DownloadIcon, FileIcon, getDisplayableImageUrl } from '../components/IconComponents';

const BlogPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { blogPosts } = useAppContext();

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
                        <p className="text-lg text-gray-500 mt-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
                    </header>
                    <img src={getDisplayableImageUrl(post.imageUrl)} alt={post.title} className="w-full h-auto rounded-lg shadow-lg mb-8" />
                    <div 
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                </article>

                {post.files && post.files.length > 0 && (
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Downloads</h2>
                        <div className="space-y-3">
                            {post.files.map((file, index) => (
                                <a 
                                    key={index}
                                    href={file.data} 
                                    download={file.name}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileIcon className="w-6 h-6 text-gray-500" />
                                        <span className="font-medium text-gray-700">{file.name}</span>
                                    </div>
                                    <DownloadIcon className="w-6 h-6 text-blue-600" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                 <div className="mt-12 text-center">
                    <Link to="/blog" className="text-blue-600 font-semibold hover:underline">
                        &larr; Back to All Posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;