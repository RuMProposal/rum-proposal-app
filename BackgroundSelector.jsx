import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const BackgroundSelector = ({ onBackgroundChange, initialBackground = { url: '', opacity: 0.1 } }) => {
  const { t, language } = useLanguage();
  const [selectedBackground, setSelectedBackground] = useState(initialBackground.url);
  const [opacity, setOpacity] = useState(initialBackground.opacity);
  const [uploadedBackgrounds, setUploadedBackgrounds] = useState([]);
  const fileInputRef = useRef(null);

  // Predefined backgrounds from corporate identity
  const predefinedBackgrounds = [
    '/assets/backgrounds/rum_background_1.jpeg',
    '/assets/backgrounds/rum_background_2.jpeg',
    '/assets/backgrounds/rum_background_3.jpeg',
    '/assets/backgrounds/rum_background_4.jpeg',
    '/assets/backgrounds/rum_background_5.jpeg',
  ];

  const handleBackgroundSelect = (bgUrl) => {
    setSelectedBackground(bgUrl);
    onBackgroundChange({ url: bgUrl, opacity });
  };

  const handleOpacityChange = (e) => {
    const newOpacity = parseFloat(e.target.value);
    setOpacity(newOpacity);
    if (selectedBackground) {
      onBackgroundChange({ url: selectedBackground, opacity: newOpacity });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result;
        if (url) {
          setUploadedBackgrounds(prev => [...prev, url]);
          setSelectedBackground(url);
          onBackgroundChange({ url, opacity });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium mb-3">
        {language === 'de' ? 'Hintergrund auswählen' : 'Select Background'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'de' ? 'Vordefinierte Hintergründe' : 'Predefined Backgrounds'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {predefinedBackgrounds.map((bg, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 rounded overflow-hidden h-24 ${selectedBackground === bg ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => handleBackgroundSelect(bg)}
              >
                <img 
                  src={bg} 
                  alt={`Background ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {uploadedBackgrounds.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'de' ? 'Hochgeladene Hintergründe' : 'Uploaded Backgrounds'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {uploadedBackgrounds.map((bg, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer border-2 rounded overflow-hidden h-24 ${selectedBackground === bg ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => handleBackgroundSelect(bg)}
                >
                  <img 
                    src={bg} 
                    alt={`Uploaded Background ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            {language === 'de' ? 'Eigenen Hintergrund hochladen' : 'Upload Custom Background'}
          </button>
        </div>
        
        {selectedBackground && (
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'de' ? `Deckkraft: ${Math.round(opacity * 100)}%` : `Opacity: ${Math.round(opacity * 100)}%`}
            </label>
            <input
              type="range"
              min="0.05"
              max="0.5"
              step="0.05"
              value={opacity}
              onChange={handleOpacityChange}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSelector;
