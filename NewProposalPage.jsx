import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProposal } from '../../contexts/ProposalContext';
import BackgroundSelector from '../ui/BackgroundSelector';
import TextTemplateSelector from '../ui/TextTemplateSelector';
import AutofillInput from '../ui/AutofillInput';
import SimplifiedPDFExport from '../ui/SimplifiedPDFExport';
import SimplifiedShareableLink from '../ui/SimplifiedShareableLink';

const NewProposalPage = () => {
  const { language, t } = useLanguage();
  const { 
    proposal, 
    updateSection, 
    currentSection, 
    setCurrentSection,
    getAutofillSuggestions,
    saveCurrentProposal
  } = useProposal();
  const navigate = useNavigate();
  
  // Define all sections
  const sections = [
    { id: 'titlePage', name: t('sections.titlePage') },
    { id: 'companyIntroduction', name: t('sections.companyIntroduction') },
    { id: 'companyFacts', name: t('sections.companyFacts') },
    { id: 'services', name: t('sections.services') },
    { id: 'qualityManagement', name: t('sections.qualityManagement') },
    { id: 'projectTeam', name: t('sections.projectTeam') },
    { id: 'projectExecution', name: t('sections.projectExecution') },
    { id: 'timeline', name: t('sections.timeline') },
    { id: 'siteLogistics', name: t('sections.siteLogistics') },
    { id: 'safety', name: t('sections.safety') },
    { id: 'offer', name: t('sections.offer') },
    { id: 'references', name: t('sections.references') },
  ];

  // Save proposal when section changes
  useEffect(() => {
    saveCurrentProposal();
  }, [currentSection]);

  // Handle navigation between sections
  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
  };

  // Render the current section content
  const renderSectionContent = () => {
    const currentSectionId = sections[currentSection].id;
    
    switch (currentSectionId) {
      case 'titlePage':
        return renderTitlePage();
      case 'companyIntroduction':
        return renderCompanyIntroduction();
      case 'companyFacts':
        return renderCompanyFacts();
      case 'services':
        return renderServices();
      case 'qualityManagement':
        return renderQualityManagement();
      case 'projectTeam':
        return renderProjectTeam();
      case 'projectExecution':
        return renderProjectExecution();
      case 'timeline':
        return renderTimeline();
      case 'siteLogistics':
        return renderSiteLogistics();
      case 'safety':
        return renderSafety();
      case 'offer':
        return renderOffer();
      case 'references':
        return renderReferences();
      default:
        return <div>Section not found</div>;
    }
  };

  // Title Page Section
  const renderTitlePage = () => {
    const titlePage = proposal.sections.titlePage;
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      updateSection('titlePage', { [name]: value });
    };
    
    const handleBackgroundChange = (background) => {
      updateSection('titlePage', { background });
    };
    
    const handleLogoUpload = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result;
          if (url) {
            updateSection('titlePage', { 
              customerLogo: {
                ...titlePage.customerLogo,
                url
              }
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">{t('sections.titlePage')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <AutofillInput
              id="title"
              label={t('titlePage.title')}
              value={titlePage.title}
              onChange={handleInputChange}
              placeholder={t('templates.title.project_proposal_value')}
            />
            
            <AutofillInput
              id="subtitle"
              label={t('titlePage.subtitle')}
              value={titlePage.subtitle}
              onChange={handleInputChange}
              placeholder={t('templates.subtitle.custom_solution_value')}
            />
            
            <AutofillInput
              id="customerName"
              label={t('titlePage.customerName')}
              value={titlePage.customerName}
              onChange={handleInputChange}
              placeholder={t('titlePage.customerName_placeholder')}
              suggestions={getAutofillSuggestions('customerName', titlePage.customerName)}
            />
            
            <AutofillInput
              id="contactPerson"
              label={t('titlePage.contactPerson')}
              value={titlePage.contactPerson}
              onChange={handleInputChange}
              placeholder={t('titlePage.contactPerson_placeholder')}
              suggestions={getAutofillSuggestions('contactPerson', titlePage.contactPerson)}
            />
            
            <AutofillInput
              id="projectNumber"
              label={t('titlePage.projectNumber')}
              value={titlePage.projectNumber}
              onChange={handleInputChange}
              placeholder={t('titlePage.projectNumber_placeholder')}
              suggestions={getAutofillSuggestions('projectNumber', titlePage.projectNumber)}
            />
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('titlePage.customerLogo')}
              </label>
              <div className="flex items-center space-x-4">
                {titlePage.customerLogo?.url && (
                  <div className="w-32 h-32 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                    <img 
                      src={titlePage.customerLogo.url} 
                      alt="Customer Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="customerLogo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <label
                    htmlFor="customerLogo"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 cursor-pointer inline-block"
                  >
                    {titlePage.customerLogo?.url 
                      ? (language === 'de' ? 'Logo ändern' : 'Change Logo')
                      : (language === 'de' ? 'Logo hochladen' : 'Upload Logo')}
                  </label>
                </div>
              </div>
            </div>
            
            <BackgroundSelector
              onBackgroundChange={handleBackgroundChange}
              initialBackground={titlePage.background}
            />
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium mb-2">{language === 'de' ? 'Vorschau' : 'Preview'}</h3>
          <div className="proposal-section relative min-h-[40vh] border border-gray-200 rounded-md overflow-hidden">
            {titlePage.background?.url && (
              <div 
                className="section-background absolute inset-0 bg-cover bg-center z-0" 
                style={{
                  backgroundImage: `url(${titlePage.background.url})`,
                  opacity: titlePage.background.opacity
                }}
              ></div>
            )}
            <div className="relative z-10 p-8">
              <div className="flex justify-between mb-8">
                <div className="w-1/3">
                  <img 
                    src={proposal.rumLogo?.url || "/assets/rum_project_logo.png"} 
                    alt="RuM Project Logo" 
                    className="h-12 object-contain"
                  />
                </div>
                <div className="w-1/3 flex justify-end">
                  {titlePage.customerLogo?.url && (
                    <img 
                      src={titlePage.customerLogo.url} 
                      alt="Customer Logo" 
                      className="h-12 object-contain"
                    />
                  )}
                </div>
              </div>
              
              <div className="teal-bar"></div>
              
              <div className="text-center mt-12">
                <h1 className="text-3xl font-bold text-primary mb-4">
                  {titlePage.title || (language === 'de' ? 'PROJEKTVORSCHLAG' : 'PROJECT PROPOSAL')}
                </h1>
                <h2 className="text-xl font-medium mb-6">
                  {titlePage.subtitle || (language === 'de' ? 'Maßgeschneiderte Raumlösung für' : 'Custom Room Solution for')} {titlePage.customerName || ''}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Company Introduction Section
  const renderCompanyIntroduction = () => {
    const companyIntro = proposal.sections.companyIntroduction;
    
    const handleContentChange = (content) => {
      updateSection('companyIntroduction', { content });
    };
    
    const handleBackgroundChange = (background) => {
      updateSection('companyIntroduction', { background });
    };
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">{t('sections.companyIntroduction')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TextTemplateSelector
              sectionName="companyIntroduction"
              onTemplateSelect={handleContentChange}
              initialText={companyIntro.content}
              label={language === 'de' ? 'Unternehmensvorstellung Text' : 'Company Introduction Text'}
            />
          </div>
          
          <div>
            <BackgroundSelector
              onBackgroundChange={handleBackgroundChange}
              initialBackground={companyIntro.background}
            />
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium mb-2">{language === 'de' ? 'Vorschau' : 'Preview'}</h3>
          <div className="proposal-section relative min-h-[40vh] border border-gray-200 rounded-md overflow-hidden">
            {companyIntro.background?.url && (
              <div 
                className="section-background absolute inset-0 bg-cover bg-center z-0" 
                style={{
                  backgroundImage: `url(${companyIntro.background.url})`,
                  opacity: companyIntro.background.opacity
                }}
              ></div>
            )}
            <div className="relative z-10 p-8">
              <div className="flex justify-end mb-8">
                <img 
                  src={proposal.rumLogo?.url || "/assets/rum_project_logo.png"} 
                  alt="RuM Project Logo" 
                  className="h-12 object-contain"
                />
              </div>
              
              <div className="teal-bar"></div>
              
              <h2 className="text-2xl font-bold text-primary mb-4">
                {language === 'de' ? 'Unternehmensvorstellung' : 'Company Introduction'}
              </h2>
              
              <div className="prose max-w-none">
                {companyIntro.content ? (
                  <div dangerouslySetInnerHTML={{ __html: companyIntro.content.replace(/\n/g, '<br/>') }} />
                ) : (
                  <p className="text-gray-500 italic">
                    {language === 'de' ? 'Keine Inhalte ausgewählt' : 'No content selected'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Implement other section renderers similarly
  const renderCompanyFacts = () => {
    // Implementation for company facts section
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">{t('sections.companyFacts')}</h2>
        
        {/* Content will be implemented based on requirements */}
        <p className="text-gray-500">
          {language === 'de' 
            ? 'Diese Sektion wird mit Unternehmensdaten, Umsatzentwicklung, Mitarbeiterentwicklung, etc. implementiert.' 
            : 'This section will be implemented with company data, revenue development, employee development, etc.'}
        </p>
      </div>
    );
  };

  const renderServices = () => {
    const services = proposal.sections.services;
    
    const handleContentChange = (content) => {
      updateSection('services', { content });
    };
    
    const handleBackgroundChange = (background) => {
      updateSection('services', { background });
    };
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">{t('sections.services')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TextTemplateSelector
              sectionName="services"
              onTemplateSelect={handleContentChange}
              initialText={services.content}
              label={language === 'de' ? 'Dienstleistungen Text' : 'Services Text'}
            />
          </div>
          
          <div>
            <BackgroundSelector
              onBackgroundChange={handleBackgroundChange}
              initialBackground={services.background}
            />
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium mb-2">{language === 'de' ? 'Vorschau' : 'Preview'}</h3>
          <div className="proposal-section relative min-h-[40vh] border border-gray-200 rounded-md overflow-hidden">
            {services.background?.url && (
              <div 
                className="section-background absolute inset-0 bg-cover bg-center z-0" 
                style={{
                  backgroundImage: `url(${services.background.url})`,
                  opacity: services.background.opacity
                }}
              ></div>
            )}
            <div className="relative z-10 p-8">
              <div className="flex justify-end mb-8">
                <img 
                  src={proposal.rumLogo?.url || "/assets/rum_project_logo.png"} 
                  alt="RuM Project Logo" 
                  className="h-12 object-contain"
                />
              </div>
              
              <div className="teal-bar"></div>
              
              <h2 className="text-2xl font-bold text-primary mb-4">
                {language === 'de' ? 'Dienstleistungen' : 'Services'}
              </h2>
              
              <div className="prose max-w-none">
                {services.content ? (
                  <div dangerouslySetInnerHTML={{ __html: services.content.replace(/\n/g, '<br/>') }} />
                ) : (
                  <p className="text-gray-500 italic">
                    {language === 'de' ? 'Keine Inhalte ausgewählt' : 'No content selected'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Placeholder renderers for other sections
  const renderQualityManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.qualityManagement')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderProjectTeam = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.projectTeam')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderProjectExecution = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.projectExecution')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderTimeline = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.timeline')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderSiteLogistics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.siteLogistics')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderSafety = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.safety')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderOffer = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.offer')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
    </div>
  );
  
  const renderReferences = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{t('sections.references')}</h2>
      <p className="text-gray-500">{language === 'de' ? 'In Entwicklung...' : 'In development...'}</p>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">{language === 'de' ? 'Proposal Aktionen' : 'Proposal Actions'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">{language === 'de' ? 'PDF Export' : 'PDF Export'}</h4>
            <SimplifiedPDFExport />
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">{language === 'de' ? 'Link teilen' : 'Share Link'}</h4>
            <SimplifiedShareableLink />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">{language === 'de' ? 'Sektionen' : 'Sections'}</h2>
            <nav>
              <ul className="space-y-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleSectionClick(index)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        currentSection === index
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {renderSectionContent()}
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className={`px-4 py-2 rounded-md ${
                  currentSection === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {language === 'de' ? 'Zurück' : 'Previous'}
              </button>
              
              <button
                onClick={saveCurrentProposal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                {t('common.save')}
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentSection === sections.length - 1}
                className={`px-4 py-2 rounded-md ${
                  currentSection === sections.length - 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-opacity-90'
                }`}
              >
                {language === 'de' ? 'Weiter' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposalPage;
