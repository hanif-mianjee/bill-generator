/**
 * Form Handler
 * Manages form inputs, validation, and live updates
 * Supports multiple bill amounts
 */

class FormHandler {
  constructor(options = {}) {
    this.form = document.getElementById('billForm');
    this.inputs = {
      customerName: document.getElementById('customerName'),
      billDate: document.getElementById('billDate'),
      totalAmounts: document.getElementById('totalAmounts'),
      totalAmount: document.getElementById('totalAmount'), // Hidden field for compatibility
      storeSelect: document.getElementById('storeSelect'),
      templateSelect: document.getElementById('templateSelect'),
      paperSizeSelect: document.getElementById('paperSizeSelect'),
      dateStrategy: document.getElementById('dateStrategy'),
      thermalMode: document.getElementById('thermalMode')
    };
    this.errors = {
      customerName: document.getElementById('customerNameError'),
      billDate: document.getElementById('billDateError'),
      totalAmounts: document.getElementById('totalAmountsError')
    };

    this.onChange = options.onChange || (() => {});
    this.debounceTimeout = null;
    this.debounceDelay = 300;

    this.init();
  }

  /**
   * Initialize form
   */
  init() {
    // Set default date to today
    this.inputs.billDate.value = this.getTodayDate();

    // Add event listeners
    this.addEventListeners();
    
    // Initialize thermal mode if checkbox is checked by default
    if (this.inputs.thermalMode.checked) {
      this.toggleThermalMode();
    }
  }

