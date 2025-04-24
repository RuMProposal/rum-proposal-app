import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a default empty proposal with proper initialization
const createEmptyProposal = () => {
  const currentYear = new Date().getFullYear();
  
  return {
    id: '',
    title: '',
    language: 'de',
    clientLogo: '',
    date: new Date().toISOString().split('T')[0],
    contactPerson: '',
    projectNumber: '',
    // Initialize global RuM logo with default values
    rumLogo: {
      url: '/assets/rum_project_logo.png',
      position: 'right',
      size: 150
    },
    sections: {
      titlePage: {
        title: '',
        subtitle: '',
        customerName: '',
        contactPerson: '',
        projectNumber: '',
        rumLogo: {
          url: '/assets/rum_project_logo.png',
          position: 'left',
          size: 200
        },
        customerLogo: {
          url: '',
          position: 'right',
          size: 150
        },
        background: {
          url: '',
          opacity: 0.1
        }
      },
      companyIntroduction: {
        content: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      companyFacts: {
        employees: 0,
        annualRevenue: [
          { year: currentYear - 3, amount: 0 },
          { year: currentYear - 2, amount: 0 },
          { year: currentYear - 1, amount: 0 },
          { year: currentYear, amount: 0 },
        ],
        employeeHistory: [
          { year: `FY${(currentYear-5).toString().slice(2)}`, internal: 5, external: 4 },
          { year: `FY${(currentYear-4).toString().slice(2)}`, internal: 5, external: 5 },
          { year: `FY${(currentYear-3).toString().slice(2)}`, internal: 7, external: 5 },
          { year: `FY${(currentYear-2).toString().slice(2)}`, internal: 8, external: 5 },
          { year: `FY${(currentYear-1).toString().slice(2)}`, internal: 10, external: 3 },
          { year: `FC${(currentYear).toString().slice(2)}`, internal: 20, external: 3 }
        ],
        insurance: {
          professionalLiability: 10,
          operationalLiability: 10
        },
        creditRating: {
          rating: 88,
          description: 'sehr geringe Ausfallwahrscheinlichkeit',
          source: 'FHR Rapid Ratings Report 2024'
        },
        industryExpertise: [
          'Büro & Gewerbe',
          'Einzelhandel & Logistik',
          'Hotellerie & Gastronomie',
          'Life Science & Gesundheitswesen'
        ],
        servicePortfolio: [
          'Schlüsselfertiger Ausbau',
          'Generalunternehmer-leistungen (GU/GÜ)',
          'Einzel- und Zweiphasen Ausschreibungen',
          'GMP, Festpreis, Open Book',
          'Design & Build',
          'Nachhaltige Bauabwicklung',
          'Alles aus einer Hand'
        ],
        projectsCompleted: 0,
        customContent: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      services: {
        content: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      qualityManagement: {
        content: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      projectTeam: {
        members: [],
        background: {
          url: '',
          opacity: 0.1
        }
      },
      projectExecution: {
        content: '',
        digitalTools: {
          procore: false,
          tour360: false,
        },
        background: {
          url: '',
          opacity: 0.1
        }
      },
      timeline: {
        file: '',
        description: '',
        milestones: [],
        background: {
          url: '',
          opacity: 0.1
        }
      },
      siteLogistics: {
        diagram: '',
        content: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      safety: {
        content: '',
        background: {
          url: '',
          opacity: 0.1
        }
      },
      offer: {
        items: [],
        totalNet: 0,
        vat: 19,
        totalGross: 0,
        background: {
          url: '',
          opacity: 0.1
        }
      },
      references: {
        projects: [],
        background: {
          url: '',
          opacity: 0.1
        }
      },
    },
    lastEdited: Date.now(),
    currentSection: 0
  };
};

// Initialize empty autofill data
const emptyAutofillData = {
  customerNames: [],
  contactPersons: [],
  projectNumbers: [],
  teamMembers: [],
  offerItems: [],
  referenceProjects: []
};

// Generate a unique ID for new proposals
const generateUniqueId = () => {
  return 'proposal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const [proposal, setProposal] = useState(createEmptyProposal());
  const [currentSection, setCurrentSectionState] = useState(0);
  const [autofillData, setAutofillData] = useState(emptyAutofillData);
  const [isDraftAvailable, setIsDraftAvailable] = useState(false);
  
  // Load autofill data from localStorage on initial render
  useEffect(() => {
    try {
      const storedAutofillData = localStorage.getItem('rum_autofill_data');
      if (storedAutofillData) {
        setAutofillData(JSON.parse(storedAutofillData));
      }
      
      // Check if there's a draft proposal
      const draftProposal = localStorage.getItem('rum_draft_proposal');
      if (draftProposal) {
        setIsDraftAvailable(true);
      }
    } catch (error) {
      console.error('Error loading autofill data:', error);
    }
  }, []);
  
  // Set up autosave functionality
  useEffect(() => {
    // Only save if the proposal has an ID (meaning it's been initialized)
    if (proposal.id) {
      const autosaveTimer = setTimeout(() => {
        saveCurrentProposal();
      }, 5000); // Autosave after 5 seconds of inactivity
      
      return () => clearTimeout(autosaveTimer);
    }
  }, [proposal]);
  
  // Update current section and save it to the proposal
  const setCurrentSection = (section) => {
    setCurrentSectionState(section);
    setProposal(prev => ({
      ...prev,
      currentSection: section,
      lastEdited: Date.now()
    }));
  };
  
  // Save the current proposal to localStorage
  const saveCurrentProposal = () => {
    try {
      // Ensure the proposal has an ID
      let currentProposal = {...proposal};
      if (!currentProposal.id) {
        currentProposal.id = generateUniqueId();
        setProposal(currentProposal);
      }
      
      // Update timestamp
      currentProposal.lastEdited = Date.now();
      currentProposal.currentSection = currentSection;
      
      // Save to localStorage
      localStorage.setItem('rum_draft_proposal', JSON.stringify(currentProposal));
      
      // Update autofill data
      updateAutofillData(currentProposal);
      
      // Show autosave indicator
      const indicator = document.getElementById('autosave-indicator');
      if (indicator) {
        indicator.classList.remove('opacity-0');
        indicator.classList.add('opacity-100');
        
        setTimeout(() => {
          indicator.classList.remove('opacity-100');
          indicator.classList.add('opacity-0');
        }, 2000);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving proposal:', error);
      return false;
    }
  };
  
  // Load the draft proposal from localStorage
  const loadDraftProposal = () => {
    try {
      const draftProposal = localStorage.getItem('rum_draft_proposal');
      if (draftProposal) {
        const parsedProposal = JSON.parse(draftProposal);
        setProposal(parsedProposal);
        
        // Restore the current section if available
        if (typeof parsedProposal.currentSection === 'number') {
          setCurrentSectionState(parsedProposal.currentSection);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading draft proposal:', error);
      return false;
    }
  };
  
  // Update autofill data based on the current proposal
  const updateAutofillData = (currentProposal) => {
    try {
      const newAutofillData = {...autofillData};
      
      // Update customer names
      if (currentProposal.sections.titlePage.customerName && 
          !newAutofillData.customerNames.includes(currentProposal.sections.titlePage.customerName)) {
        newAutofillData.customerNames = [
          currentProposal.sections.titlePage.customerName,
          ...newAutofillData.customerNames
        ].slice(0, 10); // Keep only the 10 most recent
      }
      
      // Update contact persons
      if (currentProposal.sections.titlePage.contactPerson && 
          !newAutofillData.contactPersons.includes(currentProposal.sections.titlePage.contactPerson)) {
        newAutofillData.contactPersons = [
          currentProposal.sections.titlePage.contactPerson,
          ...newAutofillData.contactPersons
        ].slice(0, 10);
      }
      
      // Update project numbers
      if (currentProposal.sections.titlePage.projectNumber && 
          !newAutofillData.projectNumbers.includes(currentProposal.sections.titlePage.projectNumber)) {
        newAutofillData.projectNumbers = [
          currentProposal.sections.titlePage.projectNumber,
          ...newAutofillData.projectNumbers
        ].slice(0, 10);
      }
      
      // Update team members
      if (currentProposal.sections.projectTeam.members.length > 0) {
        // Create a set of existing member names for quick lookup
        const existingMemberNames = new Set(newAutofillData.teamMembers.map(m => m.name));
        
        // Add new members that don't already exist
        const newMembers = currentProposal.sections.projectTeam.members
          .filter(member => !existingMemberNames.has(member.name));
          
        newAutofillData.teamMembers = [
          ...newMembers,
          ...newAutofillData.teamMembers
        ].slice(0, 20); // Keep only the 20 most recent
      }
      
      // Update offer items
      if (currentProposal.sections.offer.items.length > 0) {
        // Create a set of existing item descriptions for quick lookup
        const existingItemDescriptions = new Set(newAutofillData.offerItems.map(i => i.description));
        
        // Add new items that don't already exist
        const newItems = currentProposal.sections.offer.items
          .filter(item => !existingItemDescriptions.has(item.description));
          
        newAutofillData.offerItems = [
          ...newItems,
          ...newAutofillData.offerItems
        ].slice(0, 30); // Keep only the 30 most recent
      }
      
      // Update reference projects
      if (currentProposal.sections.references.projects.length > 0) {
        // Create a set of existing project names for quick lookup
        const existingProjectNames = new Set(newAutofillData.referenceProjects.map(p => p.name));
        
        // Add new projects that don't already exist
        const newProjects = currentProposal.sections.references.projects
          .filter(project => !existingProjectNames.has(project.name));
          
        newAutofillData.referenceProjects = [
          ...newProjects,
          ...newAutofillData.referenceProjects
        ].slice(0, 20); // Keep only the 20 most recent
      }
      
      // Save updated autofill data to localStorage
      localStorage.setItem('rum_autofill_data', JSON.stringify(newAutofillData));
      setAutofillData(newAutofillData);
    } catch (error) {
      console.error('Error updating autofill data:', error);
    }
  };
  
  // Get autofill suggestions for a specific field
  const getAutofillSuggestions = (field, value) => {
    if (!value) return [];
    
    const lowerValue = value.toLowerCase();
    
    switch (field) {
      case 'customerName':
        return autofillData.customerNames
          .filter(name => name.toLowerCase().includes(lowerValue))
          .slice(0, 5);
      
      case 'contactPerson':
        return autofillData.contactPersons
          .filter(name => name.toLowerCase().includes(lowerValue))
          .slice(0, 5);
      
      case 'projectNumber':
        return autofillData.projectNumbers
          .filter(number => number.toLowerCase().includes(lowerValue))
          .slice(0, 5);
      
      default:
        return [];
    }
  };

  const updateSection = (section, data) => {
    setProposal((prev) => {
      // Create a deep copy of the previous state to avoid mutation issues
      const updatedProposal = {
        ...prev,
        sections: {
          ...prev.sections,
        },
        lastEdited: Date.now()
      };
      
      // Special handling for title page to update global RuM logo
      if (section === 'titlePage' && 'rumLogo' in data) {
        updatedProposal.rumLogo = data.rumLogo;
      }
      
      // Handle special case for companyFacts section to ensure annualRevenue is properly updated
      if (section === 'companyFacts' && 'annualRevenue' in data) {
        // Ensure we're working with a valid array
        const annualRevenue = Array.isArray(data.annualRevenue) 
          ? data.annualRevenue 
          : [];
          
        // Create a new section with all previous data
        updatedProposal.sections[section] = {
          ...prev.sections[section],
          ...data,
          // Ensure annualRevenue is properly structured
          annualRevenue: annualRevenue.map(item => ({
            year: item && typeof item.year === 'number' ? item.year : new Date().getFullYear(),
            amount: item && typeof item.amount === 'number' ? item.amount : 0
          }))
        };
      } else {
        // For other sections, perform a standard update
        updatedProposal.sections[section] = {
          ...prev.sections[section],
          ...data,
        };
      }
      
      return updatedProposal;
    });
  };

  // Add a new function to update the global RuM logo
  const updateRumLogo = (logo) => {
    setProposal((prev) => ({
      ...prev,
      rumLogo: logo,
      lastEdited: Date.now()
    }));
  };

  const resetProposal = () => {
    const newProposal = createEmptyProposal();
    newProposal.id = generateUniqueId();
    setProposal(newProposal);
    setCurrentSectionState(0);
    
    // Clear the draft from localStorage
    localStorage.removeItem('rum_draft_proposal');
    setIsDraftAvailable(false);
  };

  return (
    <ProposalContext.Provider value={{ 
      proposal, 
      setProposal, 
      updateSection, 
      updateRumLogo, 
      resetProposal,
      currentSection,
      setCurrentSection,
      autofillData,
      getAutofillSuggestions,
      saveCurrentProposal,
      loadDraftProposal,
      isDraftAvailable
    }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
};
