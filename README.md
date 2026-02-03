# Medical Bill Generator

A professional, production-ready medical bill generator application that works entirely in the browser with no server required. Users enter customer details and a total amount, and the app auto-selects medicines that sum to that amount.

## Features

- **No Server Required**: Works directly from the file system - just open `index.html` in your browser
- **Automatic Medicine Selection**: Intelligent algorithm selects medicines to match your target amount (within 5% tolerance)
- **90+ Pakistani Medicines**: Comprehensive database including:
  - Painkillers & Fever medicines
  - Antibiotics
  - Diabetes medicines & Insulin products
  - Cardiac & Cholesterol medicines
  - Maternity & Prenatal vitamins
  - Post-maternity & Lactation support
  - Baby care products
  - Vitamins & Supplements
- **30 Pharmacy Stores**: Covering major Pakistani cities including:
  - 13 Karachi stores
  - 5 Lahore stores
  - 4 Islamabad stores
  - 2 Rawalpindi stores
  - 3 Faisalabad stores
  - Plus Multan, Peshawar, and Quetta
- **20 Professional Templates**: Various design styles from classic to modern
- **Multiple Paper Sizes**: A4, A5, Letter, Legal, and Half-Letter
- **Live Preview**: See your bill update in real-time as you type
- **PDF Download**: Generate high-quality PDF invoices

## Quick Start

1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Fill in the customer details:
   - Customer Name
   - Bill Date
   - Total Amount (PKR 100 - 500,000)
4. Select a pharmacy store and bill template
5. Choose your preferred paper size
6. Click "Download PDF" to save your bill

## Project Structure

```
bill-generator/
├── index.html              # Main application entry point
├── css/
│   ├── main.css            # Global styles, reset, utilities
│   ├── form.css            # Form component styles
│   ├── preview.css         # Bill preview base styles
│   └── templates/
│       └── templates.css   # All 20 template style variations
├── js/
│   ├── data.js             # Embedded data (medicines, stores, templates)
│   ├── app.js              # Main application initialization
│   ├── form.js             # Form handling and validation
│   ├── preview.js          # Bill preview rendering
│   ├── pdf.js              # PDF generation with paper size support
│   ├── medicine-selector.js # Algorithm for selecting medicines
│   └── template-manager.js  # Template cycling and management
└── data/
    ├── medicines.json      # Medicine database (also embedded in data.js)
    ├── stores.json         # Pharmacy stores (also embedded in data.js)
    └── templates.json      # Template configurations
```

## Medicine Categories

| Category | Count | Price Range (PKR) |
|----------|-------|-------------------|
| Painkillers & Fever | 9 | 45 - 255 |
| Antibiotics | 8 | 150 - 680 |
| Diabetes Medicines | 7 | 285 - 4,500 |
| Insulin Products | 10 | 350 - 5,500 |
| Cardiac & Cholesterol | 9 | 310 - 8,500 |
| Maternity & Prenatal | 10 | 120 - 8,500 |
| Post-Maternity | 8 | 180 - 4,500 |
| Baby Care | 4 | 280 - 850 |
| Gastric & Antacids | 5 | 60 - 420 |
| Respiratory & Cold | 7 | 95 - 2,850 |
| Vitamins & Supplements | 6 | 35 - 950 |
| And more... | | |

## Templates

1. Classic Professional - Blue formal design
2. Modern Minimal - Clean grayscale
3. Pharmacy Green - Health-focused green theme
4. Corporate Blue - Business formal
5. Warm Healthcare - Orange/coral tones
6. Medical Trust - Teal medical
7. Simple Receipt - Thermal print style
8. Premium Gold - Luxury gold accents
9. Digital Modern - Gradient blue tech look
10. Traditional - Classic green and white
11. Fresh Mint - Light mint green
12. Bold Statement - High contrast B/W
13. Soft Pastel - Pink and lavender
14. Night Mode - Dark theme
15. Eco Friendly - Nature green/brown
16. Tech Pharma - Purple tech aesthetic
17. Retro Classic - Vintage sepia
18. Clean Clinical - Hospital white/blue
19. Gradient Flow - Color gradient
20. Split Design - Two-tone split

## Paper Sizes

- **A4** (210 × 297 mm) - Default, standard international size
- **A5** (148 × 210 mm) - Half of A4, compact bills
- **Letter** (8.5 × 11 in) - US standard
- **Legal** (8.5 × 14 in) - US legal size
- **Half Letter** (5.5 × 8.5 in) - Compact US size

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- Vanilla JavaScript (ES6+)
- CSS3 with Custom Properties
- html2pdf.js for PDF generation

## License

For demonstration purposes only.

## Credits

Medicine data based on commonly available Pakistani pharmaceutical products. Store information is fictional and for demonstration purposes.
