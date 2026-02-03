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

      // Since thermal mode is checked by default, use thermal settings
      this.preview.setTemplate('thermal-print');
      this.preview.setPaperSize('thermal');
      this.currentPaperSize = 'thermal';

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

      // Update preview with new template
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else if (changeType === 'paperSize') {
      // Paper size changed
      this.currentPaperSize = data.paperSizeId;
      this.preview.setPaperSize(data.paperSizeId);

      // Update preview with new paper size
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else if (changeType === 'thermalMode') {
      // Thermal mode changed
      this.preview.setTemplate(data.templateId);
      this.preview.setPaperSize(data.paperSizeId);
      
      // Update preview
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else {
      // Data changed - regenerate medicines and update preview
      this.updateStore(data.storeId);
      this.selectMedicines(data.totalAmount);
      this.updatePreview(data);
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
   * Update the preview - handles single and multiple bills
   */
  updatePreview(formData) {
    this.preview.setTemplate(formData.templateId);
    this.preview.setPaperSize(formData.paperSizeId || 'thermal');

    const amounts = formData.totalAmounts || [formData.totalAmount];
    const hasMultipleBills = amounts.length > 1;

    if (hasMultipleBills) {
      // Generate medicines for each bill amount
      const billsData = amounts.map(amount => ({
        amount: amount,
        medicines: this.medicineSelector.selectMedicines(amount)
      }));

      // Regenerate bill numbers for all bills
      this.preview.regenerateBillNumber(amounts.length);

      // Render multiple bills preview
      this.preview.renderMultiple({
        customerName: formData.customerName,
        billDate: formData.billDate,
        billsData: billsData,
        store: this.currentStore,
        dateStrategy: formData.dateStrategy || 'sequential'
      });

      // Store bills data for PDF generation
      this.multipleBillsData = billsData;
    } else {
      // Single bill - use existing logic
      this.preview.render({
        customerName: formData.customerName,
        billDate: formData.billDate,
        selectedMedicines: this.selectedMedicines,
        store: this.currentStore,
        totalAmount: formData.totalAmount
      });
      this.multipleBillsData = null;
    }

    // Enable download button if valid
    const hasValidMedicines = hasMultipleBills 
      ? amounts.every(amount => this.medicineSelector.selectMedicines(amount).length > 0)
      : this.selectedMedicines.length > 0;
    
    this.downloadBtn.disabled = !this.formHandler.isValid() || !hasValidMedicines;

    // Update download button text
    const downloadIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
    if (hasMultipleBills) {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Download ${amounts.length} Bills</span>`;
    } else {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Download PDF</span>`;
    }
  }

  /**
   * Regenerate medicines (different selection)
   */
  regenerateMedicines() {
    const formData = this.formHandler.getFormData();

    if (this.formHandler.isValid()) {
      const amounts = formData.totalAmounts || [formData.totalAmount];
      
      // Regenerate bill numbers for all bills
      this.preview.regenerateBillNumber(amounts.length);

      // Regenerate medicines for single bill
      if (amounts.length === 1) {
        this.selectMedicines(formData.totalAmount);
      }
      
      // Update preview (this will regenerate medicines for multiple bills too)
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
   * @param {string} strategy - Date strategy: 'same', 'sequential', or 'random'
   * @returns {string} Date in YYYY-MM-DD format
   */
  generateBillDate(baseDate, index, strategy = 'sequential') {
    const date = new Date(baseDate);
    
    if (strategy === 'same') {
      // All bills get the same date
      return date.toISOString().split('T')[0];
    } else if (strategy === 'sequential') {
      // Spread bills over sequential days (10-15 days apart)
      const daysApart = Math.floor(Math.random() * 6) + 10; // 10-15 days
      const daysBack = index * daysApart;
      date.setDate(date.getDate() - daysBack);
      return date.toISOString().split('T')[0];
    } else if (strategy === 'random') {
      // Random dates within last 30 days
      const daysBack = Math.floor(Math.random() * 31); // 0-30 days back
      date.setDate(date.getDate() - daysBack);
      return date.toISOString().split('T')[0];
    }
    
    return date.toISOString().split('T')[0];
  }

  /**
   * Download PDF - handles single or multiple bills
   * Uses browser's native print functionality for reliable PDF generation
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

    // Get the preview element
    const previewElement = this.preview.getElement();
    
    // Check if we have actual bill content (not just the placeholder)
    const hasPlaceholder = previewElement.querySelector('.bill-placeholder');
    const hasBillContent = previewElement.querySelector('.bill-header') || 
                          previewElement.querySelector('.medicines-table') ||
                          previewElement.querySelectorAll('.bill-preview-item').length > 0;

    if (hasPlaceholder && !hasBillContent) {
      alert('No bills to download. Please enter valid amounts.');
      return;
    }

    // Use the print-based PDF generator
    await this.pdfGenerator.generate(previewElement, {
      customerName: formData.customerName,
      billNumber: this.preview.getBillNumber(),
      billCount: amounts.length,
      paperSize: formData.paperSizeId || 'thermal'
    });
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
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
