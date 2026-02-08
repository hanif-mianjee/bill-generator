/**
 * Travel Item Selection Algorithm
 * Realistic family/group travel selection:
 * - Picks ONE vehicle type for all travelers
 * - Fills remaining amount with extras (meals, blankets, insurance)
 * Bill total should always be >= target amount (within +5% tolerance)
 */

class TravelItemSelector {
  constructor(travelItems) {
    this.travelItems = travelItems;
    this.categorize();
  }

  /**
   * Categorize items into seat types and extras
   */
  categorize() {
    this.seatTypes = this.travelItems.filter(item =>
      !['extras', 'luggage', 'insurance'].includes(item.category)
    );
    this.extras = this.travelItems.filter(item =>
      ['extras', 'luggage', 'insurance'].includes(item.category)
    );
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
   * Select travel items for the target amount
   * @param {number} targetAmount - Target total in PKR
   * @param {number} personCount - Number of travelers
   * @param {number} tolerance - Acceptable deviation above target (default 5%)
   * @returns {Array} Selected items with quantities
   */
  selectItems(targetAmount, personCount = 3, tolerance = 0.05) {
    const minTarget = targetAmount;
    const maxTarget = targetAmount * (1 + tolerance);

    // Try multiple times to get a good selection
    for (let attempt = 0; attempt < 20; attempt++) {
      const result = this.attemptSelection(targetAmount, personCount, minTarget, maxTarget);
      if (result) {
        const total = result.reduce((sum, item) => sum + item.total, 0);
        if (total >= minTarget && total <= maxTarget) {
          return result;
        }
      }
    }

    // Fallback: use precise approach
    return this.preciseSelection(targetAmount, personCount, minTarget, maxTarget);
  }

  /**
   * Single attempt at selection
   */
  attemptSelection(targetAmount, personCount, minTarget, maxTarget) {
    const perPersonBudget = targetAmount / personCount;

    // Find seat types whose price is close to (but ≤) per-person budget
    const candidateSeats = this.shuffle(
      this.seatTypes.filter(s => s.price <= perPersonBudget * 1.1)
    );

    if (candidateSeats.length === 0) {
      // If no seat fits per-person budget, find cheapest available
      const cheapest = [...this.seatTypes].sort((a, b) => a.price - b.price);
      if (cheapest.length === 0) return null;
      candidateSeats.push(cheapest[0]);
    }

    // Sort candidates by how close they are to per-person budget (best fit first)
    candidateSeats.sort((a, b) => {
      const diffA = Math.abs(a.price - perPersonBudget);
      const diffB = Math.abs(b.price - perPersonBudget);
      return diffA - diffB;
    });

    // Pick top candidate (with some randomization among close matches)
    const topCandidates = candidateSeats.slice(0, Math.min(5, candidateSeats.length));
    const selectedSeat = topCandidates[Math.floor(Math.random() * topCandidates.length)];

    const selected = [];
    const seatTotal = selectedSeat.price * personCount;

    selected.push({
      ...selectedSeat,
      quantity: personCount,
      total: seatTotal
    });

    let currentTotal = seatTotal;

    // If we're already at or above target, return
    if (currentTotal >= minTarget && currentTotal <= maxTarget) {
      return selected;
    }

    // If over max target, this seat is too expensive - return null to try again
    if (currentTotal > maxTarget) {
      return null;
    }

    // Fill remaining with extras
    const remaining = targetAmount - currentTotal;
    if (remaining > 0) {
      const extraItems = this.fillWithExtras(remaining, personCount, maxTarget - currentTotal);
      selected.push(...extraItems);
      currentTotal += extraItems.reduce((sum, item) => sum + item.total, 0);
    }

    // Check if we're in range
    if (currentTotal >= minTarget && currentTotal <= maxTarget) {
      return selected;
    }

    // If still under, try adding one more extra
    if (currentTotal < minTarget) {
      const gap = minTarget - currentTotal;
      const filler = this.extras.find(e => e.price >= gap && e.price <= gap * 2);
      if (filler) {
        selected.push({
          ...filler,
          quantity: 1,
          total: filler.price
        });
        currentTotal += filler.price;
      }
    }

    return selected;
  }

  /**
   * Fill remaining amount with extras (meals, blankets, insurance, luggage)
   */
  fillWithExtras(remaining, personCount, maxRemaining) {
    const selected = [];
    let currentExtra = 0;
    const usedIds = new Set();
    const shuffledExtras = this.shuffle([...this.extras]);

    // Add 1-3 extras to fill the gap
    for (const extra of shuffledExtras) {
      if (selected.length >= 3) break;
      if (usedIds.has(extra.id)) continue;
      if (currentExtra >= maxRemaining) break;

      // Calculate quantity - either per person or just 1-2
      let qty;
      if (extra.category === 'extras') {
        // Meals/refreshments: typically per person
        qty = Math.min(personCount, extra.maxQty);
        if (extra.price * qty > maxRemaining - currentExtra) {
          qty = Math.max(1, Math.floor((maxRemaining - currentExtra) / extra.price));
        }
      } else {
        // Luggage/insurance: 1-2 items
        qty = Math.min(2, extra.maxQty);
        if (extra.price * qty > maxRemaining - currentExtra) {
          qty = 1;
        }
      }

      if (qty < 1) continue;
      const itemTotal = extra.price * qty;
      if (currentExtra + itemTotal > maxRemaining * 1.05) continue;

      selected.push({
        ...extra,
        quantity: qty,
        total: itemTotal
      });
      currentExtra += itemTotal;
      usedIds.add(extra.id);
    }

    return selected;
  }

  /**
   * Precise selection fallback
   */
  preciseSelection(targetAmount, personCount, minTarget, maxTarget) {
    const perPersonBudget = targetAmount / personCount;

    // Sort seats by price ascending
    const sortedSeats = [...this.seatTypes].sort((a, b) => a.price - b.price);

    // Find best seat: largest price that doesn't exceed per-person budget
    let bestSeat = sortedSeats[0];
    for (const seat of sortedSeats) {
      if (seat.price <= perPersonBudget) {
        bestSeat = seat;
      }
    }

    const selected = [];
    const seatTotal = bestSeat.price * personCount;
    selected.push({
      ...bestSeat,
      quantity: personCount,
      total: seatTotal
    });

    let currentTotal = seatTotal;

    // Fill remaining with extras
    if (currentTotal < minTarget) {
      const sortedExtras = [...this.extras].sort((a, b) => b.price - a.price);

      for (const extra of sortedExtras) {
        if (currentTotal >= minTarget) break;

        const remaining = targetAmount - currentTotal;
        let qty = Math.min(
          extra.maxQty,
          Math.max(1, Math.ceil(remaining / extra.price))
        );

        const itemTotal = extra.price * qty;
        selected.push({
          ...extra,
          quantity: qty,
          total: itemTotal
        });
        currentTotal += itemTotal;
      }
    }

    return selected;
  }

  /**
   * Get total of selected items
   */
  static getTotal(selectedItems) {
    return selectedItems.reduce((sum, item) => sum + item.total, 0);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TravelItemSelector;
}
