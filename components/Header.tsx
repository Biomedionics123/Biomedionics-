import React, { useState, FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DnaIcon, MenuIcon, XIcon, ShoppingCartIcon, SearchIcon, HeartIcon, getDisplayableImageUrl } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist, appearanceSettings } = useAppContext();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistItemCount = wishlist.length;
  const navigate = useNavigate();
  
  const { primaryColor, logoUrl, siteName } = appearanceSettings;

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string => {
    const baseClasses = 'py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300';
    if (isActive) {
      return `${baseClasses} text-white`;
    }
    return `${baseClasses} text-gray-700 hover:bg-blue-100 hover:text-blue-700`;
  };
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }): string => {
      const baseClasses = 'block py-2 px-4 text-base font-medium';
       if (isActive) {
        return `${baseClasses} text-white`;
      }
      return `${baseClasses} text-gray-700 hover:bg-blue-100`;
  }
  
  const activeStyle = { backgroundColor: primaryColor };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              {logoUrl ? (
                <img src={getDisplayableImageUrl(logoUrl)} alt={`${siteName} Logo`} className="h-10 w-auto" />
              ) : (
                <DnaIcon className="h-8 w-8" style={{ color: primaryColor }} />
              )}
              <span className="font-bold text-xl text-gray-800" style={{ color: primaryColor }}>{siteName}</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <nav className="flex items-baseline space-x-4">
              {appearanceSettings.headerLinks.map(link => (
                 <NavLink 
                    key={link.id} 
                    to={link.url} 
                    className={navLinkClasses}
                    style={({isActive}) => isActive ? activeStyle : undefined }
                  >
                    {link.text}
                 </NavLink>
              ))}
              <NavLink to="/track-order" className={navLinkClasses} style={({isActive}) => isActive ? activeStyle : undefined }>Track Order</NavLink>
            </nav>
            <div className="ml-6 flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..." 
                    className="border rounded-full py-1 pl-4 pr-10 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
                    <SearchIcon className="h-5 w-5" />
                  </button>
                </form>
                 <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-blue-600">
                    <HeartIcon className="h-6 w-6" />
                    {wishlistItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">{wishlistItemCount}</span>
                    )}
                </Link>
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">{cartItemCount}</span>
                    )}
                </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
             <Link to="/wishlist" className="relative p-2 mr-2 text-gray-600 hover:text-blue-600">
                <HeartIcon className="h-6 w-6" />
                {wishlistItemCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">{wishlistItemCount}</span>
                )}
            </Link>
            <Link to="/cart" className="relative p-2 mr-2 text-gray-600 hover:text-blue-600">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">{cartItemCount}</span>
                )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              style={{backgroundColor: isMenuOpen ? primaryColor : 'transparent', color: isMenuOpen ? 'white' : 'inherit' }}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {appearanceSettings.headerLinks.map(link => (
                 <NavLink 
                    key={link.id} 
                    to={link.url} 
                    className={mobileNavLinkClasses} 
                    onClick={() => setIsMenuOpen(false)}
                    style={({isActive}) => isActive ? activeStyle : undefined }
                 >
                    {link.text}
                 </NavLink>
              ))}
            <NavLink to="/track-order" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)} style={({isActive}) => isActive ? activeStyle : undefined }>Track Order</NavLink>
            <div className="p-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full border rounded-full py-2 pl-4 pr-10 text-sm" />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"><SearchIcon className="h-5 w-5" /></button>
                </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;