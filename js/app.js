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
      // Only template changed
      this.preview.setTemplate(data.templateId);
    } else if (changeType === 'paperSize') {
      // Paper size changed
      this.currentPaperSize = data.paperSizeId;
      this.preview.setPaperSize(data.paperSizeId);
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
    if (hasMultipleBills) {
      this.downloadBtn.innerHTML = `<span class="icon">&#8681;</span> Download ${formData.totalAmounts.length} Bills`;
    } else {
      this.downloadBtn.innerHTML = '<span class="icon">&#8681;</span> Download PDF';
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
   * Generate a random date within range
   */
  generateRandomDate(baseDate, daysOffset) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - daysOffset);
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
    const billElements = [];
    const baseDate = new Date(formData.billDate);

    // Create a temporary container for bill generation
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    try {
      for (let i = 0; i < amounts.length; i++) {
        const amount = amounts[i];

        // Generate different medicines for each bill
        const medicines = this.medicineSelector.selectMedicines(amount);

        // Generate different date for each bill (spread over days)
        const billDate = this.generateRandomDate(baseDate, i);

        // Create a new preview instance for this bill
        const billPreview = new BillPreview();
        const billContainer = document.createElement('div');
        billContainer.id = `billPreview_${i}`;
        billContainer.className = 'bill-preview';
        billContainer.setAttribute('data-template', formData.templateId);
        tempContainer.appendChild(billContainer);

        // Update the preview's container reference
        billPreview.container = billContainer;
        billPreview.regenerateBillNumber();
        billPreview.setTemplate(formData.templateId);
        billPreview.setPaperSize(formData.paperSizeId);

        // Render the bill
        billPreview.render({
          customerName: formData.customerName,
          billDate: billDate,
          selectedMedicines: medicines,
          store: this.currentStore,
          totalAmount: amount
        });

        billElements.push(billContainer);
      }

      // Generate the combined PDF
      await this.pdfGenerator.generateMultiple(billElements, {
        customerName: formData.customerName,
        paperSize: formData.paperSizeId || 'thermal'
      });

    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
