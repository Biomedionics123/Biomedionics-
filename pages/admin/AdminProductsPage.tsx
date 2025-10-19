import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { Product } from '../../types';
import { formatCurrency, getDisplayableImageUrl } from '../../components/IconComponents';

const AdminProductsPage: React.FC = () => {
    const { products, setProducts } = useAppContext();
    const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({ name: '', description: '', longDescription: '', category: '', imageUrl: '', price: 0, stock: 0, currency: 'USD' });
    const [isEditing, setIsEditing] = useState<string | null>(null);
    
    // State for bulk import
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [importStatus, setImportStatus] = useState<{ message: string, type: 'success' | 'error' | '' }>({ message: '', type: '' });


    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericFields = ['price', 'stock'];
        setProductForm({ ...productForm, [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value });
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductForm(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
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
        setProductForm({ name: '', description: '', longDescription: '', category: '', imageUrl: '', price: 0, stock: 0, currency: 'USD' });
    };
    
    const handleDownloadTemplate = () => {
        const headers = "name,description,longDescription,category,imageUrl,price,stock,currency";
        const exampleRow = "Sample Bioprinter,A short description for the sample bioprinter,A much longer and more detailed description of the sample bioprinter's features and capabilities.,Bioprinting,https://picsum.photos/seed/sample/600/400,12500.00,15,USD";
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${exampleRow}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "product_import_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleBulkImport = () => {
        if (!csvFile) {
            setImportStatus({ message: 'Please select a CSV file to upload.', type: 'error' });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').filter(row => row.trim() !== '');
            if (rows.length < 2) {
                setImportStatus({ message: 'CSV file is empty or contains only headers.', type: 'error' });
                return;
            }

            const headers = rows[0].split(',').map(h => h.trim());
            const requiredHeaders = ['name', 'price', 'stock', 'currency'];
            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

            if (missingHeaders.length > 0) {
                 setImportStatus({ message: `CSV is missing required headers: ${missingHeaders.join(', ')}`, type: 'error' });
                 return;
            }

            const newProducts: Product[] = [];
            const errors: string[] = [];

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                const rowData: { [key: string]: string } = {};
                headers.forEach((header, index) => {
                    rowData[header] = values[index]?.trim() || '';
                });

                // Validation
                if (!rowData.name) errors.push(`Row ${i + 1}: 'name' is required.`);
                if (isNaN(parseFloat(rowData.price))) errors.push(`Row ${i + 1}: 'price' must be a number.`);
                if (isNaN(parseInt(rowData.stock, 10))) errors.push(`Row ${i + 1}: 'stock' must be an integer.`);
                if (rowData.currency !== 'USD' && rowData.currency !== 'PKR') errors.push(`Row ${i + 1}: 'currency' must be either USD or PKR.`);

                if (errors.length === 0) {
                    newProducts.push({
                        id: `prod_${Date.now()}_${i}`,
                        name: rowData.name,
                        description: rowData.description || '',
                        longDescription: rowData.longDescription || '',
                        category: rowData.category || 'Uncategorized',
                        imageUrl: rowData.imageUrl || '',
                        price: parseFloat(rowData.price),
                        stock: parseInt(rowData.stock, 10),
                        currency: rowData.currency as 'USD' | 'PKR',
                    });
                }
            }

            if (errors.length > 0) {
                setImportStatus({ message: `Import failed. Errors found:\n- ${errors.slice(0, 5).join('\n- ')}${errors.length > 5 ? `\n... and ${errors.length - 5} more errors.` : ''}`, type: 'error' });
            } else {
                setProducts(prev => [...prev, ...newProducts]);
                setImportStatus({ message: `Successfully imported ${newProducts.length} products.`, type: 'success' });
                setCsvFile(null);
            }
        };
        reader.readAsText(csvFile);
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
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input id="imageUrl" name="imageUrl" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {productForm.imageUrl && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                                <img src={getDisplayableImageUrl(productForm.imageUrl)} alt="Product Preview" className="mt-2 rounded-md max-h-48 border p-1" />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="price" type="number" step="0.01" value={productForm.price} onChange={handleProductChange} placeholder="Price" className="w-full p-2 border rounded" required />
                        <select name="currency" value={productForm.currency} onChange={handleProductChange} className="w-full p-2 border rounded bg-white">
                            <option value="USD">USD ($)</option>
                            <option value="PKR">PKR (₨)</option>
                        </select>
                        <input name="stock" type="number" value={productForm.stock} onChange={handleProductChange} placeholder="Stock Quantity" className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">{isEditing ? 'Update Product' : 'Add Product'}</button>
                        {isEditing && <button type="button" onClick={resetProductForm} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Cancel Edit</button>}
                    </div>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Bulk Product Import</h2>
                 <div className="space-y-4">
                    <p className="text-sm text-gray-600">Import multiple products at once using a CSV file. Download the template to ensure the correct format.</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setCsvFile(e.target.files ? e.target.files[0] : null)}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                         <button onClick={handleDownloadTemplate} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300">
                            Download Template
                        </button>
                        <button onClick={handleBulkImport} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                            Upload & Import
                        </button>
                    </div>
                     {importStatus.message && (
                        <div className={`mt-4 p-3 rounded-md text-sm whitespace-pre-wrap ${importStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {importStatus.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Existing Products</h2>
                <div className="space-y-3">
                   {products.map(p => (
                       <div key={p.id} className="bg-gray-50 p-3 rounded-md shadow-sm flex justify-between items-center flex-wrap gap-2">
                           <div>
                               <p className="font-semibold">{p.name}</p>
                               <p className="text-sm text-gray-500">{p.category} | Stock: <span className="font-medium">{p.stock}</span> | <span className="font-bold">{formatCurrency(p.price, p.currency)}</span></p>
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