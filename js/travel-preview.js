/**
 * Travel Bill Preview Renderer
 * Renders travel bill preview with selected travel items and agency info
 * Mirrors BillPreview but with travel-specific layout
 */

class TravelBillPreview {
  constructor() {
    this.container = document.getElementById('travelBillPreview');
    this.billNumbers = [this.generateBillNumber()];
    this.currentTemplateId = 'thermal-print';
    this.currentPaperSize = 'thermal';
  }

  /**
   * Generate unique bill number with TKT prefix
   */
  generateBillNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TKT-${year}${month}${day}-${random}`;
  }

  /**
   * Regenerate bill number(s)
   */
  regenerateBillNumber(count = 1) {
    this.billNumbers = [];
    for (let i = 0; i < count; i++) {
      this.billNumbers.push(this.generateBillNumber());
    }
    return this.billNumbers[0];
  }

  /**
   * Format currency
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('PKR', 'Rs.');
  }

  /**
   * Format date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Generate a date offset from base date
   */
  generateBillDate(baseDate, index, strategy = 'sequential') {
    const date = new Date(baseDate);

    if (strategy === 'same') {
      return date.toISOString().split('T')[0];
    } else if (strategy === 'sequential') {
      const daysApart = Math.floor(Math.random() * 6) + 10;
      const daysBack = index * daysApart;
      date.setDate(date.getDate() - daysBack);
      return date.toISOString().split('T')[0];
    } else if (strategy === 'random') {
      const daysBack = Math.floor(Math.random() * 31);
      date.setDate(date.getDate() - daysBack);
      return date.toISOString().split('T')[0];
    }

    return date.toISOString().split('T')[0];
  }

  /**
   * Render single bill preview
   */
  render(data) {
    const { customerName, billDate, selectedItems, agency, totalAmount } = data;

    if (!customerName || !agency || !selectedItems || selectedItems.length === 0) {
      this.showPlaceholder();
      return;
    }

    if (this.billNumbers.length === 0) {
      this.billNumbers = [this.generateBillNumber()];
    }

    this.container.classList.add('single-bill');
    this.container.classList.remove('multiple-bills');

    const billHtml = this.createSingleBillHtml({
      customerName,
      billDate,
      billNumber: this.billNumbers[0],
      selectedItems,
      agency
    });

    this.container.innerHTML = billHtml;
  }

  /**
   * Render multiple bills preview
   */
  renderMultiple(data) {
    const { customerName, billDate, billsData, agency, dateStrategy } = data;

    if (!customerName || !agency || !billsData || billsData.length === 0) {
      this.showPlaceholder();
      return;
    }

    while (this.billNumbers.length < billsData.length) {
      this.billNumbers.push(this.generateBillNumber());
    }

    this.container.classList.remove('single-bill');
    this.container.classList.add('multiple-bills');

    let allBillsHtml = '';
    const baseDate = new Date(billDate);

    for (let i = 0; i < billsData.length; i++) {
      const billData = billsData[i];
      const currentBillDate = this.generateBillDate(baseDate, i, dateStrategy);

      const billHtml = this.createSingleBillHtml({
        customerName,
        billDate: currentBillDate,
        billNumber: this.billNumbers[i],
        selectedItems: billData.items,
        agency,
        isMultiple: true,
        billIndex: i,
        totalBills: billsData.length
      });

      allBillsHtml += billHtml;
    }

    this.container.innerHTML = allBillsHtml;
  }

  /**
   * Create HTML for a single travel bill
   */
  createSingleBillHtml(data) {
    const { customerName, billDate, billNumber, selectedItems, agency, isMultiple = false, billIndex = 0, totalBills = 1 } = data;

    const actualTotal = selectedItems.reduce((sum, item) => sum + item.total, 0);

    const billClass = isMultiple ? 'bill-preview-item' : '';

    return `
      <div class="${billClass}" data-template="${this.currentTemplateId}" data-paper-size="${this.currentPaperSize}">
        <!-- Bill Header -->
        <div class="bill-header">
          <div class="store-info">
            <img src="${agency.logo}" alt="${agency.name}" class="store-logo" onerror="this.style.display='none'">
            <div class="store-details">
              <h2>${agency.name}</h2>
              <p class="tagline">${agency.tagline}</p>
              <div class="address">
                <p>${agency.address.street}</p>
                <p>${agency.address.area}, ${agency.address.city}</p>
              </div>
              <p class="license-info">Transport License: ${agency.license} | NTN: ${agency.ntn}</p>
            </div>
          </div>
          <div class="bill-info">
            <h3>Ticket</h3>
            <p class="bill-number"><strong>Ticket #:</strong> ${billNumber}</p>
            <p class="bill-date"><strong>Date:</strong> ${this.formatDate(billDate)}</p>
          </div>
        </div>

