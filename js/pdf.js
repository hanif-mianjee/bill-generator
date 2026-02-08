/**
 * PDF Generator
 * Supports two modes:
 * 1. Print mode - uses browser's native print dialog (original behavior)
 * 2. Export mode - generates a real PDF file using html2pdf.js
 *
 * Each bill is placed on its own page. If a bill exceeds the selected
 * paper height, the page height is expanded to fit (no breaking).
 */

class PDFGenerator {
  constructor() {
    this.loadingOverlay = document.getElementById('loadingOverlay');

    // Paper size configurations (width/height in mm)
    this.paperConfigs = {
      'thermal': { width: 80, height: null, unit: 'mm' },
      'a4': { width: 210, height: 297, unit: 'mm' },
      'a5': { width: 148, height: 210, unit: 'mm' },
      'letter': { width: 215.9, height: 279.4, unit: 'mm' },
      'legal': { width: 215.9, height: 355.6, unit: 'mm' },
      'half-letter': { width: 139.7, height: 215.9, unit: 'mm' }
    };
  }

  showLoading(message = 'Preparing PDF...') {
    if (this.loadingOverlay) {
      const loadingText = this.loadingOverlay.querySelector('.loading-text');
      if (loadingText) loadingText.textContent = message;
      this.loadingOverlay.classList.remove('hidden');
    }
  }

  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }

  /**
   * Print mode - opens browser print dialog (original behavior)
   */
  async print(previewElement, options = {}) {
    const {
      customerName = 'Customer',
      paperSize = 'a4'
    } = options;

    this.showLoading('Preparing print preview...');

    try {
      const printWindow = window.open('', '_blank', 'width=900,height=700');

      if (!printWindow) {
        alert('Please allow pop-ups to download PDF');
        this.hideLoading();
        return false;
      }

      const paper = this.getPrintPageSize(paperSize);
      const stylesheets = this.getStylesheetLinks();
      const content = previewElement.cloneNode(true);

      content.querySelectorAll('.bill-label').forEach(label => label.remove());
      content.querySelectorAll('.bill-placeholder').forEach(el => el.remove());

      const printDocument = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bill - ${customerName}</title>
  ${stylesheets}
  <style>
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

    .bill-preview,
    .bill-preview-item {
      box-shadow: none !important;
      margin: 0 !important;
    }

    .bill-preview-item {
      page-break-after: always;
      page-break-inside: avoid;
    }

    .bill-preview-item:last-child {
      page-break-after: auto;
    }

    .bill-label {
      display: none !important;
    }

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

      printWindow.document.write(printDocument);
      printWindow.document.close();

      this.hideLoading();
      return true;

    } catch (error) {
      console.error('Error generating print:', error);
      this.hideLoading();
      alert('Error preparing print. Please try again.');
      return false;
    }
  }

  /**
   * Export mode - generates a real PDF file using html2pdf.js
   * Each bill gets its own page. Page height adapts to bill content.
   */
  async export(previewElement, options = {}) {
    const {
      customerName = 'Customer',
      paperSize = 'a4',
      billCount = 1
    } = options;

    if (typeof html2pdf === 'undefined') {
      alert('PDF library not loaded. Please check your internet connection and refresh.');
      return false;
    }

    this.showLoading('Generating PDF...');

    try {
      const paper = this.paperConfigs[paperSize] || this.paperConfigs['a4'];
      const pageWidthMm = paper.width;

      // Handle both single bills (no .bill-preview-item) and multiple bills
      let billItems = previewElement.querySelectorAll('.bill-preview-item');
      const isSingleBill = billItems.length === 0;

      if (isSingleBill) {
        // Single bill: the preview container itself is the bill
        billItems = [previewElement];
      }

      // Unique scope ID so override styles don't leak to main page
      const scopeId = 'pdf-export-' + Date.now();

      // Create offscreen container
      const offscreen = document.createElement('div');
      offscreen.id = scopeId;
      offscreen.style.cssText = `
        position: fixed; left: -9999px; top: 0;
        width: ${pageWidthMm}mm;
        background: white;
      `;
      document.body.appendChild(offscreen);

      // Scoped override styles (only affect elements inside #scopeId)
      const scopedStyle = document.createElement('style');
      scopedStyle.textContent = `
        #${scopeId} .bill-preview,
        #${scopeId} .bill-preview-item,
        #${scopeId} [data-template] {
          box-shadow: none !important;
          margin: 0 !important;
        }
        #${scopeId} .bill-label { display: none !important; }
        #${scopeId} .bill-placeholder { display: none !important; }
        #${scopeId} .bill-preview.multiple-bills { gap: 0 !important; }
      `;
      document.head.appendChild(scopedStyle);

      let pdf = null;

      for (let i = 0; i < billItems.length; i++) {
        this.showLoading(`Generating PDF... (${i + 1}/${billItems.length})`);

        const billClone = billItems[i].cloneNode(true);
        billClone.querySelectorAll('.bill-label').forEach(el => el.remove());
        billClone.querySelectorAll('.bill-placeholder').forEach(el => el.remove());

        // Wrapper to constrain width and measure height
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
          width: ${pageWidthMm}mm;
          background: white;
          overflow: visible;
        `;
        wrapper.appendChild(billClone);
        offscreen.appendChild(wrapper);

        // Let the browser lay out the content
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Measure the actual rendered height in mm
        const rect = wrapper.getBoundingClientRect();
        const pxPerMm = pageWidthMm > 0 ? rect.width / pageWidthMm : 3.7795;
        const contentHeightMm = rect.height / pxPerMm;

        // Determine page height: use paper height or expand to fit content
        let pageHeightMm;
        if (!paper.height) {
          pageHeightMm = contentHeightMm + 2;
        } else if (contentHeightMm > paper.height) {
          pageHeightMm = contentHeightMm + 2;
        } else {
          pageHeightMm = paper.height;
        }

        const opt = {
          margin: 0,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            width: rect.width,
            height: rect.height,
            windowWidth: rect.width
          },
          jsPDF: {
            unit: 'mm',
            format: [pageWidthMm, pageHeightMm],
            orientation: pageWidthMm > pageHeightMm ? 'landscape' : 'portrait'
          },
          pagebreak: { mode: 'avoid-all' }
        };

        if (i === 0) {
          const worker = html2pdf().set(opt).from(wrapper);
          pdf = await worker.toPdf().get('pdf');
        } else {
          const canvas = await html2pdf().set(opt).from(wrapper).toCanvas().get('canvas');
          const imgData = canvas.toDataURL('image/jpeg', 0.98);

          pdf.addPage([pageWidthMm, pageHeightMm]);
          pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMm, pageHeightMm);
        }

        offscreen.removeChild(wrapper);
      }

      // Save the PDF
      if (pdf) {
        const filename = billItems.length > 1
          ? `bills-${customerName.replace(/\s+/g, '-')}-${billItems.length}.pdf`
          : `bill-${customerName.replace(/\s+/g, '-')}.pdf`;
        pdf.save(filename);
      }

      // Cleanup: remove offscreen container and scoped style
      document.body.removeChild(offscreen);
      document.head.removeChild(scopedStyle);

      this.hideLoading();
      return true;

    } catch (error) {
      console.error('Error exporting PDF:', error);
      this.hideLoading();
      alert('Error generating PDF. Please try again.');
      return false;
    }
  }

  /**
   * Legacy generate method - maps to print for backward compatibility
   */
  async generate(previewElement, options = {}) {
    return this.print(previewElement, options);
  }

  /**
   * Get @page size string for print mode
   */
  getPrintPageSize(paperSize) {
    const configs = {
      'thermal': { width: '80mm', height: 'auto' },
      'a4': { width: '210mm', height: '297mm' },
      'a5': { width: '148mm', height: '210mm' },
      'letter': { width: '8.5in', height: '11in' },
      'legal': { width: '8.5in', height: '14in' },
      'half-letter': { width: '5.5in', height: '8.5in' }
    };
    return configs[paperSize] || configs['a4'];
  }

  /**
   * Get paper dimensions in mm (for external use)
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

  /**
   * Get stylesheet link tags for print window
   */
  getStylesheetLinks() {
    let links = '';
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const absoluteUrl = new URL(href, window.location.href).href;
        links += `<link rel="stylesheet" href="${absoluteUrl}">\n`;
      }
    });
    return links;
  }

}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFGenerator;
}
