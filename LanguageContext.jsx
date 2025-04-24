import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context with default values
const LanguageContext = createContext({
  language: 'de',
  setLanguage: () => {},
  t: (key) => key,
});

// Translations object
const translations = {
  de: {
    'home.title': 'RuM Project Proposal Generator',
    'home.subtitle': 'Erstellen Sie professionelle Angebote im Corporate Design von RuM Project',
    'home.create_button': 'Neues Proposal erstellen',
    
    'sections.titlePage': 'Titelseite',
    'sections.companyIntroduction': 'Unternehmensvorstellung',
    'sections.companyFacts': 'Zahlen & Fakten',
    'sections.services': 'Dienstleistungen',
    'sections.qualityManagement': 'Qualitätsmanagement',
    'sections.projectTeam': 'Projektteam',
    'sections.projectExecution': 'Projektabwicklung',
    'sections.timeline': 'Bauzeitenplan',
    'sections.siteLogistics': 'Baustellenlogistik',
    'sections.safety': 'Arbeitssicherheit',
    'sections.offer': 'Angebot',
    'sections.references': 'Referenzen',
    
    'titlePage.title': 'Titel',
    'titlePage.subtitle': 'Untertitel',
    'titlePage.customerName': 'Kundenname',
    'titlePage.customerName_placeholder': 'Name des Kunden eingeben',
    'titlePage.contactPerson': 'Ansprechpartner',
    'titlePage.contactPerson_placeholder': 'Name des Ansprechpartners eingeben',
    'titlePage.projectNumber': 'Projektnummer',
    'titlePage.projectNumber_placeholder': 'Projektnummer eingeben',
    'titlePage.rumLogo': 'RuM Logo',
    'titlePage.customerLogo': 'Kundenlogo',
    
    'common.background': 'Hintergrund',
    'common.saveAndContinue': 'Speichern & Weiter',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.createPDF': 'PDF erstellen',
    'common.shareLink': 'Link teilen',
    'common.download': 'Herunterladen',
    
    'templates.title.project_proposal': 'Projektvorschlag',
    'templates.title.project_proposal_value': 'PROJEKTVORSCHLAG',
    'templates.title.room_solution': 'Raumlösung',
    'templates.title.room_solution_value': 'RAUMLÖSUNG',
    'templates.title.offer': 'Angebot',
    'templates.title.offer_value': 'ANGEBOT',
    
    'templates.subtitle.custom_solution': 'Maßgeschneiderte Lösung',
    'templates.subtitle.custom_solution_value': 'Maßgeschneiderte Raumlösung für',
    'templates.subtitle.project_execution': 'Projektabwicklung',
    'templates.subtitle.project_execution_value': 'Professionelle Projektabwicklung für',
    'templates.subtitle.room_concept': 'Raumkonzept',
    'templates.subtitle.room_concept_value': 'Innovatives Raumkonzept für',
    
    'draft.title': 'Entwurf gefunden',
    'draft.message': 'Es wurde ein gespeicherter Entwurf gefunden. Möchten Sie mit der Bearbeitung fortfahren oder ein neues Proposal erstellen?',
    'draft.load_button': 'Entwurf laden',
    'draft.new_button': 'Neues Proposal erstellen',
    
    'autosave.saving': 'Speichern...',
    'autosave.saved': 'Gespeichert',
    
    'pdf.generating': 'PDF wird erstellt...',
    'pdf.success': 'PDF wurde erfolgreich erstellt',
    'pdf.error': 'Fehler beim Erstellen des PDFs',
    
    'share.generating': 'Link wird erstellt...',
    'share.success': 'Link wurde erfolgreich erstellt',
    'share.error': 'Fehler beim Erstellen des Links',
    'share.copy': 'Link kopieren',
    'share.copied': 'Link kopiert!',
    
    'companyFacts.revenue': 'Umsatzentwicklung',
    'companyFacts.employees': 'Mitarbeiterentwicklung',
    'companyFacts.insurance': 'Versicherungsschutz',
    'companyFacts.creditRating': 'Bonität & Finanzkraft',
    'companyFacts.industryExpertise': 'Branchenkompetenz',
    'companyFacts.servicePortfolio': 'Leistungsportfolio',
  },
  en: {
    'home.title': 'RuM Project Proposal Generator',
    'home.subtitle': 'Create professional proposals in RuM Project corporate design',
    'home.create_button': 'Create New Proposal',
    
    'sections.titlePage': 'Title Page',
    'sections.companyIntroduction': 'Company Introduction',
    'sections.companyFacts': 'Facts & Figures',
    'sections.services': 'Services',
    'sections.qualityManagement': 'Quality Management',
    'sections.projectTeam': 'Project Team',
    'sections.projectExecution': 'Project Execution',
    'sections.timeline': 'Timeline',
    'sections.siteLogistics': 'Site Logistics',
    'sections.safety': 'Safety',
    'sections.offer': 'Offer',
    'sections.references': 'References',
    
    'titlePage.title': 'Title',
    'titlePage.subtitle': 'Subtitle',
    'titlePage.customerName': 'Customer Name',
    'titlePage.customerName_placeholder': 'Enter customer name',
    'titlePage.contactPerson': 'Contact Person',
    'titlePage.contactPerson_placeholder': 'Enter contact person name',
    'titlePage.projectNumber': 'Project Number',
    'titlePage.projectNumber_placeholder': 'Enter project number',
    'titlePage.rumLogo': 'RuM Logo',
    'titlePage.customerLogo': 'Customer Logo',
    
    'common.background': 'Background',
    'common.saveAndContinue': 'Save & Continue',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.createPDF': 'Create PDF',
    'common.shareLink': 'Share Link',
    'common.download': 'Download',
    
    'templates.title.project_proposal': 'Project Proposal',
    'templates.title.project_proposal_value': 'PROJECT PROPOSAL',
    'templates.title.room_solution': 'Room Solution',
    'templates.title.room_solution_value': 'ROOM SOLUTION',
    'templates.title.offer': 'Offer',
    'templates.title.offer_value': 'OFFER',
    
    'templates.subtitle.custom_solution': 'Custom Solution',
    'templates.subtitle.custom_solution_value': 'Custom Room Solution for',
    'templates.subtitle.project_execution': 'Project Execution',
    'templates.subtitle.project_execution_value': 'Professional Project Execution for',
    'templates.subtitle.room_concept': 'Room Concept',
    'templates.subtitle.room_concept_value': 'Innovative Room Concept for',
    
    'draft.title': 'Draft Found',
    'draft.message': 'A saved draft has been found. Would you like to continue editing or create a new proposal?',
    'draft.load_button': 'Load Draft',
    'draft.new_button': 'Create New Proposal',
    
    'autosave.saving': 'Saving...',
    'autosave.saved': 'Saved',
    
    'pdf.generating': 'Generating PDF...',
    'pdf.success': 'PDF successfully created',
    'pdf.error': 'Error creating PDF',
    
    'share.generating': 'Generating link...',
    'share.success': 'Link successfully created',
    'share.error': 'Error creating link',
    'share.copy': 'Copy link',
    'share.copied': 'Link copied!',
    
    'companyFacts.revenue': 'Revenue Development',
    'companyFacts.employees': 'Employee Development',
    'companyFacts.insurance': 'Insurance Coverage',
    'companyFacts.creditRating': 'Creditworthiness & Financial Strength',
    'companyFacts.industryExpertise': 'Industry Expertise',
    'companyFacts.servicePortfolio': 'Service Portfolio',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de');
  
  // Load language preference from localStorage on initial render
  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem('rum_language_preference');
      if (storedLanguage === 'de' || storedLanguage === 'en') {
        setLanguage(storedLanguage);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('rum_language_preference', language);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, [language]);
  
  // Translation function
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
