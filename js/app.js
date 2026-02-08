/**
 * Main Application
 * Orchestrates all components of the Bill Generator
 * Supports Medical and Travel bill generation with tab-based navigation
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
    this.exportBtn = document.getElementById('exportBtn');
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

    // Download button (print)
    this.downloadBtn.addEventListener('click', () => {
      this.downloadPDF();
    });

    // Export PDF button
    this.exportBtn.addEventListener('click', () => {
      this.exportPDF();
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

    // Help modal
    this.setupHelpModal();
  }

  /**
   * Set up help modal event listeners
   */
  setupHelpModal() {
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const closeHelpFooterBtn = document.getElementById('closeHelpFooterBtn');

    if (helpBtn && helpModal) {
      // Open modal
      helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
      });

      // Close modal - close button
      if (closeHelpBtn) {
        closeHelpBtn.addEventListener('click', () => {
          helpModal.classList.add('hidden');
        });
      }

      // Close modal - footer button
      if (closeHelpFooterBtn) {
        closeHelpFooterBtn.addEventListener('click', () => {
          helpModal.classList.add('hidden');
        });
      }

      // Close modal - click outside
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
          helpModal.classList.add('hidden');
        }
      });

      // Close modal - Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
          helpModal.classList.add('hidden');
        }
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

    const isEnabled = this.formHandler.isValid() && hasValidMedicines;
    this.downloadBtn.disabled = !isEnabled;
    this.exportBtn.disabled = !isEnabled;

    // Update button text
    const downloadIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
    const exportIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    if (hasMultipleBills) {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Print ${amounts.length} Bills</span>`;
      this.exportBtn.innerHTML = `${exportIcon}<span>Export ${amounts.length} Bills</span>`;
    } else {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Print PDF</span>`;
      this.exportBtn.innerHTML = `${exportIcon}<span>Export PDF</span>`;
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
   * Download PDF
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

    const previewElement = this.preview.getElement();

    const hasPlaceholder = previewElement.querySelector('.bill-placeholder');
    const hasBillContent = previewElement.querySelector('.bill-header') ||
                          previewElement.querySelector('.medicines-table') ||
                          previewElement.querySelectorAll('.bill-preview-item').length > 0;

    if (hasPlaceholder && !hasBillContent) {
      alert('No bills to download. Please enter valid amounts.');
      return;
    }

    await this.pdfGenerator.print(previewElement, {
      customerName: formData.customerName,
      billNumber: this.preview.getBillNumber(),
      billCount: amounts.length,
      paperSize: formData.paperSizeId || 'thermal'
    });
  }

  /**
   * Export PDF (real PDF file)
   */
  async exportPDF() {
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

    const previewElement = this.preview.getElement();

    const hasPlaceholder = previewElement.querySelector('.bill-placeholder');
    const hasBillContent = previewElement.querySelector('.bill-header') ||
                          previewElement.querySelector('.medicines-table') ||
                          previewElement.querySelectorAll('.bill-preview-item').length > 0;

    if (hasPlaceholder && !hasBillContent) {
      alert('No bills to export. Please enter valid amounts.');
      return;
    }

    await this.pdfGenerator.export(previewElement, {
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


/**
 * Travel App
 * Mirrors App but uses travel data (agencies, travel items)
 */
class TravelApp {
  constructor() {
    this.travelItems = [];
    this.agencies = [];
    this.paperSizes = [];
    this.selectedItems = [];
    this.currentAgency = null;
    this.currentPaperSize = 'thermal';
    this.currentAgencyIndex = 0;

    // Initialize components
    this.templateManager = new TemplateManager();
    this.preview = new TravelBillPreview();
    this.pdfGenerator = new PDFGenerator();
    this.itemSelector = null;
    this.formHandler = null;

    // Buttons
    this.regenerateBtn = document.getElementById('travelRegenerateBtn');
    this.downloadBtn = document.getElementById('travelDownloadBtn');
    this.exportBtn = document.getElementById('travelExportBtn');
    this.randomTemplateBtn = document.getElementById('travelRandomTemplate');
    this.randomAgencyBtn = document.getElementById('travelRandomAgency');
  }

  /**
   * Initialize the travel application
   */
  init() {
    try {
      this.loadData();

      // Initialize form handler with travel-specific element IDs
      this.formHandler = new FormHandler({
        onChange: (data, changeType) => this.handleFormChange(data, changeType),
        prefix: 'travel'
      });

      // Populate selects
      this.formHandler.populateStores(this.agencies);
      this.formHandler.populateTemplates(this.templateManager.getAll());
      this.formHandler.populatePaperSizes(this.paperSizes);

      this.currentAgency = this.agencies[0];

      this.preview.setTemplate('thermal-print');
      this.preview.setPaperSize('thermal');
      this.currentPaperSize = 'thermal';

      this.setupEventListeners();

      console.log('Travel Bill Generator initialized successfully');
    } catch (error) {
      console.error('Error initializing travel application:', error);
    }
  }

  /**
   * Load travel data
   */
  loadData() {
    this.travelItems = APP_DATA.travelItems;
    this.agencies = APP_DATA.travelAgencies;
    this.paperSizes = APP_DATA.paperSizes;
    this.templateManager.init();

    this.itemSelector = new TravelItemSelector(this.travelItems);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    this.regenerateBtn.addEventListener('click', () => {
      this.regenerateItems();
    });

    this.downloadBtn.addEventListener('click', () => {
      this.downloadPDF();
    });

    this.exportBtn.addEventListener('click', () => {
      this.exportPDF();
    });

    this.randomTemplateBtn.addEventListener('click', () => {
      this.selectRandomTemplate();
    });

    if (this.randomAgencyBtn) {
      this.randomAgencyBtn.addEventListener('click', () => {
        this.selectRandomAgency();
      });
    }
  }

  /**
   * Handle form changes
   */
  handleFormChange(data, changeType) {
    if (changeType === 'template') {
      this.preview.setTemplate(data.templateId);
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else if (changeType === 'paperSize') {
      this.currentPaperSize = data.paperSizeId;
      this.preview.setPaperSize(data.paperSizeId);
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else if (changeType === 'thermalMode') {
      this.preview.setTemplate(data.templateId);
      this.preview.setPaperSize(data.paperSizeId);
      if (this.formHandler.isValid()) {
        this.updatePreview(data);
      }
    } else {
      this.updateAgency(data.storeId);
      this.selectItems(data.totalAmount, data.personCount);
      this.updatePreview(data);
    }
  }

  /**
   * Update current agency
   */
  updateAgency(agencyId) {
    this.currentAgency = this.agencies.find(a => a.id === agencyId) || this.agencies[0];
    this.currentAgencyIndex = this.agencies.findIndex(a => a.id === agencyId);
  }

  /**
   * Select travel items for the target amount
   */
  selectItems(targetAmount, personCount = 3) {
    if (targetAmount >= 100) {
      this.selectedItems = this.itemSelector.selectItems(targetAmount, personCount);
    } else {
      this.selectedItems = [];
    }
  }

  /**
   * Update the preview
   */
  updatePreview(formData) {
    this.preview.setTemplate(formData.templateId);
    this.preview.setPaperSize(formData.paperSizeId || 'thermal');

    const amounts = formData.totalAmounts || [formData.totalAmount];
    const personCount = formData.personCount || 3;
    const hasMultipleBills = amounts.length > 1;

    if (hasMultipleBills) {
      const billsData = amounts.map(amount => ({
        amount: amount,
        items: this.itemSelector.selectItems(amount, personCount)
      }));

      this.preview.regenerateBillNumber(amounts.length);

      this.preview.renderMultiple({
        customerName: formData.customerName,
        billDate: formData.billDate,
        billsData: billsData,
        agency: this.currentAgency,
        dateStrategy: formData.dateStrategy || 'sequential'
      });

      this.multipleBillsData = billsData;
    } else {
      this.preview.render({
        customerName: formData.customerName,
        billDate: formData.billDate,
        selectedItems: this.selectedItems,
        agency: this.currentAgency,
        totalAmount: formData.totalAmount
      });
      this.multipleBillsData = null;
    }

    const hasValidItems = hasMultipleBills
      ? amounts.every(amount => this.itemSelector.selectItems(amount, personCount).length > 0)
      : this.selectedItems.length > 0;

    const isEnabled = this.formHandler.isValid() && hasValidItems;
    this.downloadBtn.disabled = !isEnabled;
    this.exportBtn.disabled = !isEnabled;

    const downloadIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
    const exportIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    if (hasMultipleBills) {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Print ${amounts.length} Bills</span>`;
      this.exportBtn.innerHTML = `${exportIcon}<span>Export ${amounts.length} Bills</span>`;
    } else {
      this.downloadBtn.innerHTML = `${downloadIcon}<span>Print PDF</span>`;
      this.exportBtn.innerHTML = `${exportIcon}<span>Export PDF</span>`;
    }
  }

  /**
   * Regenerate items
   */
  regenerateItems() {
    const formData = this.formHandler.getFormData();

    if (this.formHandler.isValid()) {
      const amounts = formData.totalAmounts || [formData.totalAmount];
      const personCount = formData.personCount || 3;

      this.preview.regenerateBillNumber(amounts.length);

      if (amounts.length === 1) {
        this.selectItems(formData.totalAmount, personCount);
      }

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
   * Select random agency
   */
  selectRandomAgency() {
    const randomIndex = Math.floor(Math.random() * this.agencies.length);
    this.currentAgencyIndex = randomIndex;
    this.currentAgency = this.agencies[randomIndex];
    this.formHandler.setStore(this.currentAgency.id);

    const formData = this.formHandler.getFormData();
    if (this.formHandler.isValid()) {
      this.updatePreview(formData);
    }
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

    const amounts = formData.totalAmounts || [formData.totalAmount];

    if (amounts.length === 0) {
      alert('No valid amounts entered.');
      return;
    }

    const previewElement = this.preview.getElement();

    const hasPlaceholder = previewElement.querySelector('.bill-placeholder');
    const hasBillContent = previewElement.querySelector('.bill-header') ||
                          previewElement.querySelector('.medicines-table') ||
                          previewElement.querySelectorAll('.bill-preview-item').length > 0;

    if (hasPlaceholder && !hasBillContent) {
      alert('No bills to download. Please enter valid amounts.');
      return;
    }

    await this.pdfGenerator.print(previewElement, {
      customerName: formData.customerName,
      billNumber: this.preview.getBillNumber(),
      billCount: amounts.length,
      paperSize: formData.paperSizeId || 'thermal'
    });
  }

  /**
   * Export PDF (real PDF file)
   */
  async exportPDF() {
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

    const previewElement = this.preview.getElement();

    const hasPlaceholder = previewElement.querySelector('.bill-placeholder');
    const hasBillContent = previewElement.querySelector('.bill-header') ||
                          previewElement.querySelector('.medicines-table') ||
                          previewElement.querySelectorAll('.bill-preview-item').length > 0;

    if (hasPlaceholder && !hasBillContent) {
      alert('No bills to export. Please enter valid amounts.');
      return;
    }

    await this.pdfGenerator.export(previewElement, {
      customerName: formData.customerName,
      billNumber: this.preview.getBillNumber(),
      billCount: amounts.length,
      paperSize: formData.paperSizeId || 'thermal'
    });
  }
}


/**
 * Tab Manager
 * Handles switching between Medical and Travel tabs
 */
class TabManager {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.medicalContent = document.getElementById('medicalContent');
    this.travelContent = document.getElementById('travelContent');
    this.activeTab = 'medical';
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });
  }

  switchTab(tabName) {
    this.activeTab = tabName;

    // Update tab buttons
    this.tabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Show/hide content
    if (tabName === 'medical') {
      this.medicalContent.classList.remove('hidden');
      this.travelContent.classList.add('hidden');
    } else {
      this.medicalContent.classList.add('hidden');
      this.travelContent.classList.remove('hidden');
    }
  }
}


// Initialize apps when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tab manager
  const tabManager = new TabManager();
  tabManager.init();

  // Initialize medical app
  const app = new App();
  app.init();

  // Initialize travel app
  const travelApp = new TravelApp();
  travelApp.init();
});
