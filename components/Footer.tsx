import React from 'react';
import { Link } from 'react-router-dom';
import { DnaIcon, getDisplayableGoogleDriveImageUrl } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

const Footer: React.FC = () => {
    const { appearanceSettings } = useAppContext();
    const solutionLinks = appearanceSettings.footerLinks.filter(l => l.category === 'Solutions');
    const companyLinks = appearanceSettings.footerLinks.filter(l => l.category === 'Company');

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
             <Link to="/" className="flex items-center gap-2">
              {appearanceSettings.logoUrl ? (
                <img src={getDisplayableGoogleDriveImageUrl(appearanceSettings.logoUrl)} alt={`${appearanceSettings.siteName} Logo`} className="h-10 w-auto" />
              ) : (
                <DnaIcon className="h-8 w-8" style={{color: appearanceSettings.primaryColor}} />
              )}
              <span className="font-bold text-lg" style={{ color: appearanceSettings.primaryColor }}>{appearanceSettings.siteName}</span>
            </Link>
            <p className="text-gray-500 text-sm">
              Advancing healthcare through innovative technology and dedicated service.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Solutions</h3>
            <ul className="mt-4 space-y-2">
              {solutionLinks.map(link => (
                <li key={link.id}><Link to={link.url} className="text-base text-gray-500 hover:text-[var(--color-primary)]">{link.text}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
             {companyLinks.map(link => (
                <li key={link.id}><Link to={link.url} className="text-base text-gray-500 hover:text-[var(--color-primary)]">{link.text}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-base text-gray-500">
              <li>+923294019767</li>
              <li>biomedionics@gmail.com</li>
              <li className="whitespace-pre-wrap">UET Lahore, Narowal Campus, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {appearanceSettings.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;