  /**
   * Get today's date in YYYY-MM-DD format
   */
  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  /**
   * Add event listeners to form inputs
   */
  addEventListeners() {
    // Customer name
    this.inputs.customerName.addEventListener('input', () => {
      this.validateField('customerName');
      this.debouncedOnChange();
    });

    // Bill date
    this.inputs.billDate.addEventListener('change', () => {
      this.validateField('billDate');
      this.debouncedOnChange();
    });

    // Total amounts (textarea for multiple)
    this.inputs.totalAmounts.addEventListener('input', () => {
      this.validateField('totalAmounts');
      this.toggleDateStrategy();
      this.debouncedOnChange();
    });

    // Store select
    this.inputs.storeSelect.addEventListener('change', () => {
      this.debouncedOnChange();
    });

    // Template select
    this.inputs.templateSelect.addEventListener('change', () => {
      this.onChange(this.getFormData(), 'template');
    });

    // Paper size select
    this.inputs.paperSizeSelect.addEventListener('change', () => {
      this.onChange(this.getFormData(), 'paperSize');
    });

    // Thermal mode checkbox
    this.inputs.thermalMode.addEventListener('change', () => {
      this.toggleThermalMode();
      // Trigger both template and paperSize changes to update preview
      this.onChange(this.getFormData(), 'template');
      this.onChange(this.getFormData(), 'paperSize');
    });

    // Prevent form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  /**
   * Debounced onChange callback
   */
  debouncedOnChange() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      if (this.isValid()) {
        this.onChange(this.getFormData(), 'data');
      }
    }, this.debounceDelay);
  }

  /**
   * Parse amounts from textarea
   */
  parseAmounts() {
    const text = this.inputs.totalAmounts.value.trim();
    if (!text) return [];

    return text
      .split(/[\n,]+/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => parseFloat(line.replace(/[^\d.]/g, '')))
      .filter(amount => !isNaN(amount) && amount >= 100 && amount <= 500000);
  }

  /**
   * Validate a specific field
   */
  validateField(fieldName) {
    const input = this.inputs[fieldName];
    const error = this.errors[fieldName];
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'customerName':
        if (!input.value.trim()) {
          isValid = false;
          errorMessage = 'Customer name is required';
        } else if (input.value.trim().length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'billDate':
        if (!input.value) {
          isValid = false;
          errorMessage = 'Bill date is required';
        }
        break;

      case 'totalAmounts':
        const amounts = this.parseAmounts();
        const rawText = input.value.trim();
        if (!rawText) {
          isValid = false;
          errorMessage = 'At least one amount is required';
        } else if (amounts.length === 0) {
          isValid = false;
          errorMessage = 'Enter valid amounts (PKR 100 - 500,000)';
        } else {
          // Check each line
          const lines = rawText.split(/[\n,]+/).filter(l => l.trim());
          for (const line of lines) {
            const amount = parseFloat(line.trim().replace(/[^\d.]/g, ''));
            if (isNaN(amount)) {
              isValid = false;
              errorMessage = 'Invalid number found';
              break;
            }
            if (amount < 100) {
              isValid = false;
              errorMessage = 'Minimum amount is PKR 100';
              break;
            }
            if (amount > 500000) {
              isValid = false;
              errorMessage = 'Maximum amount is PKR 500,000';
              break;
            }
          }
        }
        // Update hidden field with first amount for preview
        if (amounts.length > 0) {
          this.inputs.totalAmount.value = amounts[0];
        }
        break;
    }

    // Update UI
    if (isValid) {
      input.classList.remove('error');
      input.classList.add('success');
      if (error) error.textContent = '';
    } else {
      input.classList.remove('success');
      input.classList.add('error');
      if (error) error.textContent = errorMessage;
    }

    return isValid;
  }

  /**
   * Validate all fields
   */
  validate() {
    const nameValid = this.validateField('customerName');
    const dateValid = this.validateField('billDate');
    const amountsValid = this.validateField('totalAmounts');

    return nameValid && dateValid && amountsValid;
  }

  /**
   * Check if form is valid (without showing errors)
   */
  isValid() {
    const name = this.inputs.customerName.value.trim();
    const date = this.inputs.billDate.value;
    const amounts = this.parseAmounts();

    return (
      name.length >= 2 &&
      date &&
      amounts.length > 0
    );
  }

  /**
   * Toggle thermal mode visibility and values
   */
  toggleThermalMode() {
    const thermalMode = this.inputs.thermalMode.checked;
    const templateGroup = document.getElementById('templateGroup');
    const paperSizeGroup = document.getElementById('paperSizeGroup');
    
    if (thermalMode) {
      // Hide template and paper size selectors
      templateGroup.style.display = 'none';
      paperSizeGroup.style.display = 'none';
      
      // Set to thermal values
      this.inputs.templateSelect.value = 'thermal-print';
      this.inputs.paperSizeSelect.value = 'thermal';
    } else {
      // Show template and paper size selectors
      templateGroup.style.display = 'block';
      paperSizeGroup.style.display = 'block';
      
      // Set to default values (simple-receipt and a4)
      this.inputs.templateSelect.value = 'simple-receipt';
      this.inputs.paperSizeSelect.value = 'a4';
    }
  }

  /**
   * Toggle date strategy visibility based on number of amounts
   */
  toggleDateStrategy() {
    const amounts = this.parseAmounts();
    const dateStrategyGroup = document.getElementById('dateStrategyGroup');
    
    if (amounts.length > 1) {
      dateStrategyGroup.style.display = 'block';
    } else {
      dateStrategyGroup.style.display = 'none';
    }
  }

  /**
   * Get form data
   */
  getFormData() {
    const amounts = this.parseAmounts();
    return {
      customerName: this.inputs.customerName.value.trim(),
      billDate: this.inputs.billDate.value,
      totalAmount: amounts[0] || 0,
      totalAmounts: amounts,
      storeId: this.inputs.storeSelect.value,
      templateId: this.inputs.templateSelect.value,
      paperSizeId: this.inputs.paperSizeSelect.value,
      dateStrategy: this.inputs.dateStrategy.value || 'sequential',
      thermalMode: this.inputs.thermalMode.checked
    };
  }

  /**
   * Populate store select options
   */
  populateStores(stores) {
    this.inputs.storeSelect.innerHTML = stores.map(store =>
      `<option value="${store.id}">${store.name} - ${store.address.city}</option>`
    ).join('');
  }

  /**
   * Populate template select options
   */
  populateTemplates(templates) {
    // Include all templates but hide thermal-print visually
    this.inputs.templateSelect.innerHTML = templates.map(template =>
      `<option value="${template.id}" ${template.id === 'thermal-print' ? 'style="display:none;"' : ''}>${template.name}</option>`
    ).join('');
  }

  /**
   * Populate paper size select options
   */
  populatePaperSizes(paperSizes) {
    // Include all sizes but hide thermal visually
    this.inputs.paperSizeSelect.innerHTML = paperSizes.map(size =>
      `<option value="${size.id}" ${size.id === 'thermal' ? 'style="display:none;"' : ''}>${size.name}</option>`
    ).join('');
  }

  /**
   * Set template value
   */
  setTemplate(templateId) {
    this.inputs.templateSelect.value = templateId;
  }

  /**
   * Set store value
   */
  setStore(storeId) {
    this.inputs.storeSelect.value = storeId;
  }

  /**
   * Get selected store ID
   */
  getSelectedStoreId() {
    return this.inputs.storeSelect.value;
  }

  /**
   * Get selected template ID
   */
  getSelectedTemplateId() {
    return this.inputs.templateSelect.value;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormHandler;
}
