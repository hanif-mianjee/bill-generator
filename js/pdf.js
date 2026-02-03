/**
 * PDF Generator
 * Uses browser's native print functionality for reliable PDF generation
 * Simply uses the existing preview exactly as it appears
 */

class PDFGenerator {
  constructor() {
    this.loadingOverlay = document.getElementById('loadingOverlay');
    
    // Paper size configurations for @page CSS
    this.paperConfigs = {
      'thermal': { width: '80mm', height: 'auto' },
      'a4': { width: '210mm', height: '297mm' },
      'a5': { width: '148mm', height: '210mm' },
      'letter': { width: '8.5in', height: '11in' },
      'legal': { width: '8.5in', height: '14in' },
      'half-letter': { width: '5.5in', height: '8.5in' }
    };
  }

  /**
   * Show loading overlay
   */
  showLoading(message = 'Preparing PDF...') {
    if (this.loadingOverlay) {
      const loadingText = this.loadingOverlay.querySelector('.loading-text');
      if (loadingText) loadingText.textContent = message;
      this.loadingOverlay.classList.remove('hidden');
    }
  }

  /**
   * Hide loading overlay
   */
  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }

  /**
   * Generate PDF by opening print dialog
   * Uses the preview exactly as it appears
   * 
   * @param {HTMLElement} previewElement - The bill preview element
   * @param {Object} options - Generation options
   */
  async generate(previewElement, options = {}) {
    const { 
      customerName = 'Customer',
      paperSize = 'a4'
    } = options;

    this.showLoading('Preparing print preview...');

    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank', 'width=900,height=700');
      
      if (!printWindow) {
        alert('Please allow pop-ups to download PDF');
        this.hideLoading();
        return false;
      }

      // Get paper config for dynamic page size
      const paper = this.paperConfigs[paperSize] || this.paperConfigs['a4'];

      // Get all stylesheets from the main document
      const stylesheets = this.getStylesheetLinks();
      
      // Clone the preview content
      const content = previewElement.cloneNode(true);
      
      // Remove any label overlays for printing
      content.querySelectorAll('.bill-label').forEach(label => label.remove());
      content.querySelectorAll('.bill-placeholder').forEach(el => el.remove());

      // Build the print document - use exact same stylesheets
      const printDocument = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bill - ${customerName}</title>
  ${stylesheets}
  <style>
    /* Dynamic page size based on selected paper */
    @page {
      size: ${paper.width} ${paper.height};
      margin: 0;
    }
    
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      background: white;
    }
    
    /* Remove shadows for print */
    .bill-preview,
    .bill-preview-item {
      box-shadow: none !important;
      margin: 0 !important;
    }
    
    /* Page breaks for multiple bills */
    .bill-preview-item {
      page-break-after: always;
      page-break-inside: avoid;
    }
    
    .bill-preview-item:last-child {
      page-break-after: auto;
    }
    
    /* Hide labels */
    .bill-label {
      display: none !important;
    }
    
    /* For multiple bills container, reset the gap */
    .bill-preview.multiple-bills {
      gap: 0 !important;
    }
  </style>
</head>
<body>
  ${content.outerHTML}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.onafterprint = function() {
          window.close();
        };
        setTimeout(function() {
          window.close();
        }, 1000);
      }, 300);
    };
  </script>
</body>
</html>`;

      // Write to the print window
      printWindow.document.write(printDocument);
      printWindow.document.close();

      this.hideLoading();
      return true;

    } catch (error) {
      console.error('Error generating PDF:', error);
      this.hideLoading();
      alert('Error preparing PDF. Please try again.');
      return false;
    }
  }

  /**
   * Get stylesheet link tags to include in print window
   */
  getStylesheetLinks() {
    let links = '';
    
    // Get all linked stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        // Convert relative URLs to absolute
        const absoluteUrl = new URL(href, window.location.href).href;
        links += `<link rel="stylesheet" href="${absoluteUrl}">\n`;
      }
    });
    
    return links;
  }

  /**
   * Get paper dimensions for preview (kept for compatibility)
   */
  getPaperDimensions(paperSizeId) {
    const configs = {
      'thermal': { width: 80, height: 200 },
      'a4': { width: 210, height: 297 },
      'a5': { width: 148, height: 210 },
      'letter': { width: 215.9, height: 279.4 },
      'legal': { width: 215.9, height: 355.6 },
      'half-letter': { width: 139.7, height: 215.9 }
    };
    return configs[paperSizeId] || configs['a4'];
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
