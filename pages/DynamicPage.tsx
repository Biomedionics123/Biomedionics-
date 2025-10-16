import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const DynamicPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { dynamicPages } = useAppContext();

    const page = dynamicPages.find(p => p.slug === slug);

    if (!page) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return to Homepage</Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">{page.title}</h1>
                    </header>
                    <div 
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: page.content }} 
                    />
                </article>
                 <div className="mt-12 text-center">
                    <Link to="/" className="text-blue-600 font-semibold hover:underline">
                        &larr; Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DynamicPage;
