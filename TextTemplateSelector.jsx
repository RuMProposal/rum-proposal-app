import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const TextTemplateSelector = ({
  sectionName,
  onTemplateSelect,
  initialText = '',
  label
}) => {
  const { language } = useLanguage();
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [customText, setCustomText] = useState(initialText);
  const [isCustom, setIsCustom] = useState(false);
  const [uploadedTemplates, setUploadedTemplates] = useState([]);
  const [combinedText, setCombinedText] = useState(initialText);
  const fileInputRef = useRef(null);

  // Load saved templates from localStorage on component mount
  useEffect(() => {
    const savedUploadedTemplates = localStorage.getItem(`uploadedTemplates_${sectionName}`);
    if (savedUploadedTemplates) {
      try {
        const parsedTemplates = JSON.parse(savedUploadedTemplates);
        setUploadedTemplates(parsedTemplates);
      } catch (error) {
        console.error('Error parsing saved templates:', error);
      }
    }
    
    // Initialize with initial text if provided
    if (initialText) {
      setCombinedText(initialText);
      setCustomText(initialText);
    }
  }, [sectionName, initialText]);

  // Define templates based on section and language
  const getTemplates = () => {
    const templates = {
      companyIntroduction: {
        de: [
          "RuM Project ist ein erfahrener Generalunternehmer für Ausbauprojekte. Wir übersetzen die Wünsche internationaler Marken und Unternehmen in deutsche Realitäten.",
          "Als inhabergeführtes Unternehmen realisieren wir seit Jahrzehnten komplexe individuelle Raumkonzepte – termingerecht, ohne Hektik und im Budgetrahmen.",
          "Mit unserem Handwerk und exzellentem Projektmanagement garantieren wir den Erfolg Ihres Projektes – Hassle Free, On Time, On Budget."
        ],
        en: [
          "RuM Project is an experienced general contractor for interior construction projects. We translate the wishes of international brands and companies into German realities.",
          "As an owner-managed company, we have been implementing complex individual space concepts for decades - on time, without hectic and within budget.",
          "With our craftsmanship and excellent project management, we guarantee the success of your project - Hassle Free, On Time, On Budget."
        ]
      },
      services: {
        de: [
          "Unsere Dienstleistungen umfassen die komplette Planung und Umsetzung von Innenausbauprojekten, von der ersten Idee bis zur schlüsselfertigen Übergabe.",
          "Wir bieten maßgeschneiderte Raumlösungen für Büros, Einzelhandel, Gastronomie und öffentliche Einrichtungen.",
          "Unser Leistungsspektrum reicht von der Beratung über die Planung bis zur Realisierung komplexer Bauprojekte."
        ],
        en: [
          "Our services include the complete planning and implementation of interior construction projects, from the initial idea to turnkey handover.",
          "We offer customized space solutions for offices, retail, gastronomy and public facilities.",
          "Our range of services extends from consulting and planning to the realization of complex construction projects."
        ]
      },
      qualityManagement: {
        de: [
          "Unser Qualitätsmanagement basiert auf jahrzehntelanger Erfahrung und kontinuierlicher Verbesserung unserer Prozesse.",
          "Wir arbeiten nach höchsten Qualitätsstandards und setzen auf nachhaltige Materialien und Bauweisen.",
          "Regelmäßige Kontrollen und transparente Kommunikation garantieren die Einhaltung aller Qualitätsvorgaben."
        ],
        en: [
          "Our quality management is based on decades of experience and continuous improvement of our processes.",
          "We work according to the highest quality standards and rely on sustainable materials and construction methods.",
          "Regular inspections and transparent communication guarantee compliance with all quality specifications."
        ]
      },
      projectExecution: {
        de: [
          "Die Projektausführung erfolgt durch unser erfahrenes Team von Fachleuten, die alle Gewerke koordinieren und überwachen.",
          "Wir setzen auf digitale Projektabwicklung mit PROCORE, um maximale Transparenz und Effizienz zu gewährleisten.",
          "Unser 360° Dokumentationssystem ermöglicht eine lückenlose Überwachung aller Bauphasen."
        ],
        en: [
          "Project execution is carried out by our experienced team of professionals who coordinate and monitor all trades.",
          "We rely on digital project management with PROCORE to ensure maximum transparency and efficiency.",
          "Our 360° documentation system enables seamless monitoring of all construction phases."
        ]
      },
      safety: {
        de: [
          "Arbeitssicherheit hat bei uns höchste Priorität. Alle Mitarbeiter werden regelmäßig geschult und sensibilisiert.",
          "Unsere Baustellen entsprechen den höchsten Sicherheitsstandards und werden regelmäßig kontrolliert.",
          "Präventive Maßnahmen und klare Sicherheitsrichtlinien sorgen für ein sicheres Arbeitsumfeld."
        ],
        en: [
          "Occupational safety is our top priority. All employees are regularly trained and sensitized.",
          "Our construction sites meet the highest safety standards and are regularly inspected.",
          "Preventive measures and clear safety guidelines ensure a safe working environment."
        ]
      },
      references: {
        de: [
          "Unsere Referenzprojekte zeigen unsere Expertise und Erfahrung in verschiedenen Branchen.",
          "Wir haben erfolgreich Projekte für namhafte Kunden in ganz Deutschland realisiert.",
          "Jedes Projekt wird mit höchster Präzision und Qualität umgesetzt."
        ],
        en: [
          "Our reference projects demonstrate our expertise and experience in various industries.",
          "We have successfully implemented projects for renowned clients throughout Germany.",
          "Each project is implemented with the highest precision and quality."
        ]
      },
      companyFacts: {
        de: [
          "RuM Project ist ein führender Generalunternehmer im Bereich Innenausbau mit langjähriger Erfahrung.",
          "Unsere Finanzkraft und Bonität garantieren die sichere Abwicklung auch großer Projekte.",
          "Mit einem stetig wachsenden Team aus internen und externen Spezialisten realisieren wir Projekte in ganz Deutschland."
        ],
        en: [
          "RuM Project is a leading general contractor in interior construction with many years of experience.",
          "Our financial strength and creditworthiness guarantee the secure handling of even large projects.",
          "With a steadily growing team of internal and external specialists, we implement projects throughout Germany."
        ]
      },
      timeline: {
        de: [
          "Unser Bauzeitenplan wird mit modernsten Projektmanagement-Tools erstellt und kontinuierlich überwacht.",
          "Wir garantieren die termingerechte Fertigstellung durch effiziente Prozesse und vorausschauende Planung.",
          "Regelmäßige Updates und transparente Kommunikation halten Sie stets über den Projektfortschritt informiert."
        ],
        en: [
          "Our construction schedule is created with state-of-the-art project management tools and continuously monitored.",
          "We guarantee on-time completion through efficient processes and forward-looking planning.",
          "Regular updates and transparent communication keep you informed about project progress at all times."
        ]
      },
      siteLogistics: {
        de: [
          "Unsere Baustellenlogistik wird individuell auf die Anforderungen Ihres Projekts abgestimmt.",
          "Wir koordinieren alle Gewerke und Materiallieferungen für einen reibungslosen Bauablauf.",
          "Durch präzise Planung minimieren wir Störungen und maximieren die Effizienz auf der Baustelle."
        ],
        en: [
          "Our site logistics are individually tailored to the requirements of your project.",
          "We coordinate all trades and material deliveries for a smooth construction process.",
          "Through precise planning, we minimize disruptions and maximize efficiency on the construction site."
        ]
      },
      offer: {
        de: [
          "Unser Angebot umfasst alle Leistungen für die schlüsselfertige Realisierung Ihres Projekts.",
          "Transparente Kostenaufstellung ohne versteckte Kosten oder Nachträge.",
          "Wir garantieren Budgetsicherheit durch detaillierte Planung und professionelles Projektmanagement."
        ],
        en: [
          "Our offer includes all services for the turnkey realization of your project.",
          "Transparent cost breakdown without hidden costs or supplements.",
          "We guarantee budget security through detailed planning and professional project management."
        ]
      }
    };

    return templates[sectionName]?.[language] || [];
  };

  const templates = getTemplates();

  // Update combined text whenever selected templates change
  useEffect(() => {
    if (isCustom) {
      setCombinedText(customText);
      onTemplateSelect(customText);
    } else {
      const newCombinedText = selectedTemplates.join('\n\n');
      setCombinedText(newCombinedText);
      onTemplateSelect(newCombinedText);
    }
  }, [selectedTemplates, customText, isCustom, onTemplateSelect]);

  const handleTemplateToggle = (template) => {
    setIsCustom(false);
    
    // Check if template is already selected
    if (selectedTemplates.includes(template)) {
      // Remove template
      setSelectedTemplates(selectedTemplates.filter(t => t !== template));
    } else {
      // Add template
      setSelectedTemplates([...selectedTemplates, template]);
    }
  };

  const handleCustomTextChange = (e) => {
    const value = e.target.value;
    setCustomText(value);
    setIsCustom(true);
    setSelectedTemplates([]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Only accept text files
    if (!file.type.match('text.*') && !file.name.endsWith('.txt')) {
      alert(language === 'de' 
        ? 'Bitte laden Sie nur Textdateien hoch (.txt)' 
        : 'Please upload only text files (.txt)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        // Add to uploaded templates
        const newUploadedTemplates = [...uploadedTemplates, content];
        setUploadedTemplates(newUploadedTemplates);
        
        // Save to localStorage for future use
        localStorage.setItem(`uploadedTemplates_${sectionName}`, JSON.stringify(newUploadedTemplates));
        
        // Add to selected templates
        setIsCustom(false);
        setSelectedTemplates([...selectedTemplates, content]);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const clearAllSelections = () => {
    setSelectedTemplates([]);
    setIsCustom(false);
    setCombinedText('');
    onTemplateSelect('');
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium mb-3">{label || (language === 'de' ? 'Textvorlagen' : 'Text Templates')}</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">
            {language === 'de' ? 'Textvorlagen auswählen' : 'Select Text Templates'}
          </label>
          <button
            type="button"
            onClick={clearAllSelections}
            className="text-sm text-red-500 hover:text-red-700"
          >
            {language === 'de' ? 'Alle löschen' : 'Clear all'}
          </button>
        </div>
        
        {/* Predefined templates */}
        <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded">
          {templates.map((template, index) => (
            <div key={index} className="flex items-start">
              <input
                type="checkbox"
                id={`template-${sectionName}-${index}`}
                checked={selectedTemplates.includes(template)}
                onChange={() => handleTemplateToggle(template)}
                className="mt-1 mr-2"
              />
              <label htmlFor={`template-${sectionName}-${index}`} className="text-sm cursor-pointer">
                {template.substring(0, 100)}...
              </label>
            </div>
          ))}
          
          {/* Uploaded templates */}
          {uploadedTemplates.map((template, index) => (
            <div key={`uploaded-${index}`} className="flex items-start">
              <input
                type="checkbox"
                id={`uploaded-${sectionName}-${index}`}
                checked={selectedTemplates.includes(template)}
                onChange={() => handleTemplateToggle(template)}
                className="mt-1 mr-2"
              />
              <label htmlFor={`uploaded-${sectionName}-${index}`} className="text-sm cursor-pointer">
                <span className="font-medium text-primary">
                  {language === 'de' ? 'Hochgeladene Vorlage ' : 'Uploaded Template '} {index + 1}:
                </span> {template.substring(0, 80)}...
              </label>
            </div>
          ))}
          
          {templates.length === 0 && uploadedTemplates.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              {language === 'de' ? 'Keine Vorlagen verfügbar' : 'No templates available'}
            </p>
          )}
        </div>
        
        {/* Upload button */}
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept=".txt,text/plain"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {language === 'de' ? 'Textdatei hochladen' : 'Upload Text File'}
          </button>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'de' 
              ? 'Unterstützt .txt Dateien. Hochgeladene Vorlagen werden für zukünftige Proposals gespeichert.' 
              : 'Supports .txt files. Uploaded templates will be saved for future proposals.'}
          </p>
        </div>
        
        {/* Custom text input */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`use-custom-text-${sectionName}`}
              checked={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.checked);
                if (e.target.checked) {
                  setSelectedTemplates([]);
                }
              }}
              className="mr-2"
            />
            <label htmlFor={`use-custom-text-${sectionName}`} className="text-sm font-medium">
              {language === 'de' ? 'Eigenen Text verwenden' : 'Use custom text'}
            </label>
          </div>
          
          <textarea
            className={`w-full p-2 border border-gray-300 rounded h-32 ${isCustom ? '' : 'bg-gray-100'}`}
            value={isCustom ? customText : ''}
            onChange={handleCustomTextChange}
            placeholder={language === 'de' ? 'Geben Sie Ihren Text ein...' : 'Enter your text...'}
            disabled={!isCustom}
          />
        </div>
        
        {/* Preview of combined text */}
        <div>
          <h4 className="text-sm font-medium mb-2">
            {language === 'de' ? 'Vorschau' : 'Preview'}
          </h4>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
            {combinedText ? (
              <div className="whitespace-pre-wrap">{combinedText}</div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                {language === 'de' ? 'Keine Inhalte ausgewählt' : 'No content selected'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextTemplateSelector;
