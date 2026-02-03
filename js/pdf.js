/**
 * PDF Generator
 * Handles PDF generation using html2pdf.js with multiple paper size support
 * Supports single bill and multiple bills in one PDF
 */

class PDFGenerator {
  constructor() {
    this.loadingOverlay = document.getElementById('loadingOverlay');

    // Paper size configurations optimized for single-page bills
    this.paperConfigs = {
      'a4': { format: 'a4', width: 210, height: 297, unit: 'mm', scale: 2 },
      'a5': { format: 'a5', width: 148, height: 210, unit: 'mm', scale: 2 },
      'letter': { format: 'letter', width: 215.9, height: 279.4, unit: 'mm', scale: 2 },
      'legal': { format: 'legal', width: 215.9, height: 355.6, unit: 'mm', scale: 2 },
      'half-letter': { format: [139.7, 215.9], width: 139.7, height: 215.9, unit: 'mm', scale: 2 },
      'thermal': { format: [80, 200], width: 80, height: 200, unit: 'mm', scale: 2 }
    };
  }

  /**
   * Show loading overlay
   */
  showLoading(message = 'Generating PDF...') {
    const loadingText = this.loadingOverlay.querySelector('.loading-text');
    if (loadingText) loadingText.textContent = message;
    this.loadingOverlay.classList.remove('hidden');
  }

  /**
   * Hide loading overlay
   */
  hideLoading() {
    this.loadingOverlay.classList.add('hidden');
  }

  /**
   * Generate and download single bill PDF
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

    // PDF options optimized for single page with no extra margins
    const pdfOptions = {
      margin: 0,
      filename: pdfFilename,
      image: {
        type: 'jpeg',
        quality: 0.95
      },
      html2canvas: {
        scale: paperConfig.scale,
        useCORS: true,
        letterRendering: true,
        logging: false,
        windowWidth: paperConfig.width * 3.78, // Convert mm to pixels (approx)
        windowHeight: paperConfig.height * 3.78
      },
      jsPDF: {
        unit: 'mm',
        format: paperConfig.format,
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: 'avoid-all' }
    };

    try {
      this.showLoading();

      // Clone element for PDF generation
      const clonedElement = element.cloneNode(true);
      clonedElement.style.width = paperConfig.width + 'mm';
      clonedElement.style.maxHeight = paperConfig.height + 'mm';
      clonedElement.style.overflow = 'hidden';
      clonedElement.style.boxShadow = 'none';

      // Adjust padding for smaller sizes
      if (paperSize === 'a5' || paperSize === 'half-letter') {
        clonedElement.style.padding = '8mm';
        clonedElement.style.fontSize = '10px';
      } else if (paperSize === 'thermal') {
        clonedElement.style.padding = '3mm';
        clonedElement.style.fontSize = '8px';
      } else {
        clonedElement.style.padding = '10mm';
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
   * Generate multiple bills in a single PDF
   * @param {Array} billElements - Array of bill HTML elements
   * @param {Object} options - PDF generation options
   */
  async generateMultiple(billElements, options = {}) {
    const {
      customerName = 'Customer',
      paperSize = 'a4'
    } = options;

    if (!billElements || billElements.length === 0) {
      alert('No bills to generate');
      return false;
    }

    // Create safe filename
    const safeName = customerName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const timestamp = new Date().toISOString().slice(0, 10);
    const pdfFilename = `${safeName}_${billElements.length}_bills_${timestamp}.pdf`;

    // Get paper configuration
    const paperConfig = this.paperConfigs[paperSize] || this.paperConfigs['a4'];

    try {
      this.showLoading(`Generating ${billElements.length} bills...`);

      // Create a container for all bills
      const container = document.createElement('div');
      container.style.width = paperConfig.width + 'mm';

      // Add each bill element
      billElements.forEach((el, index) => {
        const billWrapper = document.createElement('div');
        billWrapper.style.width = paperConfig.width + 'mm';
        billWrapper.style.height = paperConfig.height + 'mm';
        billWrapper.style.overflow = 'hidden';
        billWrapper.style.pageBreakAfter = index < billElements.length - 1 ? 'always' : 'auto';
        billWrapper.style.boxSizing = 'border-box';

        const clonedEl = el.cloneNode(true);
        clonedEl.style.boxShadow = 'none';
        clonedEl.style.margin = '0';
        clonedEl.style.width = '100%';
        clonedEl.style.minHeight = 'auto';
        clonedEl.style.maxHeight = paperConfig.height + 'mm';
        clonedEl.style.overflow = 'hidden';

        // Adjust padding based on paper size
        if (paperSize === 'a5' || paperSize === 'half-letter') {
          clonedEl.style.padding = '8mm';
          clonedEl.style.fontSize = '10px';
        } else if (paperSize === 'thermal') {
          clonedEl.style.padding = '3mm';
          clonedEl.style.fontSize = '8px';
        } else {
          clonedEl.style.padding = '10mm';
        }

        billWrapper.appendChild(clonedEl);
        container.appendChild(billWrapper);
      });

      // PDF options for multiple pages
      const pdfOptions = {
        margin: 0,
        filename: pdfFilename,
        image: {
          type: 'jpeg',
          quality: 0.95
        },
        html2canvas: {
          scale: paperConfig.scale,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: paperConfig.format,
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['css', 'legacy'], after: '.bill-page-break' }
      };

      // Temporarily add container to document for rendering
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // Generate PDF
      await html2pdf()
        .set(pdfOptions)
        .from(container)
        .save();

      // Clean up
      document.body.removeChild(container);

      this.hideLoading();
      return true;
    } catch (error) {
      console.error('Error generating multiple PDFs:', error);
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
