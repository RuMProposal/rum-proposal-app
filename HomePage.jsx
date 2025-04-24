import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProposal } from '../../contexts/ProposalContext';

const HomePage = () => {
  const { t } = useLanguage();
  const { isDraftAvailable, loadDraftProposal, resetProposal } = useProposal();
  const [showDraftDialog, setShowDraftDialog] = React.useState(false);

  React.useEffect(() => {
    if (isDraftAvailable) {
      setShowDraftDialog(true);
    }
  }, [isDraftAvailable]);

  const handleCreateNew = () => {
    resetProposal();
    setShowDraftDialog(false);
  };

  const handleLoadDraft = () => {
    loadDraftProposal();
    setShowDraftDialog(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">{t('home.title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('home.subtitle')}</p>
        
        <div className="flex flex-col items-center justify-center">
          <Link
            to="/proposal/new"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors mb-4"
            onClick={(e) => {
              if (isDraftAvailable) {
                e.preventDefault();
                setShowDraftDialog(true);
              }
            }}
          >
            {t('home.create_button')}
          </Link>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">RuM Project Proposal Generator</h2>
              <p className="mb-4">
                Erstellen Sie professionelle Angebote im Corporate Design von RuM Project mit allen wichtigen Kategorien:
              </p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Titelseite
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Unternehmensvorstellung
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Zahlen & Fakten
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Dienstleistungen
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Qualitätsmanagement
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Projektteam
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Projektabwicklung
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Bauzeitenplan
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Baustellenlogistik
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Arbeitssicherheit
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Angebot
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span> Referenzen
                </li>
              </ul>
              <div className="flex justify-center">
                <Link
                  to="/proposal/new"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={(e) => {
                    if (isDraftAvailable) {
                      e.preventDefault();
                      setShowDraftDialog(true);
                    }
                  }}
                >
                  {t('home.create_button')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Draft Dialog */}
      {showDraftDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{t('draft.title')}</h2>
            <p className="mb-6">{t('draft.message')}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t('draft.new_button')}
              </button>
              <button
                onClick={handleLoadDraft}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
              >
                {t('draft.load_button')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
