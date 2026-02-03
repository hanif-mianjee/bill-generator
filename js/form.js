/**
 * Form Handler
 * Manages form inputs, validation, and live updates
 */

class FormHandler {
  constructor(options = {}) {
    this.form = document.getElementById('billForm');
    this.inputs = {
      customerName: document.getElementById('customerName'),
      billDate: document.getElementById('billDate'),
      totalAmount: document.getElementById('totalAmount'),
      storeSelect: document.getElementById('storeSelect'),
      templateSelect: document.getElementById('templateSelect'),
      paperSizeSelect: document.getElementById('paperSizeSelect')
    };
    this.errors = {
      customerName: document.getElementById('customerNameError'),
      billDate: document.getElementById('billDateError'),
      totalAmount: document.getElementById('totalAmountError')
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

    // Total amount
    this.inputs.totalAmount.addEventListener('input', () => {
      this.validateField('totalAmount');
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

      case 'totalAmount':
        const amount = parseFloat(input.value);
        if (!input.value) {
          isValid = false;
          errorMessage = 'Total amount is required';
        } else if (isNaN(amount)) {
          isValid = false;
          errorMessage = 'Please enter a valid number';
        } else if (amount < 100) {
          isValid = false;
          errorMessage = 'Minimum amount is PKR 100';
        } else if (amount > 500000) {
          isValid = false;
          errorMessage = 'Maximum amount is PKR 500,000';
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
    const amountValid = this.validateField('totalAmount');

    return nameValid && dateValid && amountValid;
  }

  /**
   * Check if form is valid (without showing errors)
   */
  isValid() {
    const name = this.inputs.customerName.value.trim();
    const date = this.inputs.billDate.value;
    const amount = parseFloat(this.inputs.totalAmount.value);

    return (
      name.length >= 2 &&
      date &&
      !isNaN(amount) &&
      amount >= 100 &&
      amount <= 500000
    );
  }

  /**
   * Get form data
   */
  getFormData() {
    return {
      customerName: this.inputs.customerName.value.trim(),
      billDate: this.inputs.billDate.value,
      totalAmount: parseFloat(this.inputs.totalAmount.value) || 0,
      storeId: this.inputs.storeSelect.value,
      templateId: this.inputs.templateSelect.value,
      paperSizeId: this.inputs.paperSizeSelect.value
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
    this.inputs.templateSelect.innerHTML = templates.map(template =>
      `<option value="${template.id}">${template.name}</option>`
    ).join('');
  }

  /**
   * Populate paper size select options
   */
  populatePaperSizes(paperSizes) {
    this.inputs.paperSizeSelect.innerHTML = paperSizes.map(size =>
      `<option value="${size.id}">${size.name}</option>`
    ).join('');
  }

  /**
   * Set template value
   */
  setTemplate(templateId) {
    this.inputs.templateSelect.value = templateId;
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
