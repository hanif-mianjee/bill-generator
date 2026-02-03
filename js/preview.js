/**
 * Bill Preview Renderer
 * Renders the bill preview with selected medicines and store info
 * Supports multiple bills preview
 */

class BillPreview {
  constructor() {
    this.container = document.getElementById('billPreview');
    this.billNumbers = [this.generateBillNumber()];
    this.currentTemplateId = 'thermal-print';
    this.currentPaperSize = 'thermal';
  }

  /**
   * Generate unique bill number
   */
  generateBillNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `INV-${year}${month}${day}-${random}`;
  }

  /**
   * Regenerate bill number(s) - regenerates for all bills
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
   * Render single bill preview (backward compatibility)
   */
  render(data) {
    const { customerName, billDate, selectedMedicines, store, totalAmount } = data;

    if (!customerName || !store || !selectedMedicines || selectedMedicines.length === 0) {
      this.showPlaceholder();
      return;
    }

    // Ensure we have at least one bill number
    if (this.billNumbers.length === 0) {
      this.billNumbers = [this.generateBillNumber()];
    }

    // Mark container as single bill mode
    this.container.classList.add('single-bill');
    this.container.classList.remove('multiple-bills');

    const billHtml = this.createSingleBillHtml({
      customerName,
      billDate,
      billNumber: this.billNumbers[0],
      selectedMedicines,
      store
    });

    this.container.innerHTML = billHtml;
  }

  /**
   * Render multiple bills preview
   */
  renderMultiple(data) {
    const { customerName, billDate, billsData, store, dateStrategy } = data;

    if (!customerName || !store || !billsData || billsData.length === 0) {
      this.showPlaceholder();
      return;
    }

    // Ensure we have bill numbers for all bills
    while (this.billNumbers.length < billsData.length) {
      this.billNumbers.push(this.generateBillNumber());
    }

    // Mark container as multiple bills mode
    this.container.classList.remove('single-bill');
    this.container.classList.add('multiple-bills');

    // Create HTML for all bills
    let allBillsHtml = '';
    const baseDate = new Date(billDate);

    for (let i = 0; i < billsData.length; i++) {
      const billData = billsData[i];
      const currentBillDate = this.generateBillDate(baseDate, i, dateStrategy);
      
      const billHtml = this.createSingleBillHtml({
        customerName,
        billDate: currentBillDate,
        billNumber: this.billNumbers[i],
        selectedMedicines: billData.medicines,
        store,
        isMultiple: true,
        billIndex: i,
        totalBills: billsData.length
      });

      allBillsHtml += billHtml;
    }

    this.container.innerHTML = allBillsHtml;
  }

  /**
   * Create HTML for a single bill
   */
  createSingleBillHtml(data) {
    const { customerName, billDate, billNumber, selectedMedicines, store, isMultiple = false, billIndex = 0, totalBills = 1 } = data;

    const actualTotal = selectedMedicines.reduce((sum, item) => sum + item.total, 0);

    const billClass = isMultiple ? 'bill-preview-item' : '';

    return `
      <div class="${billClass}" data-template="${this.currentTemplateId}" data-paper-size="${this.currentPaperSize}">
        <!-- Bill Header -->
        <div class="bill-header">
          <div class="store-info">
            <img src="${store.logo}" alt="${store.name}" class="store-logo" onerror="this.style.display='none'">
            <div class="store-details">
              <h2>${store.name}</h2>
              <p class="tagline">${store.tagline}</p>
              <div class="address">
                <p>${store.address.street}</p>
                <p>${store.address.area}, ${store.address.city}</p>
              </div>
              <p class="license-info">License: ${store.license} | NTN: ${store.ntn}</p>
            </div>
          </div>
          <div class="bill-info">
            <h3>Invoice</h3>
            <p class="bill-number"><strong>Bill #:</strong> ${billNumber}</p>
            <p class="bill-date"><strong>Date:</strong> ${this.formatDate(billDate)}</p>
          </div>
        </div>

        <!-- Customer Section -->
        <div class="customer-section">
          <p class="label">Bill To</p>
          <p class="customer-name">${customerName}</p>
        </div>

        <!-- Medicines Table -->
        <table class="medicines-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Pack Size</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedMedicines.map((medicine, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>
                  <span class="medicine-name">${medicine.name}</span>
                  <br>
                  <span class="medicine-generic">${medicine.genericName}</span>
                  <span class="medicine-strength">(${medicine.strength})</span>
                </td>
                <td>${medicine.packSize}</td>
                <td>${medicine.quantity}</td>
                <td>${this.formatCurrency(medicine.price)}</td>
                <td>${this.formatCurrency(medicine.total)}</td>
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
              <span>Discount:</span>
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
          <p class="thank-you">Thank you for your purchase!</p>
          <p class="terms">
            Terms & Conditions: All medicines are non-returnable.
            Please check expiry date before use. Keep medicines out of reach of children.
            <br>
            This is a computer-generated invoice.
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Show placeholder when no data
   */
  showPlaceholder() {
    // Reset to single bill mode for placeholder
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
    // Also update any existing bill items
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
    
    // Apply to container as CSS custom properties for bill items to inherit
    this.container.style.setProperty('--bill-width', size.width);
    this.container.style.setProperty('--bill-max-height', size.height);
    this.container.style.setProperty('--bill-padding', size.padding);
    this.container.style.setProperty('--bill-font-size', size.fontSize);
    this.container.setAttribute('data-paper-size', paperSizeId);
    
    // Also update any existing bill items
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
   * Get bill number (returns first bill number for backward compatibility)
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
  module.exports = BillPreview;
}
