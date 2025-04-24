import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProposal } from '../../contexts/ProposalContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const EnhancedPDFExport = () => {
  const { language, t } = useLanguage();
  const { proposal } = useProposal();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  // Function to optimize images before PDF generation
  const optimizeImages = async (element) => {
    // Find all images in the element
    const images = element.querySelectorAll('img');
    
    // Create an array of promises for image loading
    const imagePromises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails to load
        }
        
        // Set a max width for images to prevent oversized images
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        // Remove unnecessary attributes that might slow down rendering
        img.removeAttribute('srcset');
        img.removeAttribute('sizes');
        
        // Add loading="lazy" to improve performance
        img.setAttribute('loading', 'lazy');
      });
    });
    
    // Wait for all images to load
    await Promise.all(imagePromises);
    
    return element;
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setProgress(5);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Get PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Get all proposal sections
      const sections = document.querySelectorAll('.proposal-section');
      if (!sections.length) {
        throw new Error('No proposal sections found');
      }
      
      setProgress(10);
      
      // Process each section
      for (let i = 0; i < sections.length; i++) {
        // Update progress
        setProgress(10 + Math.floor((i / sections.length) * 80));
        
        // Create a clone of the section to avoid modifying the original
        const section = sections[i];
        const sectionClone = section.cloneNode(true);
        
        // Create a temporary container for the section
        const tempContainer = document.createElement('div');
        tempContainer.appendChild(sectionClone);
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);
        
        // Apply print styles
        sectionClone.classList.add('print-background');
        sectionClone.style.width = '210mm'; // A4 width
        sectionClone.style.minHeight = '297mm'; // A4 height
        sectionClone.style.padding = '20mm';
        sectionClone.style.boxSizing = 'border-box';
        sectionClone.style.position = 'relative';
        sectionClone.style.backgroundColor = '#ffffff';
        
        // Ensure background images are visible in PDF
        const backgroundDiv = sectionClone.querySelector('.section-background');
        if (backgroundDiv) {
          backgroundDiv.style.position = 'absolute';
          backgroundDiv.style.top = '0';
          backgroundDiv.style.left = '0';
          backgroundDiv.style.width = '100%';
          backgroundDiv.style.height = '100%';
          backgroundDiv.style.zIndex = '-1';
          backgroundDiv.style.printColorAdjust = 'exact';
          backgroundDiv.style.WebkitPrintColorAdjust = 'exact';
        }
        
        // Optimize images
        await optimizeImages(sectionClone);
        
        // Render section to canvas with higher quality
        const canvas = await html2canvas(sectionClone, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 210 * 3.78, // Convert mm to px (1mm ≈ 3.78px)
          windowHeight: 297 * 3.78
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
      
      setProgress(95);
      
      // Generate a meaningful filename
      const customerName = proposal.sections.titlePage?.customerName || 'Kunde';
      const projectNumber = proposal.sections.titlePage?.projectNumber || '';
      const dateStr = new Date().toISOString().split('T')[0];
      const fileName = `RuM_Project_${customerName.replace(/\s+/g, '_')}_${projectNumber ? projectNumber + '_' : ''}${dateStr}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      setProgress(100);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50';
      successMessage.textContent = t('pdf.success');
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md z-50';
      errorMessage.textContent = t('pdf.error') + ': ' + error.message;
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 5000);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div ref={containerRef}>
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
    </div>
  );
};

export default EnhancedPDFExport;
