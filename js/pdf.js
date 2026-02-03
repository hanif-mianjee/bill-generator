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

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);
    
    // Create a temporary container with proper styling
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: ${paperConfig.width}mm;
      background: white;
      z-index: 999999;
      opacity: 0;
      pointer-events: none;
    `;
    
    // Ensure cloned element has proper display
    clonedElement.style.cssText = `
      width: 100%;
      background: white;
      display: block;
      visibility: visible;
    `;
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // PDF options optimized for single page
    const pdfOptions = {
      margin: [2, 2, 2, 2],
      filename: pdfFilename,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: paperConfig.scale,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: tempContainer.offsetWidth,
        windowHeight: tempContainer.offsetHeight,
        scrollX: 0,
        scrollY: 0
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

      // Wait for any async rendering to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate PDF from cloned element
      await html2pdf()
        .set(pdfOptions)
        .from(clonedElement)
        .save();

      // Clean up
      document.body.removeChild(tempContainer);

      this.hideLoading();
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Clean up on error
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
      this.hideLoading();
      alert('Error generating PDF. Please try again.');
      return false;
    }
  }

  /**
   * Generate PDF from a container with multiple bills
   * @param {HTMLElement} container - Container with bill HTML
   * @param {Object} options - PDF generation options
   */
  async generateFromContainer(container, options = {}) {
    const {
      customerName = 'Customer',
      billCount = 1,
      paperSize = 'a4'
    } = options;

    // Create safe filename
    const safeName = customerName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const timestamp = new Date().toISOString().slice(0, 10);
    const pdfFilename = `${safeName}_${billCount}_bills_${timestamp}.pdf`;

    // Get paper configuration
    const paperConfig = this.paperConfigs[paperSize] || this.paperConfigs['a4'];

    // PDF options for multiple pages
    const pdfOptions = {
      margin: 0,
      filename: pdfFilename,
      image: {
        type: 'jpeg',
        quality: 0.98
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
      pagebreak: {
        mode: ['css', 'legacy'],
        before: '.bill-page',
        avoid: ['tr', 'td', '.totals-section']
      }
    };

    try {
      // Generate PDF
      await html2pdf()
        .set(pdfOptions)
        .from(container)
        .save();

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
