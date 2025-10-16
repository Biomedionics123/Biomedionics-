import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { Product } from '../../types';

const AdminProductsPage: React.FC = () => {
    const { products, setProducts } = useAppContext();
    const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({ name: '', description: '', longDescription: '', category: '', imageUrl: '', price: 0, stock: 0 });
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ['price', 'stock'];
        setProductForm({ ...productForm, [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value });
    };
    
    const handleProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setProducts(products.map(p => p.id === isEditing ? { ...productForm, id: isEditing } : p));
        } else {
            setProducts([...products, { ...productForm, id: `prod_${Date.now()}` }]);
        }
        resetProductForm();
    };

    const editProduct = (product: Product) => {
        setIsEditing(product.id);
        setProductForm(product);
        window.scrollTo(0, 0);
    };

    const deleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const resetProductForm = () => {
        setIsEditing(null);
        setProductForm({ name: '', description: '', longDescription: '', category: '', imageUrl: '', price: 0, stock: 0 });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={productForm.name} onChange={handleProductChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
                        <input name="category" value={productForm.category} onChange={handleProductChange} placeholder="Category" className="w-full p-2 border rounded" required />
                    </div>
                    <textarea name="description" value={productForm.description} onChange={handleProductChange} placeholder="Short Description" className="w-full p-2 border rounded" rows={2} required />
                    <textarea name="longDescription" value={productForm.longDescription} onChange={handleProductChange} placeholder="Long Description" className="w-full p-2 border rounded" rows={4} required />
                    <input name="imageUrl" value={productForm.imageUrl} onChange={handleProductChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="price" type="number" step="0.01" value={productForm.price} onChange={handleProductChange} placeholder="Price" className="w-full p-2 border rounded" required />
                        <input name="stock" type="number" value={productForm.stock} onChange={handleProductChange} placeholder="Stock Quantity" className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">{isEditing ? 'Update Product' : 'Add Product'}</button>
                        {isEditing && <button type="button" onClick={resetProductForm} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel Edit</button>}
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Existing Products</h2>
                <div className="space-y-3">
                   {products.map(p => (
                       <div key={p.id} className="bg-gray-50 p-3 rounded-md shadow-sm flex justify-between items-center flex-wrap gap-2">
                           <div>
                               <p className="font-semibold">{p.name}</p>
                               <p className="text-sm text-gray-500">{p.category} | Stock: <span className="font-medium">{p.stock}</span></p>
                           </div>
                           <div className="flex-shrink-0">
                               <button onClick={() => editProduct(p)} className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-md mr-2 hover:bg-yellow-600">Edit</button>
                               <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white text-sm py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
        </div>
    );
};

export default AdminProductsPage;