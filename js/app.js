/**
 * Main Application
 * Orchestrates all components of the Medical Bill Generator
 * Supports multiple bills generation in single PDF
 */

class App {
  constructor() {
    this.medicines = [];
    this.stores = [];
    this.paperSizes = [];
    this.selectedMedicines = [];
    this.currentStore = null;
    this.currentPaperSize = 'thermal';
    this.currentStoreIndex = 0;

    // Initialize components
    this.templateManager = new TemplateManager();
    this.preview = new BillPreview();
    this.pdfGenerator = new PDFGenerator();
    this.medicineSelector = null;
    this.formHandler = null;

    // Buttons
    this.regenerateBtn = document.getElementById('regenerateBtn');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.randomTemplateBtn = document.getElementById('randomTemplate');
    this.randomStoreBtn = document.getElementById('randomStore');
  }

  /**
   * Initialize the application
   */
  init() {
    try {
      // Load data (synchronous - uses embedded data)
      this.loadData();

      // Initialize form handler with callback
      this.formHandler = new FormHandler({
        onChange: (data, changeType) => this.handleFormChange(data, changeType)
      });

      // Populate selects
      this.formHandler.populateStores(this.stores);
      this.formHandler.populateTemplates(this.templateManager.getAll());
      this.formHandler.populatePaperSizes(this.paperSizes);

      // Set initial store and template (defaults)
      this.currentStore = this.stores[0];

      // Set default template to thermal-print
      this.preview.setTemplate('thermal-print');
      this.preview.setPaperSize('thermal');

      // Initialize paper size options based on default template
      this.updatePaperSizeOptions('thermal-print');

      // Set up event listeners
      this.setupEventListeners();

      console.log('Medical Bill Generator initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
      alert('Error loading application data. Please refresh the page.');
    }
  }

  /**
   * Load all required data
   */
  loadData() {
    // Use embedded data from data.js (no fetch needed - works without server)
    this.medicines = APP_DATA.medicines;
    this.stores = APP_DATA.stores;
    this.paperSizes = APP_DATA.paperSizes;
    this.templateManager.init();

    // Initialize medicine selector
    this.medicineSelector = new MedicineSelector(this.medicines);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Regenerate button
    this.regenerateBtn.addEventListener('click', () => {
      this.regenerateMedicines();
    });

    // Download button
    this.downloadBtn.addEventListener('click', () => {
      this.downloadPDF();
    });

    // Random template button
    this.randomTemplateBtn.addEventListener('click', () => {
      this.selectRandomTemplate();
    });

    // Random store button
    if (this.randomStoreBtn) {
      this.randomStoreBtn.addEventListener('click', () => {
        this.selectRandomStore();
      });
    }
  }

  /**
   * Handle form changes
   */
  handleFormChange(data, changeType) {
    if (changeType === 'template') {
      // Template changed
      this.preview.setTemplate(data.templateId);

      // If non-thermal template selected, disable thermal paper option
      // If thermal template selected, enable thermal paper option
      this.updatePaperSizeOptions(data.templateId);
    } else if (changeType === 'paperSize') {
      // Paper size changed
      this.currentPaperSize = data.paperSizeId;
      this.preview.setPaperSize(data.paperSizeId);

      // If thermal paper is selected, auto-switch to thermal template
      if (data.paperSizeId === 'thermal') {
        this.formHandler.setTemplate('thermal-print');
        this.preview.setTemplate('thermal-print');
      }
    } else {
      // Data changed - regenerate medicines and update preview
      this.updateStore(data.storeId);
      this.selectMedicines(data.totalAmount);
      this.updatePreview(data);
    }
  }

  /**
   * Update paper size options based on selected template
   * Thermal paper only available with thermal template
   */
  updatePaperSizeOptions(templateId) {
    const paperSizeSelect = document.getElementById('paperSizeSelect');
    const thermalOption = paperSizeSelect.querySelector('option[value="thermal"]');

    if (templateId === 'thermal-print') {
      // Thermal template - enable thermal paper option
      if (thermalOption) {
        thermalOption.disabled = false;
        thermalOption.textContent = 'Thermal (80mm)';
      }
    } else {
      // Non-thermal template - disable thermal paper option
      if (thermalOption) {
        thermalOption.disabled = true;
        thermalOption.textContent = 'Thermal (80mm) - Only with Thermal template';

        // If thermal paper was selected, switch to A5
        if (paperSizeSelect.value === 'thermal') {
          paperSizeSelect.value = 'a5';
          this.currentPaperSize = 'a5';
          this.preview.setPaperSize('a5');
        }
      }
    }
  }

  /**
   * Update current store
   */
  updateStore(storeId) {
    this.currentStore = this.stores.find(s => s.id === storeId) || this.stores[0];
    this.currentStoreIndex = this.stores.findIndex(s => s.id === storeId);
  }

  /**
   * Select medicines for the target amount
   */
  selectMedicines(targetAmount) {
    if (targetAmount >= 100) {
      this.selectedMedicines = this.medicineSelector.selectMedicines(targetAmount);
    } else {
      this.selectedMedicines = [];
    }
  }

  /**
   * Update the preview
   */
  updatePreview(formData) {
    this.preview.setTemplate(formData.templateId);
    this.preview.render({
      customerName: formData.customerName,
      billDate: formData.billDate,
      selectedMedicines: this.selectedMedicines,
      store: this.currentStore,
      totalAmount: formData.totalAmount
    });

    // Enable download button if valid
    const hasMultipleBills = formData.totalAmounts && formData.totalAmounts.length > 1;
    this.downloadBtn.disabled = !this.formHandler.isValid() || this.selectedMedicines.length === 0;

    // Update download button text
    const downloadIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`;
    if (hasMultipleBills) {
      this.downloadBtn.innerHTML = `${downloadIcon} Download ${formData.totalAmounts.length} Bills`;
    } else {
      this.downloadBtn.innerHTML = `${downloadIcon} Download PDF`;
    }
  }

  /**
   * Regenerate medicines (different selection)
   */
  regenerateMedicines() {
    const formData = this.formHandler.getFormData();

    if (this.formHandler.isValid()) {
      // Get new bill number
      this.preview.regenerateBillNumber();

      // Regenerate medicines
      this.selectMedicines(formData.totalAmount);
      this.updatePreview(formData);
    }
  }

  /**
   * Select random template
   */
  selectRandomTemplate() {
    const template = this.templateManager.random();
    this.formHandler.setTemplate(template.id);
    this.preview.setTemplate(template.id);
  }

  /**
   * Select random store
   */
  selectRandomStore() {
    const randomIndex = Math.floor(Math.random() * this.stores.length);
    this.currentStoreIndex = randomIndex;
    this.currentStore = this.stores[randomIndex];
    this.formHandler.setStore(this.currentStore.id);

    // Update preview with new store
    const formData = this.formHandler.getFormData();
    if (this.formHandler.isValid()) {
      this.updatePreview(formData);
    }
  }

  /**
   * Generate a date offset from base date
   * @param {Date} baseDate - Starting date
   * @param {number} index - Bill index (0 = base date, 1 = day before, etc.)
   * @returns {string} Date in YYYY-MM-DD format
   */
  generateBillDate(baseDate, index) {
    const date = new Date(baseDate);
    // Spread bills over random days (1-3 days apart)
    const daysBack = index * (Math.floor(Math.random() * 3) + 1);
    date.setDate(date.getDate() - daysBack);
    return date.toISOString().split('T')[0];
  }

  /**
   * Download PDF - handles single or multiple bills
   */
  async downloadPDF() {
    const formData = this.formHandler.getFormData();

    if (!this.formHandler.validate()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const amounts = formData.totalAmounts || [formData.totalAmount];

    if (amounts.length === 0) {
      alert('No valid amounts entered.');
      return;
    }

    // Single bill
    if (amounts.length === 1) {
      if (this.selectedMedicines.length === 0) {
        alert('No medicines selected. Please enter a valid amount.');
        return;
      }

      await this.pdfGenerator.generate(this.preview.getElement(), {
        customerName: formData.customerName,
        billNumber: this.preview.getBillNumber(),
        paperSize: formData.paperSizeId || 'thermal'
      });
      return;
    }

    // Multiple bills - generate each bill and combine into one PDF
    await this.generateMultipleBills(formData, amounts);
  }

  /**
   * Generate multiple bills in a single PDF
   */
  async generateMultipleBills(formData, amounts) {
    const baseDate = new Date(formData.billDate);
    const paperSize = formData.paperSizeId || 'thermal';

    // Get paper config for sizing
    const paperConfigs = {
      'thermal': { width: '80mm', height: '200mm', padding: '3mm', fontSize: '9px' },
      'a4': { width: '210mm', height: '297mm', padding: '10mm', fontSize: '11px' },
      'a5': { width: '148mm', height: '210mm', padding: '8mm', fontSize: '10px' },
      'letter': { width: '215.9mm', height: '279.4mm', padding: '10mm', fontSize: '11px' },
      'legal': { width: '215.9mm', height: '355.6mm', padding: '10mm', fontSize: '11px' },
      'half-letter': { width: '139.7mm', height: '215.9mm', padding: '8mm', fontSize: '10px' }
    };
    const config = paperConfigs[paperSize] || paperConfigs['a4'];

    try {
      this.pdfGenerator.showLoading(`Generating ${amounts.length} bills...`);

      // Create container for all bills
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Generate each bill
      for (let i = 0; i < amounts.length; i++) {
        const amount = amounts[i];

        // Generate different medicines for each bill
        const medicines = this.medicineSelector.selectMedicines(amount);

        // Generate different date for each bill
        const billDate = this.generateBillDate(baseDate, i);

        // Generate unique bill number
        const billNumber = this.generateBillNumber();

        // Create bill HTML
        const billHtml = this.createBillHtml({
          customerName: formData.customerName,
          billDate: billDate,
          billNumber: billNumber,
          selectedMedicines: medicines,
          store: this.currentStore,
          totalAmount: amount,
          templateId: formData.templateId,
          config: config,
          isLastBill: i === amounts.length - 1
        });

        container.innerHTML += billHtml;
      }

      // Generate PDF from container
      await this.pdfGenerator.generateFromContainer(container, {
        customerName: formData.customerName,
        billCount: amounts.length,
        paperSize: paperSize
      });

      // Clean up
      document.body.removeChild(container);

    } catch (error) {
      console.error('Error generating multiple bills:', error);
      this.pdfGenerator.hideLoading();
      alert('Error generating PDF. Please try again.');
    }
  }

  /**
   * Generate a unique bill number
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
   * Create bill HTML string
   */
  createBillHtml(data) {
    const { customerName, billDate, billNumber, selectedMedicines, store, totalAmount, templateId, config, isLastBill } = data;

    const actualTotal = selectedMedicines.reduce((sum, item) => sum + item.total, 0);

    const formattedDate = new Date(billDate).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount).replace('PKR', 'Rs.');
    };

    const medicineRows = selectedMedicines.map((medicine, index) => `
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
        <td>${formatCurrency(medicine.price)}</td>
        <td>${formatCurrency(medicine.total)}</td>
      </tr>
    `).join('');

    return `
      <div class="bill-preview bill-page" data-template="${templateId}" style="
        width: ${config.width};
        min-height: auto;
        max-height: ${config.height};
        padding: ${config.padding};
        font-size: ${config.fontSize};
        box-sizing: border-box;
        overflow: hidden;
        background: white;
        page-break-after: ${isLastBill ? 'auto' : 'always'};
        margin: 0;
      ">
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
            <p class="bill-date"><strong>Date:</strong> ${formattedDate}</p>
          </div>
        </div>

        <div class="customer-section">
          <p class="label">Bill To</p>
          <p class="customer-name">${customerName}</p>
        </div>

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
            ${medicineRows}
          </tbody>
        </table>

        <div class="totals-section">
          <div class="totals-box">
            <div class="total-row subtotal">
              <span>Subtotal:</span>
              <span>${formatCurrency(actualTotal)}</span>
            </div>
            <div class="total-row">
              <span>Discount:</span>
              <span>${formatCurrency(0)}</span>
            </div>
            <div class="total-row grand-total">
              <span>Grand Total:</span>
              <span>${formatCurrency(actualTotal)}</span>
            </div>
          </div>
        </div>

        <div class="bill-footer">
          <p class="thank-you">Thank you for your purchase!</p>
          <p class="terms">
            Terms & Conditions: All medicines are non-returnable.
            Please check expiry date before use.
            <br>
            This is a computer-generated invoice.
          </p>
        </div>
      </div>
    `;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
