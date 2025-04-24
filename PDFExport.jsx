import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PDFExport = ({ proposalId, children }) => {
  const { t, language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setProgress(10);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Get all proposal sections
      const sections = document.querySelectorAll('.proposal-section');
      if (!sections.length) {
        throw new Error('No proposal sections found');
      }
      
      setProgress(20);
      
      // Process each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Update progress
        setProgress(20 + Math.floor((i / sections.length) * 60));
        
        // Create a clone of the section to avoid modifying the original
        const sectionClone = section.cloneNode(true);
        const tempContainer = document.createElement('div');
        tempContainer.appendChild(sectionClone);
        document.body.appendChild(tempContainer);
        
        // Apply print styles
        sectionClone.classList.add('print-background');
        
        // Render section to canvas
        const canvas = await html2canvas(sectionClone, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false
        });
        
        // Remove temp container
        document.body.removeChild(tempContainer);
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        // Add new page if not the first section
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate aspect ratio to fit the page
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        
        // Center the image on the page
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;
        
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
      }
      
      setProgress(90);
      
      // Save the PDF
      pdf.save(`rum_proposal_${proposalId || 'export'}.pdf`);
      
      setProgress(100);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md';
      successMessage.textContent = t('pdf.success');
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md';
      errorMessage.textContent = t('pdf.error');
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`px-4 py-2 rounded-md text-white ${
          isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
        }`}
      >
        {isGenerating ? t('pdf.generating') : t('common.createPDF')}
      </button>
      
      {isGenerating && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">{progress}%</p>
        </div>
      )}
      
      {/* Hidden container for PDF content */}
      <div className="hidden">
        {children}
      </div>
    </div>
  );
};

export default PDFExport;
