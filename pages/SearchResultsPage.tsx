import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';
import { BlogPost, DynamicPage } from '../types';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { products, blogPosts, dynamicPages } = useAppContext();

    const lowerCaseQuery = query.toLowerCase();

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.description.toLowerCase().includes(lowerCaseQuery) ||
        p.category.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredBlogPosts = blogPosts.filter(p =>
        p.title.toLowerCase().includes(lowerCaseQuery) ||
        p.content.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredPages = dynamicPages.filter(p =>
        p.title.toLowerCase().includes(lowerCaseQuery) ||
        p.content.toLowerCase().includes(lowerCaseQuery)
    );

    const totalResults = filteredProducts.length + filteredBlogPosts.length + filteredPages.length;

    return (
        <div className="bg-gray-50 py-16 min-h-[60vh]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Search Results</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        {totalResults > 0
                            ? `Found ${totalResults} result(s) for "`
                            : `No results found for "`}
                        <span className="font-semibold text-blue-600">{query}</span>
                        {totalResults > 0 && `"`}
                    </p>
                </div>

                <div className="space-y-12">
                    {filteredProducts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Products ({filteredProducts.length})</h2>
                            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {filteredBlogPosts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Blog Posts ({filteredBlogPosts.length})</h2>
                            <div className="max-w-4xl mx-auto space-y-8">
                                {filteredBlogPosts.map((post: BlogPost) => (
                                    <Link key={post.id} to={`/blog/${post.id}`} className="block group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold group-hover:text-blue-600">{post.title}</h3>
                                        <p className="text-sm text-gray-500">By {post.author}</p>
                                        <p className="mt-2 text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}></p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {filteredPages.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pages ({filteredPages.length})</h2>
                            <div className="max-w-4xl mx-auto space-y-4">
                                {filteredPages.map((page: DynamicPage) => (
                                    <Link key={page.id} to={`/pages/${page.slug}`} className="block group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold group-hover:text-blue-600">{page.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
