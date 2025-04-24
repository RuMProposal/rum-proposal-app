import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('notFound.message') || 'Die angeforderte Seite konnte nicht gefunden werden.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          {t('notFound.backHome') || 'Zurück zur Startseite'}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
