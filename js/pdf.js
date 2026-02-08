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
   * Each bill gets its own page. If a bill exceeds the paper height,
   * the page height expands to fit (no breaking a single bill).
   *
   * Approach: open a popup window with the bill HTML + stylesheets +
   * html2pdf.js, then run the export inside that window where the
   * content is inline and visible (html2canvas requires normal document
   * flow — it produces 0-height canvases for fixed/absolute elements).
   * The popup processes each bill, builds the PDF, triggers a download
   * via the opener window, then closes itself.
   */
  async export(previewElement, options = {}) {
    const {
      customerName = 'Customer',
      paperSize = 'a4',
      billCount = 1
    } = options;

    this.showLoading('Generating PDF...');

    try {
      const paper = this.paperConfigs[paperSize] || this.paperConfigs['a4'];
      const pageWidthMm = paper.width;
      const pageHeightMm = paper.height;

      // Clone and clean preview content
      const content = previewElement.cloneNode(true);
      content.querySelectorAll('.bill-label').forEach(el => el.remove());
      content.querySelectorAll('.bill-placeholder').forEach(el => el.remove());

      // Ensure single bills are wrapped in .bill-preview-item for uniform handling
      const hasItems = content.querySelectorAll('.bill-preview-item').length > 0;
      if (!hasItems) {
        // Single bill — wrap inner content in a .bill-preview-item
        const wrapper = document.createElement('div');
        wrapper.className = 'bill-preview-item';
        wrapper.setAttribute('data-template', content.getAttribute('data-template') || '');
        wrapper.setAttribute('data-paper-size', content.getAttribute('data-paper-size') || '');
        while (content.firstChild) {
          wrapper.appendChild(content.firstChild);
        }
        content.appendChild(wrapper);
      }

      const stylesheets = this.getStylesheetLinks();
      const html2pdfCDN = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';

      // Build the export document for the popup window
      // The popup body is set to exactly the paper width so html2canvas
      // captures the element at the correct size — no wider, no narrower.
      const exportDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Exporting PDF...</title>
  ${stylesheets}
  <style>
    /* Lock the viewport to the exact paper width */
    html, body {
      margin: 0;
      padding: 0;
      background: white;
      width: ${pageWidthMm}mm;
      overflow-x: hidden;
    }

    /* Force bill containers to fill the paper width exactly */
    .bill-preview {
      width: ${pageWidthMm}mm !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      max-height: none !important;
      gap: 0 !important;
    }

    .bill-preview-item {
      display: none;
      width: ${pageWidthMm}mm !important;
      max-height: none !important;
      box-shadow: none !important;
      margin: 0 !important;
      border-radius: 0 !important;
      overflow: visible !important;
      box-sizing: border-box !important;
    }

    .bill-preview-item.pdf-active {
      display: block;
    }

    .bill-label {
      display: none !important;
    }

    #status {
      position: fixed; top: 0; left: 0; right: 0;
      background: #1e293b; color: white;
      padding: 12px 20px; font-family: sans-serif; font-size: 14px;
      z-index: 9999;
    }
  </style>
</head>
<body>
  <div id="status">Preparing export...</div>
  ${content.outerHTML}
  <script src="${html2pdfCDN}"><\/script>
  <script>
    (async function() {
      const status = document.getElementById('status');
      const pageWidthMm = ${pageWidthMm};
      const paperHeightMm = ${pageHeightMm || 'null'};
      const customerName = ${JSON.stringify(customerName)};

      // Wait for stylesheets to load
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      await Promise.all(Array.from(links).map(link =>
        new Promise(resolve => {
          if (link.sheet) return resolve();
          link.onload = resolve;
          link.onerror = resolve;
        })
      ));

      // Wait for html2pdf to load
      while (typeof html2pdf === 'undefined') {
        await new Promise(r => setTimeout(r, 100));
      }

      await new Promise(r => setTimeout(r, 200));

      // Hide status bar before rendering so it doesn't interfere
      const billItems = document.querySelectorAll('.bill-preview-item');
      if (billItems.length === 0) {
        status.textContent = 'No bills found.';
        setTimeout(() => window.close(), 2000);
        return;
      }

      let pdf = null;

      for (let i = 0; i < billItems.length; i++) {
        status.textContent = 'Generating PDF... (' + (i + 1) + '/' + billItems.length + ')';

        // Show only this bill
        billItems.forEach(el => el.classList.remove('pdf-active'));
        billItems[i].classList.add('pdf-active');

        await new Promise(r => setTimeout(r, 100));

        // Hide status bar during canvas capture
        status.style.display = 'none';

        const el = billItems[i];

        // Pre-render to canvas to measure actual content height
        const measureCanvas = await html2pdf().set({
          margin: 0,
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: [pageWidthMm, 5000], orientation: 'portrait' }
        }).from(el).toCanvas().get('canvas');

        // Derive page height from actual canvas content
        const imgHeightMm = (measureCanvas.height / measureCanvas.width) * pageWidthMm;
        let thisPageHeight;
        if (!paperHeightMm) {
          thisPageHeight = imgHeightMm + 1;
        } else {
          thisPageHeight = Math.max(paperHeightMm, imgHeightMm + 1);
        }

        const opt = {
          margin: 0,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
          },
          jsPDF: {
            unit: 'mm',
            format: [pageWidthMm, thisPageHeight],
            orientation: pageWidthMm > thisPageHeight ? 'landscape' : 'portrait'
          },
          pagebreak: { mode: 'avoid-all' }
        };

        if (i === 0) {
          pdf = await html2pdf().set(opt).from(el).toPdf().get('pdf');
          // Remove any extra pages html2pdf may have added
          const totalPages = pdf.getNumberOfPages();
          for (let p = totalPages; p > 1; p--) {
            pdf.deletePage(p);
          }
        } else {
          const imgData = measureCanvas.toDataURL('image/jpeg', 0.98);
          pdf.addPage([pageWidthMm, thisPageHeight]);
          pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMm, imgHeightMm);
        }

        status.style.display = '';
      }

      if (pdf) {
        status.textContent = 'Saving PDF...';
        const count = billItems.length;
        const safeName = customerName.replace(/\\s+/g, '-');
        const filename = count > 1
          ? 'bills-' + safeName + '-' + count + '.pdf'
          : 'bill-' + safeName + '.pdf';
        pdf.save(filename);
      }

      status.textContent = 'Done! You can close this window.';
      setTimeout(() => window.close(), 1500);
    })();
  <\/script>
</body>
</html>`;

      // Open popup sized to fit the paper width (px ≈ mm * 3.78 + window chrome)
      const popupWidth = Math.max(Math.ceil(pageWidthMm * 3.78) + 40, 400);
      const popup = window.open('', '_blank', `width=${popupWidth},height=700`);
      if (!popup) {
        alert('Please allow pop-ups to export PDF');
        this.hideLoading();
        return false;
      }

      popup.document.write(exportDoc);
      popup.document.close();

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
