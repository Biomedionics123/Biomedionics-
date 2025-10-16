import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DnaIcon } from '../../components/IconComponents';
import { useAppContext } from '../../contexts/AppContext';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { siteSettings } = useAppContext();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === siteSettings.adminPassword) { 
      sessionStorage.setItem('biomedionics_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
            <DnaIcon className="h-12 w-12 text-blue-600" />
            <h1 className="text-2xl font-bold text-center text-gray-800 mt-2">Admin Panel Login</h1>
            <p className="text-sm text-gray-500">Biomedionics Website Manager</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password-input" className="text-sm font-bold text-gray-600 block">Password</label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;