import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProposalProvider } from './contexts/ProposalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ProposalProvider>
          <App />
        </ProposalProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
