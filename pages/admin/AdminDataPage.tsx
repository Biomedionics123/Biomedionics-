import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { DownloadIcon } from '../../components/IconComponents';

const AdminDataPage: React.FC = () => {
    const { exportAllData, importAllData } = useAppContext();
    const [importFile, setImportFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImportFile(e.target.files[0]);
        }
    };

    const handleImport = () => {
        if (importFile) {
            importAllData(importFile);
        } else {
            alert('Please select a file to import.');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Data Management</h1>
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Export All Site Data</h2>
                    <p className="text-gray-600 mb-4">
                        This will generate a single JSON file containing all of your current products, blog posts, settings, and other content. 
                        This file acts as the "database" for the live website.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        <strong className="font-semibold">Workflow:</strong> When you have made changes and are ready to publish them, export the data and send the downloaded <code className="bg-gray-200 text-sm p-1 rounded">.json</code> file to the website developer. They will use this file to update the live site for all visitors.
                    </p>
                    <button
                        onClick={exportAllData}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Export All Data
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Import Site Data</h2>
                    <p className="text-gray-600 mb-4">
                        Upload a previously exported <code className="bg-gray-200 text-sm p-1 rounded">.json</code> file to overwrite the content in your current browser session.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                       <strong className="font-semibold">Use Case:</strong> This is useful for restoring your admin panel from a backup, or if you switch computers and want to continue editing from where you left off. This only affects what you see in the admin panel, it does not make the changes live.
                    </p>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                             className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <button
                            onClick={handleImport}
                            disabled={!importFile}
                            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Import Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDataPage;
