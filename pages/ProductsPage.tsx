import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../contexts/AppContext';

const ProductsPage: React.FC = () => {
  const { products } = useAppContext();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('default');

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (filterCategory !== 'all') {
      result = result.filter(p => p.category === filterCategory);
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return result;
  }, [products, filterCategory, sortOption]);


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">Our Products</h1>
            <p className="mt-4 text-lg text-gray-600">Explore our comprehensive range of state-of-the-art biomedical devices.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-4xl mx-auto">
            <div className="flex-1">
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Filter by Category</label>
                <select id="category-filter" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                </select>
            </div>
             <div className="flex-1">
                <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700">Sort by</label>
                <select id="sort-order" value={sortOption} onChange={e => setSortOption(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
          {filteredAndSortedProducts.length > 0 ? filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          )) : <p className="text-center text-gray-500 col-span-2">No products match the selected filters.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;