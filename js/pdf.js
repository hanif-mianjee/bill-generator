/**
 * PDF Generator
 * Handles PDF generation using html2pdf.js with multiple paper size support
 */

class PDFGenerator {
  constructor() {
    this.loadingOverlay = document.getElementById('loadingOverlay');

    // Paper size configurations
    this.paperConfigs = {
      'a4': { format: 'a4', width: 210, height: 297, unit: 'mm' },
      'a5': { format: 'a5', width: 148, height: 210, unit: 'mm' },
      'letter': { format: 'letter', width: 215.9, height: 279.4, unit: 'mm' },
      'legal': { format: 'legal', width: 215.9, height: 355.6, unit: 'mm' },
      'half-letter': { format: [139.7, 215.9], width: 139.7, height: 215.9, unit: 'mm' }
    };
  }

  /**
   * Show loading overlay
   */
  showLoading() {
    this.loadingOverlay.classList.remove('hidden');
  }

  /**
   * Hide loading overlay
   */
  hideLoading() {
    this.loadingOverlay.classList.add('hidden');
  }

  /**
   * Generate and download PDF
   */
  async generate(element, options = {}) {
    const {
      customerName = 'Customer',
      billNumber = 'INV-000000',
      paperSize = 'a4'
    } = options;

    // Create safe filename
    const safeName = customerName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const pdfFilename = `${safeName}_${billNumber}.pdf`;

    // Get paper configuration
    const paperConfig = this.paperConfigs[paperSize] || this.paperConfigs['a4'];

    // PDF options
    const pdfOptions = {
      margin: 0,
      filename: pdfFilename,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: paperConfig.format,
        orientation: 'portrait'
      }
    };

    try {
      this.showLoading();

      // Clone element and apply paper size styling
      const clonedElement = element.cloneNode(true);

      // Apply paper-specific styling
      clonedElement.style.width = paperConfig.width + 'mm';
      clonedElement.style.minHeight = paperConfig.height + 'mm';

      // Adjust padding for smaller sizes
      if (paperSize === 'a5' || paperSize === 'half-letter') {
        clonedElement.style.padding = '8mm';
        clonedElement.style.fontSize = '10px';
      } else {
        clonedElement.style.padding = '15mm';
      }

      // Generate PDF
      await html2pdf()
        .set(pdfOptions)
        .from(element)
        .save();

      this.hideLoading();
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.hideLoading();
      alert('Error generating PDF. Please try again.');
      return false;
    }
  }

  /**
   * Get paper dimensions for preview
   */
  getPaperDimensions(paperSizeId) {
    return this.paperConfigs[paperSizeId] || this.paperConfigs['a4'];
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
