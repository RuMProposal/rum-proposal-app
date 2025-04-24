import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import HomePage from './components/pages/HomePage';
import NewProposalPage from './components/pages/NewProposalPage';
import ViewProposalPage from './components/pages/ViewProposalPage';
import NotFoundPage from './components/pages/NotFoundPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proposal/new" element={<NewProposalPage />} />
          <Route path="/proposal/view/:id" element={<ViewProposalPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Autosave indicator */}
      <div 
        id="autosave-indicator" 
        className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 opacity-0"
      >
        {language === 'de' ? 'Gespeichert' : 'Saved'}
      </div>
    </div>
  );
};

export default App;
