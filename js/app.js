/**
 * Main Application
 * Orchestrates all components of the Medical Bill Generator
 */

class App {
  constructor() {
    this.medicines = [];
    this.stores = [];
    this.paperSizes = [];
    this.selectedMedicines = [];
    this.currentStore = null;
    this.currentPaperSize = 'a4';

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

      // Set initial store
      this.currentStore = this.stores[0];

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
    this.downloadBtn.disabled = !this.formHandler.isValid() || this.selectedMedicines.length === 0;
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
   * Download PDF
   */
  async downloadPDF() {
    const formData = this.formHandler.getFormData();

    if (!this.formHandler.validate()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (this.selectedMedicines.length === 0) {
      alert('No medicines selected. Please enter a valid amount.');
      return;
    }

    await this.pdfGenerator.generate(this.preview.getElement(), {
      customerName: formData.customerName,
      billNumber: this.preview.getBillNumber(),
      paperSize: formData.paperSizeId || 'a4'
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
