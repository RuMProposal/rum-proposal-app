import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ShareableLink = ({ proposalId, proposalData }) => {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateShareableLink = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setError('');
    setCopied(false);
    
    try {
      // Compress and encode the proposal data
      const proposalString = JSON.stringify(proposalData);
      
      // Check if the data is too large
      if (proposalString.length > 100000) {
        throw new Error(language === 'de' 
          ? 'Die Proposal-Daten sind zu groß für einen teilbaren Link.' 
          : 'The proposal data is too large for a shareable link.');
      }
      
      // Store in localStorage with a unique key
      const shareKey = `rum_shared_proposal_${proposalId || Date.now()}`;
      localStorage.setItem(shareKey, proposalString);
      
      // Generate the link
      const baseUrl = window.location.origin;
      const shareableUrl = `${baseUrl}/proposal/view/${shareKey}`;
      
      setShareableLink(shareableUrl);
    } catch (error) {
      console.error('Error generating shareable link:', error);
      setError(error.message || (language === 'de' 
        ? 'Fehler beim Erstellen des Links' 
        : 'Error creating link'));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!shareableLink) return;
    
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className="mb-6">
      <button
        onClick={generateShareableLink}
        disabled={isGenerating}
        className={`px-4 py-2 rounded-md text-white ${
          isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
        }`}
      >
        {isGenerating ? t('share.generating') : t('common.shareLink')}
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {shareableLink && !error && (
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors"
            >
              {copied ? t('share.copied') : t('share.copy')}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {language === 'de' 
              ? 'Dieser Link kann mit anderen geteilt werden, um das Proposal anzuzeigen.' 
              : 'This link can be shared with others to view the proposal.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareableLink;
