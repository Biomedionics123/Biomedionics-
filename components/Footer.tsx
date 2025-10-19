import React from 'react';
import { Link } from 'react-router-dom';
import { DnaIcon, getDisplayableImageUrl } from './IconComponents';
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
                <img src={getDisplayableImageUrl(appearanceSettings.logoUrl)} alt={`${appearanceSettings.siteName} Logo`} className="h-10 w-auto" />
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
              <li className="whitespace-pre-wrap">
                <a 
                    href="https://www.google.com/maps/dir//3QX7%2B2XW,+Muridke+Road,+Narowal/@32.0975952,74.6825425,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x391953f55817d0e1:0x95c765f70d155ed0!2m2!1d74.7649438!2d32.0976219?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-primary)] transition-colors"
                >
                    UET Lahore, Narowal Campus, Pakistan
                </a>
              </li>
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