        <!-- Customer Section -->
        <div class="customer-section">
          <p class="label">Passenger</p>
          <p class="customer-name">${customerName}</p>
        </div>

        <!-- Travel Items Table -->
        <table class="medicines-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Route / Details</th>
              <th>Persons</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedItems.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>
                  <span class="medicine-name">${item.name}</span>
                  <br>
                  <span class="medicine-generic">${item.description}</span>
                </td>
                <td>${item.route || 'N/A'}</td>
                <td>${item.quantity}</td>
                <td>${this.formatCurrency(item.price)}</td>
                <td>${this.formatCurrency(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Totals Section -->
        <div class="totals-section">
          <div class="totals-box">
            <div class="total-row subtotal">
              <span>Subtotal:</span>
              <span>${this.formatCurrency(actualTotal)}</span>
            </div>
            <div class="total-row">
              <span>Service Tax:</span>
              <span>${this.formatCurrency(0)}</span>
            </div>
            <div class="total-row grand-total">
              <span>Grand Total:</span>
              <span>${this.formatCurrency(actualTotal)}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bill-footer">
          <p class="thank-you">Thank you for traveling with us!</p>
          <p class="terms">
            Terms & Conditions: Tickets are non-refundable after departure.
            Please arrive 30 minutes before scheduled departure. Carry valid ID.
            <br>
            This is a computer-generated ticket. For demonstration purposes only.
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Show placeholder when no data
   */
  showPlaceholder() {
    this.container.classList.add('single-bill');
    this.container.classList.remove('multiple-bills');

    this.container.innerHTML = `
      <div class="bill-placeholder">
        <p>Enter bill details to see preview</p>
      </div>
    `;
  }

  /**
   * Set template
   */
  setTemplate(templateId) {
    this.currentTemplateId = templateId;
    this.container.setAttribute('data-template', templateId);
    const billItems = this.container.querySelectorAll('.bill-preview-item');
    billItems.forEach(item => {
      item.setAttribute('data-template', templateId);
    });
  }

  /**
   * Set paper size
   */
  setPaperSize(paperSizeId) {
    const paperSizes = {
      'thermal': { width: '80mm', height: '200mm', padding: '3mm', fontSize: '9px' },
      'a4': { width: '210mm', height: '297mm', padding: '10mm', fontSize: '11px' },
      'a5': { width: '148mm', height: '210mm', padding: '8mm', fontSize: '10px' },
      'letter': { width: '8.5in', height: '11in', padding: '0.4in', fontSize: '11px' },
      'legal': { width: '8.5in', height: '14in', padding: '0.4in', fontSize: '11px' },
      'half-letter': { width: '5.5in', height: '8.5in', padding: '0.3in', fontSize: '10px' }
    };

    const size = paperSizes[paperSizeId] || paperSizes['thermal'];
    this.currentPaperSize = paperSizeId;

    this.container.style.setProperty('--bill-width', size.width);
    this.container.style.setProperty('--bill-max-height', size.height);
    this.container.style.setProperty('--bill-padding', size.padding);
    this.container.style.setProperty('--bill-font-size', size.fontSize);
    this.container.setAttribute('data-paper-size', paperSizeId);

    const billItems = this.container.querySelectorAll('.bill-preview-item');
    billItems.forEach(item => {
      item.setAttribute('data-paper-size', paperSizeId);
    });
  }

  /**
   * Get container element (for PDF generation)
   */
  getElement() {
    return this.container;
  }

  /**
   * Get bill number
   */
  getBillNumber() {
    return this.billNumbers[0];
  }

  /**
   * Get all bill numbers
   */
  getAllBillNumbers() {
    return this.billNumbers;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TravelBillPreview;
}
