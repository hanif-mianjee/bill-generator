/**
 * Bill Preview Renderer
 * Renders the bill preview with selected medicines and store info
 */

class BillPreview {
  constructor() {
    this.container = document.getElementById('billPreview');
    this.billNumber = this.generateBillNumber();
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
   * Regenerate bill number
   */
  regenerateBillNumber() {
    this.billNumber = this.generateBillNumber();
    return this.billNumber;
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
   * Render the bill preview
   */
  render(data) {
    const { customerName, billDate, selectedMedicines, store, totalAmount } = data;

    if (!customerName || !store || !selectedMedicines || selectedMedicines.length === 0) {
      this.showPlaceholder();
      return;
    }

    const actualTotal = selectedMedicines.reduce((sum, item) => sum + item.total, 0);
    // <p>Tel: ${store.address.phone} | Mobile: ${store.address.mobile}</p>
    this.container.innerHTML = `
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
          <p class="bill-number"><strong>Bill #:</strong> ${this.billNumber}</p>
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
    `;
  }

  /**
   * Show placeholder when no data
   */
  showPlaceholder() {
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
    this.container.setAttribute('data-template', templateId);
  }

  /**
   * Set paper size
   */
  setPaperSize(paperSizeId) {
    const paperSizes = {
      'a4': { width: '210mm', height: '297mm', padding: '15mm' },
      'a5': { width: '148mm', height: '210mm', padding: '10mm' },
      'letter': { width: '8.5in', height: '11in', padding: '0.5in' },
      'legal': { width: '8.5in', height: '14in', padding: '0.5in' },
      'half-letter': { width: '5.5in', height: '8.5in', padding: '0.4in' }
    };

    const size = paperSizes[paperSizeId] || paperSizes['a4'];
    this.container.style.width = size.width;
    this.container.style.minHeight = size.height;
    this.container.style.padding = size.padding;
    this.container.setAttribute('data-paper-size', paperSizeId);
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
    return this.billNumber;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BillPreview;
}
