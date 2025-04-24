import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} RuM Project GmbH. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">HO²</span>
            <span className="text-sm text-primary font-medium">Manufactured Space Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
