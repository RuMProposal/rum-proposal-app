import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import ProposalViewer from '../ui/ProposalViewer';
import EnhancedPDFExport from '../ui/EnhancedPDFExport';

const ViewProposalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [proposalData, setProposalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProposal = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load the proposal from localStorage
        const storedProposal = localStorage.getItem(id);
        
        if (!storedProposal) {
          throw new Error(language === 'de' 
            ? 'Das angeforderte Proposal konnte nicht gefunden werden.' 
            : 'The requested proposal could not be found.');
        }
        
        const parsedProposal = JSON.parse(storedProposal);
        setProposalData(parsedProposal);
      } catch (error) {
        console.error('Error loading proposal:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadProposal();
    }
  }, [id, language]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg">{language === 'de' ? 'Proposal wird geladen...' : 'Loading proposal...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'de' ? 'Fehler' : 'Error'}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          >
            {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          {proposalData?.sections?.titlePage?.customerName 
            ? `${language === 'de' ? 'Proposal für' : 'Proposal for'} ${proposalData.sections.titlePage.customerName}`
            : (language === 'de' ? 'Proposal Ansicht' : 'Proposal View')}
        </h1>
        
        <div className="hidden">
          <EnhancedPDFExport />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ProposalViewer proposalData={proposalData} />
      </div>
    </div>
  );
};

export default ViewProposalPage;
