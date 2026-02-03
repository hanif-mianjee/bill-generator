/**
 * Medicine Selection Algorithm
 * Tiered greedy approach with randomization to select medicines that sum to target amount
 */

class MedicineSelector {
  constructor(medicines) {
    this.medicines = medicines;
    this.categorize();
  }

  /**
   * Categorize medicines into price tiers for better selection
   */
  categorize() {
    this.tiers = {
      low: this.medicines.filter(m => m.price <= 100),
      medium: this.medicines.filter(m => m.price > 100 && m.price <= 500),
      high: this.medicines.filter(m => m.price > 500 && m.price <= 2000),
      premium: this.medicines.filter(m => m.price > 2000)
    };
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Select medicines that sum to approximately the target amount
   * @param {number} targetAmount - Target total in PKR
   * @param {number} tolerance - Acceptable deviation (default 5%)
   * @returns {Array} Selected medicines with quantities
   */
  selectMedicines(targetAmount, tolerance = 0.05) {
    const minTarget = targetAmount * (1 - tolerance);
    const maxTarget = targetAmount * (1 + tolerance);

    // Determine item count based on target amount
    let minItems, maxItems;
    if (targetAmount <= 1000) {
      minItems = 3;
      maxItems = 6;
    } else if (targetAmount <= 5000) {
      minItems = 4;
      maxItems = 8;
    } else if (targetAmount <= 20000) {
      minItems = 5;
      maxItems = 10;
    } else {
      minItems = 6;
      maxItems = 12;
    }

    // Try multiple times to get a good selection
    for (let attempt = 0; attempt < 15; attempt++) {
      const result = this.attemptSelection(targetAmount, minItems, maxItems, minTarget, maxTarget);
      if (result) {
        const total = result.reduce((sum, item) => sum + item.total, 0);
        if (total >= minTarget && total <= maxTarget) {
          return result;
        }
      }
    }

    // Fallback: use precise greedy approach
    return this.preciseSelection(targetAmount, minItems, maxItems, minTarget, maxTarget);
  }

  /**
   * Single attempt at selecting medicines
   */
  attemptSelection(targetAmount, minItems, maxItems, minTarget, maxTarget) {
    const selected = [];
    let currentTotal = 0;
    const usedIds = new Set();

    // Strategy based on target amount - use appropriate tier mix
    let availableMeds;

    if (targetAmount < 500) {
      availableMeds = this.shuffle([...this.tiers.low]);
    } else if (targetAmount < 2000) {
      availableMeds = this.shuffle([...this.tiers.low, ...this.tiers.medium]);
    } else if (targetAmount < 10000) {
      // Mix tiers with preference for medium and high
      availableMeds = this.shuffle([
        ...this.tiers.medium,
        ...this.tiers.high,
        ...this.tiers.low.slice(0, 5)
      ]);
    } else if (targetAmount < 30000) {
      // Prefer high and premium for larger amounts
      availableMeds = this.shuffle([
        ...this.tiers.premium,
        ...this.tiers.high,
        ...this.tiers.medium.slice(0, 10)
      ]);
    } else {
      // Large amounts: prioritize premium items
      availableMeds = this.shuffle([
        ...this.tiers.premium,
        ...this.tiers.premium, // Double weight for premium
        ...this.tiers.high,
        ...this.tiers.medium.slice(0, 5)
      ]);
    }

    // Remove duplicates from availableMeds
    const seenIds = new Set();
    availableMeds = availableMeds.filter(m => {
      if (seenIds.has(m.id)) return false;
      seenIds.add(m.id);
      return true;
    });

    // First pass: Add items strategically
    for (const medicine of availableMeds) {
      if (selected.length >= maxItems) break;
      if (usedIds.has(medicine.id)) continue;
      if (currentTotal >= maxTarget) break;

      const remaining = targetAmount - currentTotal;

      // Calculate optimal quantity
      let qty = Math.min(
        medicine.maxQty,
        Math.max(medicine.minQty, Math.floor(remaining / medicine.price))
      );

      // Don't add if it would exceed max target significantly
      if (qty < medicine.minQty) continue;

      const itemTotal = medicine.price * qty;

      if (currentTotal + itemTotal <= maxTarget * 1.1) { // Allow slight overshoot
        selected.push({
          ...medicine,
          quantity: qty,
          total: itemTotal
        });
        currentTotal += itemTotal;
        usedIds.add(medicine.id);
      }
    }

    // Fine-tune to get closer to target
    if (selected.length >= minItems) {
      return this.fineTune(selected, targetAmount, minTarget, maxTarget, usedIds);
    }

    return null;
  }

  /**
   * Fine-tune selection to match target
   */
  fineTune(selected, target, minTarget, maxTarget, usedIds) {
    let currentTotal = selected.reduce((sum, item) => sum + item.total, 0);

    // If under target, increase quantities or add items
    while (currentTotal < minTarget) {
      let adjusted = false;

      // Try increasing quantities
      for (const item of selected) {
        if (item.quantity < item.maxQty) {
          const newTotal = currentTotal + item.price;
          if (newTotal <= maxTarget) {
            item.quantity++;
            item.total = item.price * item.quantity;
            currentTotal = newTotal;
            adjusted = true;
            if (currentTotal >= minTarget) break;
          }
        }
      }

      // Try adding small items if still under
      if (!adjusted && currentTotal < minTarget) {
        const remaining = target - currentTotal;
        const candidates = this.medicines
          .filter(m => !usedIds.has(m.id) && m.price <= remaining)
          .sort((a, b) => b.price - a.price);

        if (candidates.length > 0) {
          const med = candidates[0];
          const qty = Math.min(med.maxQty, Math.floor(remaining / med.price));
          if (qty >= med.minQty) {
            selected.push({
              ...med,
              quantity: qty,
              total: med.price * qty
            });
            usedIds.add(med.id);
            currentTotal += med.price * qty;
            adjusted = true;
          }
        }
      }

      if (!adjusted) break;
    }

    // If over target, decrease quantities
    while (currentTotal > maxTarget) {
      let adjusted = false;

      for (const item of selected) {
        if (item.quantity > item.minQty) {
          item.quantity--;
          item.total = item.price * item.quantity;
          currentTotal -= item.price;
          adjusted = true;
          if (currentTotal <= maxTarget) break;
        }
      }

      if (!adjusted) break;
    }

    return selected;
  }

  /**
   * Precise selection for edge cases - ensures we hit the target
   */
  preciseSelection(targetAmount, minItems, maxItems, minTarget, maxTarget) {
    const selected = [];
    let remaining = targetAmount;
    const usedIds = new Set();

    // Sort all medicines by price descending
    const sortedMeds = [...this.medicines].sort((a, b) => b.price - a.price);

    // Greedy selection starting with highest value items
    for (const medicine of sortedMeds) {
      if (selected.length >= maxItems) break;
      if (usedIds.has(medicine.id)) continue;
      if (remaining <= 0) break;

      // Calculate max quantity we can use
      const maxAffordableQty = Math.floor(remaining / medicine.price);
      const qty = Math.min(medicine.maxQty, Math.max(medicine.minQty, maxAffordableQty));

      if (qty >= medicine.minQty && medicine.price * qty <= remaining + (targetAmount * 0.05)) {
        const itemTotal = medicine.price * qty;
        selected.push({
          ...medicine,
          quantity: qty,
          total: itemTotal
        });
        remaining -= itemTotal;
        usedIds.add(medicine.id);
      }
    }

    // If we haven't reached minimum items, add more
    if (selected.length < minItems) {
      const smallItems = this.shuffle(
        this.medicines.filter(m => !usedIds.has(m.id))
      );

      for (const medicine of smallItems) {
        if (selected.length >= minItems) break;
        selected.push({
          ...medicine,
          quantity: medicine.minQty,
          total: medicine.price * medicine.minQty
        });
        usedIds.add(medicine.id);
      }
    }

    return selected;
  }

  /**
   * Get total of selected medicines
   */
  static getTotal(selectedMedicines) {
    return selectedMedicines.reduce((sum, item) => sum + item.total, 0);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MedicineSelector;
}
