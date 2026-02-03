# Medical Bill Generator - Implementation Plan

## Overview
A professional, production-ready medical bill generator application that works entirely in the browser with no server required. Users enter customer details and a total amount, and the app auto-selects medicines that sum to that amount across 20 different professional bill templates.

## Project Structure

```
bill-generator/
├── index.html                 # Main application entry point
├── css/
│   ├── main.css              # Global styles, reset, utilities
│   ├── form.css              # Form component styles
│   ├── preview.css           # Bill preview base styles
│   └── templates/
│       └── templates.css     # All 20 template styles using CSS custom properties
├── js/
│   ├── app.js                # Main application initialization
│   ├── form.js               # Form handling and validation
│   ├── preview.js            # Bill preview rendering
│   ├── pdf.js                # PDF generation logic
│   ├── medicine-selector.js  # Algorithm for selecting medicines to match total
│   └── template-manager.js   # Template cycling and management
├── data/
│   ├── medicines.json        # 50+ Pakistani medicines with PKR prices
│   ├── stores.json           # 20 pharmacy stores with Pakistani addresses
│   └── templates.json        # Template configurations (colors, layouts)
└── assets/
    └── logos/                # SVG placeholder logos (or data URIs in JSON)
```

## Key Components

### 1. Medicine Selection Algorithm (`js/medicine-selector.js`)
- **Tiered greedy approach** with randomization for variety
- Categorizes medicines into price tiers (low/medium/high)
- Selects 5-10 items that sum to approximately the target amount
- Allows 5% tolerance from exact target
- Fine-tunes with quantity adjustments
- Fallback mechanism for edge cases

### 2. Template System (`css/templates/templates.css`)
Uses **CSS Custom Properties** for efficient management of 20 designs:
- Each template defines color, typography, and layout variables
- Templates applied via `data-template` attribute
- Minimal CSS duplication - each template only overrides what it needs

**20 Template Designs:**
1. Classic Professional (Blue formal)
2. Modern Minimal (Clean grayscale)
3. Pharmacy Green (Health green theme)
4. Corporate Blue (Business formal)
5. Warm Healthcare (Orange/coral tones)
6. Medical Trust (Teal medical)
7. Simple Receipt (Thermal print style)
8. Premium Gold (Gold accents)
9. Digital Modern (Gradient blue)
10. Traditional (Green/white)
11. Fresh Mint (Mint green)
12. Bold Statement (High contrast B/W)
13. Soft Pastel (Pink/lavender)
14. Night Mode (Dark theme)
15. Eco Friendly (Nature green/brown)
16. Tech Pharma (Purple tech)
17. Retro Classic (Vintage sepia)
18. Clean Clinical (Hospital white/blue)
19. Gradient Flow (Color gradient)
20. Split Design (Two-tone split)

### 3. Form Component (`js/form.js`)
- Customer name, date, and amount inputs
- Real-time validation
- **Live preview** updates on input (debounced 300ms)
- Accessible with proper labels and error messages

### 4. Preview Component (`js/preview.js`)
- Renders selected medicines in table format
- Displays store info (name, logo, address)
- Updates in real-time as user types
- Generates unique bill numbers

### 5. PDF Generation (`js/pdf.js`)
- Uses **html2pdf.js** (CDN)
- A4 format, high-quality rendering
- Filename includes customer name and bill number
- Loading state during generation

## Data Files

### medicines.json (50+ medicines)
**Price distribution for algorithm flexibility:**
- Low range (PKR 20-100): 15 medicines
- Medium range (PKR 100-300): 20 medicines
- High range (PKR 300-800): 10 medicines
- Premium range (PKR 800-2000): 5+ medicines

```json
{
  "id": "MED001",
  "name": "Panadol Extra",
  "genericName": "Paracetamol + Caffeine",
  "manufacturer": "GSK Pakistan",
  "category": "painkiller",
  "strength": "500mg + 65mg",
  "packSize": "10 tablets",
  "price": 85,
  "minQty": 1,
  "maxQty": 3
}
```

### stores.json (20 pharmacies)
Covering major Pakistani cities: Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta

```json
{
  "id": "STORE001",
  "name": "Al-Shifa Medical Store",
  "tagline": "Your Health, Our Priority",
  "logo": "data:image/svg+xml;base64,...",
  "address": {
    "street": "Shop #12, Main Boulevard",
    "area": "Gulberg III",
    "city": "Lahore",
    "phone": "042-35761234",
    "mobile": "0300-1234567"
  },
  "license": "DL-PB-12345",
  "ntn": "1234567-8"
}
```

## Implementation Order

1. **Create folder structure** and base files
2. **Build data files** (medicines.json, stores.json, templates.json)
3. **Implement medicine-selector.js** (core algorithm)
4. **Create HTML structure** (index.html with semantic markup)
5. **Build CSS files** (main.css, form.css, preview.css)
6. **Implement all 20 templates** (templates/templates.css)
7. **Build JavaScript components**:
   - template-manager.js
   - form.js
   - preview.js
   - pdf.js
   - app.js (main orchestrator)
8. **Testing and refinement**

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Create | Main application entry |
| `css/main.css` | Create | Global styles, reset |
| `css/form.css` | Create | Form component styles |
| `css/preview.css` | Create | Bill preview base styles |
| `css/templates/templates.css` | Create | 20 template variations |
| `js/app.js` | Create | Main application init |
| `js/form.js` | Create | Form handling/validation |
| `js/preview.js` | Create | Bill preview rendering |
| `js/pdf.js` | Create | PDF generation |
| `js/medicine-selector.js` | Create | Medicine selection algorithm |
| `js/template-manager.js` | Create | Template cycling |
| `data/medicines.json` | Create | 50+ medicine database |
| `data/stores.json` | Create | 20 pharmacy stores |
| `data/templates.json` | Create | Template configurations |

## Verification Plan

1. **Open index.html in browser** - Application loads without errors
2. **Enter form data** - Customer name, date, amount (e.g., PKR 2500)
3. **Verify live preview** - Bill updates as you type
4. **Check medicine selection** - 5-10 items that approximately sum to total
5. **Cycle templates** - All 20 templates display correctly
6. **Change store** - Store info updates in preview
7. **Download PDF** - Generates valid PDF with all bill content
8. **Test edge cases**:
   - Minimum amount (PKR 100)
   - Large amount (PKR 50,000+)
   - Regenerate button produces different medicine combinations
9. **Responsive check** - Works on mobile viewport
