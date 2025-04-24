import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProposal } from '../../contexts/ProposalContext';

const ProposalViewer = ({ proposalData }) => {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('titlePage');

  // Set language based on proposal data
  React.useEffect(() => {
    if (proposalData && proposalData.language) {
      setLanguage(proposalData.language);
    }
  }, [proposalData, setLanguage]);

  if (!proposalData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            {language === 'de' ? 'Proposal nicht gefunden' : 'Proposal not found'}
          </h1>
          <p className="text-gray-600">
            {language === 'de' 
              ? 'Das angeforderte Proposal konnte nicht gefunden werden.' 
              : 'The requested proposal could not be found.'}
          </p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'titlePage', name: language === 'de' ? 'Titelseite' : 'Title Page' },
    { id: 'companyIntroduction', name: language === 'de' ? 'Unternehmensvorstellung' : 'Company Introduction' },
    { id: 'companyFacts', name: language === 'de' ? 'Zahlen & Fakten' : 'Facts & Figures' },
    { id: 'services', name: language === 'de' ? 'Dienstleistungen' : 'Services' },
    { id: 'qualityManagement', name: language === 'de' ? 'Qualitätsmanagement' : 'Quality Management' },
    { id: 'projectTeam', name: language === 'de' ? 'Projektteam' : 'Project Team' },
    { id: 'projectExecution', name: language === 'de' ? 'Projektabwicklung' : 'Project Execution' },
    { id: 'timeline', name: language === 'de' ? 'Bauzeitenplan' : 'Timeline' },
    { id: 'siteLogistics', name: language === 'de' ? 'Baustellenlogistik' : 'Site Logistics' },
    { id: 'safety', name: language === 'de' ? 'Arbeitssicherheit' : 'Safety' },
    { id: 'offer', name: language === 'de' ? 'Angebot' : 'Offer' },
    { id: 'references', name: language === 'de' ? 'Referenzen' : 'References' },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
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

  const renderTitlePage = () => {
    const titlePage = proposalData.sections.titlePage;
    const background = titlePage?.background;

    return (
      <div className="proposal-section relative min-h-[80vh] flex flex-col">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10 flex-grow flex flex-col">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-16 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <div className="flex-grow flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {titlePage?.title || (language === 'de' ? 'PROJEKTVORSCHLAG' : 'PROJECT PROPOSAL')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">
              {titlePage?.subtitle || (language === 'de' ? 'Maßgeschneiderte Raumlösung für' : 'Custom Room Solution for')} {titlePage?.customerName || ''}
            </h2>
            
            <div className="mt-12 text-left">
              <p className="mb-2"><strong>{language === 'de' ? 'Datum' : 'Date'}:</strong> {new Date().toLocaleDateString()}</p>
              <p className="mb-2"><strong>{language === 'de' ? 'Ansprechpartner' : 'Contact'}:</strong> {titlePage?.contactPerson || ''}</p>
              <p className="mb-2"><strong>{language === 'de' ? 'Projektnummer' : 'Project Number'}:</strong> {titlePage?.projectNumber || ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyIntroduction = () => {
    const companyIntro = proposalData.sections.companyIntroduction;
    const background = companyIntro?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Unternehmensvorstellung' : 'Company Introduction'}
          </h2>
          
          <div className="prose max-w-none">
            {companyIntro?.content ? (
              <div dangerouslySetInnerHTML={{ __html: companyIntro.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyFacts = () => {
    const companyFacts = proposalData.sections.companyFacts;
    const background = companyFacts?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Zahlen & Fakten' : 'Facts & Figures'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Development */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">€</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Umsatzentwicklung' : 'Revenue Development'}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {companyFacts?.annualRevenue?.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{item.year}:</span>
                    <span>{item.amount} Mio. €</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Employee Development */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Mitarbeiterentwicklung' : 'Employee Development'}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {companyFacts?.employeeHistory?.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{item.year}:</span>
                    <span>{item.internal + item.external}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Insurance */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Versicherungsschutz' : 'Insurance Coverage'}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{language === 'de' ? 'Berufshaftpflicht' : 'Professional Liability'}:</span>
                  <span>{companyFacts?.insurance?.professionalLiability || 0} Mio. €</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{language === 'de' ? 'Betriebshaftpflicht' : 'Operational Liability'}:</span>
                  <span>{companyFacts?.insurance?.operationalLiability || 0} Mio. €</span>
                </div>
              </div>
            </div>
            
            {/* Credit Rating */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Bonität & Finanzkraft' : 'Creditworthiness & Financial Strength'}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{language === 'de' ? 'Rating' : 'Rating'}:</span>
                  <span>{companyFacts?.creditRating?.rating || 0}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{language === 'de' ? 'Beschreibung' : 'Description'}:</span>
                  <span>{companyFacts?.creditRating?.description || ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{language === 'de' ? 'Quelle' : 'Source'}:</span>
                  <span>{companyFacts?.creditRating?.source || ''}</span>
                </div>
              </div>
            </div>
            
            {/* Industry Expertise */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Branchenkompetenz' : 'Industry Expertise'}
                </h3>
              </div>
              
              <ul className="list-disc pl-5 space-y-1">
                {companyFacts?.industryExpertise?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Service Portfolio */}
            <div className="bg-secondary p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {language === 'de' ? 'Leistungsportfolio' : 'Service Portfolio'}
                </h3>
              </div>
              
              <ul className="list-disc pl-5 space-y-1">
                {companyFacts?.servicePortfolio?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {companyFacts?.customContent && (
            <div className="mt-6 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: companyFacts.customContent.replace(/\n/g, '<br/>') }} />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Implement other section renderers similarly
  const renderServices = () => {
    const services = proposalData.sections.services;
    const background = services?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Dienstleistungen' : 'Services'}
          </h2>
          
          <div className="prose max-w-none">
            {services?.content ? (
              <div dangerouslySetInnerHTML={{ __html: services.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQualityManagement = () => {
    const qualityManagement = proposalData.sections.qualityManagement;
    const background = qualityManagement?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Qualitätsmanagement' : 'Quality Management'}
          </h2>
          
          <div className="prose max-w-none">
            {qualityManagement?.content ? (
              <div dangerouslySetInnerHTML={{ __html: qualityManagement.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProjectTeam = () => {
    const projectTeam = proposalData.sections.projectTeam;
    const background = projectTeam?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Projektteam' : 'Project Team'}
          </h2>
          
          {projectTeam?.members && projectTeam.members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectTeam.members.map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  {member.image && (
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                  <p className="text-primary text-center font-medium mb-4">{member.position}</p>
                  <p className="text-gray-700">{member.responsibilities}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{language === 'de' ? 'Keine Teammitglieder verfügbar' : 'No team members available'}</p>
          )}
        </div>
      </div>
    );
  };

  const renderProjectExecution = () => {
    const projectExecution = proposalData.sections.projectExecution;
    const background = projectExecution?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Projektabwicklung' : 'Project Execution'}
          </h2>
          
          <div className="prose max-w-none">
            {projectExecution?.content ? (
              <div dangerouslySetInnerHTML={{ __html: projectExecution.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
          
          {projectExecution?.digitalTools && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                {language === 'de' ? 'Digitale Tools' : 'Digital Tools'}
              </h3>
              <div className="flex flex-wrap gap-4">
                {projectExecution.digitalTools.procore && (
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-medium">PROCORE</p>
                  </div>
                )}
                {projectExecution.digitalTools.tour360 && (
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-medium">360° Tour</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    const timeline = proposalData.sections.timeline;
    const background = timeline?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Bauzeitenplan' : 'Timeline'}
          </h2>
          
          {timeline?.file && (
            <div className="mb-6">
              <img 
                src={timeline.file} 
                alt="Timeline" 
                className="w-full max-h-96 object-contain"
              />
            </div>
          )}
          
          {timeline?.milestones && timeline.milestones.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                {language === 'de' ? 'Meilensteine' : 'Milestones'}
              </h3>
              <div className="space-y-4">
                {timeline.milestones.map((milestone, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                      <p>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="prose max-w-none">
            {timeline?.description ? (
              <div dangerouslySetInnerHTML={{ __html: timeline.description.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Beschreibung verfügbar' : 'No description available'}</p>
            )}
          </div>
          
          {timeline?.file && (
            <div className="mt-6">
              <a 
                href={timeline.file} 
                download
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
              >
                <span className="mr-2">📅</span>
                {language === 'de' ? 'Bauzeitenplan herunterladen' : 'Download Timeline'}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSiteLogistics = () => {
    const siteLogistics = proposalData.sections.siteLogistics;
    const background = siteLogistics?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Baustellenlogistik' : 'Site Logistics'}
          </h2>
          
          {siteLogistics?.diagram && (
            <div className="mb-6">
              <img 
                src={siteLogistics.diagram} 
                alt="Site Logistics Diagram" 
                className="w-full max-h-96 object-contain"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            {siteLogistics?.content ? (
              <div dangerouslySetInnerHTML={{ __html: siteLogistics.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSafety = () => {
    const safety = proposalData.sections.safety;
    const background = safety?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Arbeitssicherheit' : 'Safety'}
          </h2>
          
          <div className="prose max-w-none">
            {safety?.content ? (
              <div dangerouslySetInnerHTML={{ __html: safety.content.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{language === 'de' ? 'Keine Inhalte verfügbar' : 'No content available'}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOffer = () => {
    const offer = proposalData.sections.offer;
    const background = offer?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Angebot' : 'Offer'}
          </h2>
          
          {offer?.items && offer.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-2 text-left">{language === 'de' ? 'Beschreibung' : 'Description'}</th>
                    <th className="p-2 text-right">{language === 'de' ? 'Betrag (€)' : 'Amount (€)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {offer.items.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="p-2 border-t border-gray-300">{item.description}</td>
                      <td className="p-2 border-t border-gray-300 text-right">
                        {typeof item.amount === 'number' 
                          ? item.amount.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')
                          : item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200">
                    <td className="p-2 font-bold">{language === 'de' ? 'Nettobetrag' : 'Net Amount'}</td>
                    <td className="p-2 text-right font-bold">
                      {typeof offer.totalNet === 'number' 
                        ? offer.totalNet.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')
                        : offer.totalNet}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2">{language === 'de' ? 'MwSt.' : 'VAT'} ({offer.vat}%)</td>
                    <td className="p-2 text-right">
                      {typeof offer.totalNet === 'number' && typeof offer.vat === 'number'
                        ? (offer.totalNet * offer.vat / 100).toLocaleString(language === 'de' ? 'de-DE' : 'en-US')
                        : ''}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2 font-bold">{language === 'de' ? 'Gesamtbetrag' : 'Total Amount'}</td>
                    <td className="p-2 text-right font-bold">
                      {typeof offer.totalGross === 'number' 
                        ? offer.totalGross.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')
                        : offer.totalGross}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p>{language === 'de' ? 'Keine Angebotspositionen verfügbar' : 'No offer items available'}</p>
          )}
          
          <div className="mt-6">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // Generate and download offer as PDF
                alert(language === 'de' ? 'Angebot wird heruntergeladen...' : 'Downloading offer...');
              }}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              <span className="mr-2">📄</span>
              {language === 'de' ? 'Angebot herunterladen' : 'Download Offer'}
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderReferences = () => {
    const references = proposalData.sections.references;
    const background = references?.background;

    return (
      <div className="proposal-section relative min-h-[80vh]">
        {background?.url && (
          <div 
            className="section-background absolute inset-0 bg-cover bg-center z-0" 
            style={{
              backgroundImage: `url(${background.url})`,
              opacity: background.opacity
            }}
          ></div>
        )}
        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <img 
              src={proposalData.rumLogo?.url || "/assets/rum_project_logo.png"} 
              alt="RuM Project Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="teal-bar"></div>
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            {language === 'de' ? 'Referenzen' : 'References'}
          </h2>
          
          {references?.projects && references.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {references.projects.map((project, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.location}</p>
                  <p className="mb-4">{project.description}</p>
                  
                  {project.images && project.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {project.images.slice(0, 4).map((image, imgIndex) => (
                        <div key={imgIndex} className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                          <img 
                            src={image.url} 
                            alt={`${project.name} - Image ${imgIndex + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : project.image ? (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p>{language === 'de' ? 'Keine Referenzprojekte verfügbar' : 'No reference projects available'}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-gray-100 p-4 md:min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">
            {language === 'de' ? 'Sektionen' : 'Sections'}
          </h2>
          <button
            onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {language === 'de' ? 'EN' : 'DE'}
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => {
              const pdfExportButton = document.querySelector('.pdf-export-button');
              if (pdfExportButton) {
                pdfExportButton.click();
              } else {
                alert(language === 'de' ? 'PDF-Export nicht verfügbar' : 'PDF export not available');
              }
            }}
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          >
            {language === 'de' ? 'PDF herunterladen' : 'Download PDF'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-4">
        {renderSectionContent()}
      </div>
      
      {/* Hidden PDF Export Button */}
      <div className="hidden">
        <button className="pdf-export-button"></button>
      </div>
    </div>
  );
};

export default ProposalViewer;
