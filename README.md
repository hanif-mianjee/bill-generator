# Medical Bill Generator

A professional, production-ready medical bill generator application that works entirely in the browser with no server required. Generate single or multiple pharmacy bills with automatic medicine selection.

## Features

- **No Server Required**: Works directly from the file system - just open `index.html` in your browser
- **Multiple Bills Support**: Enter multiple amounts to generate multiple bills in a single PDF
- **Automatic Medicine Selection**: Intelligent algorithm selects medicines to match your target amount (bill total always >= entered amount)
- **Different Dates Per Bill**: Each bill in a multi-bill PDF gets a unique date (spread over multiple days)
- **90+ Pakistani Medicines**: Comprehensive database including all major categories
- **30 Pharmacy Stores**: Covering major Pakistani cities
- **21 Professional Templates**: Including thermal printer style (default)
- **6 Paper Sizes**: Including thermal (80mm) for receipt printers
- **Live Preview**: See your bill update in real-time as you type
- **PDF Download**: Generate high-quality PDF invoices

## Quick Start

1. Download or clone this repository
2. Open `index.html` in any modern web browser (Chrome recommended)
3. Fill in the customer details:
   - Customer Name
   - Bill Date
   - Total Amount(s) - enter one amount per line for multiple bills
4. Select a pharmacy store (click purple **Shuffle** button for random)
5. Choose a bill template (click purple **Shuffle** button for random)
6. Select paper size (thermal 80mm is default)
7. Click "Download PDF" to save your bill(s)

## How to Use

### Single Bill
1. Enter customer name and date
2. Enter a single amount (e.g., `5000`)
3. Click "Download PDF"

### Multiple Bills (One PDF)
1. Enter customer name and date
2. Enter multiple amounts, one per line:
   ```
   5000
   7500
   3200
   12000
   ```
3. Click "Download X Bills" - all bills combined in one PDF
4. Each bill automatically gets:
   - **Different medicines** (unique selection per bill)
   - **Different dates** (spread 1-3 days apart going backwards)
   - **Unique bill number**

### Shuffle Buttons
The purple **Shuffle** buttons next to Store and Template dropdowns let you quickly randomize your selection. Click them to try different stores or templates instantly.

### Paper Size & Template Auto-Switch
When you select **Thermal (80mm)** paper size, the template automatically switches to **Thermal Print** for optimal formatting.

## Project Structure

```
bill-generator/
├── index.html              # Main application entry point
├── README.md               # This file
├── css/
│   ├── main.css            # Global styles, reset, utilities
│   ├── form.css            # Form component styles
│   ├── preview.css         # Bill preview base styles
│   └── templates/
│       └── templates.css   # All 21 template style variations
└── js/
    ├── data.js             # Embedded data (medicines, stores, templates)
    ├── app.js              # Main application initialization
    ├── form.js             # Form handling and validation
    ├── preview.js          # Bill preview rendering
    ├── pdf.js              # PDF generation with paper size support
    ├── medicine-selector.js # Algorithm for selecting medicines
    └── template-manager.js  # Template cycling and management
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
| Topical & Creams | 4 | 235 - 345 |
| Others | 4 | 90 - 520 |

## Templates

1. **Thermal Print** (Default) - 80mm thermal printer style with monospace font
2. Simple Receipt - Receipt style print
3. Classic Professional - Blue formal design
4. Modern Minimal - Clean grayscale
5. Pharmacy Green - Health-focused green theme
6. Corporate Blue - Business formal
7. Warm Healthcare - Orange/coral tones
8. Medical Trust - Teal medical
9. Premium Gold - Luxury gold accents
10. Digital Modern - Gradient blue tech look
11. Traditional - Classic green and white
12. Fresh Mint - Light mint green
13. Bold Statement - High contrast B/W
14. Soft Pastel - Pink and lavender
15. Night Mode - Dark theme
16. Eco Friendly - Nature green/brown
17. Tech Pharma - Purple tech aesthetic
18. Retro Classic - Vintage sepia
19. Clean Clinical - Hospital white/blue
20. Gradient Flow - Color gradient
21. Split Design - Two-tone split

## Paper Sizes

| Size | Dimensions | Best For |
|------|------------|----------|
| **Thermal** (Default) | 80mm width | Receipt/thermal printers |
| A5 | 148 × 210 mm | Compact bills |
| Half Letter | 5.5 × 8.5 in | Compact US size |
| A4 | 210 × 297 mm | Standard international |
| Letter | 8.5 × 11 in | US standard |
| Legal | 8.5 × 14 in | US legal size |

## Pharmacy Stores (30 Total)

### By City
- **Karachi**: 13 stores
- **Lahore**: 5 stores
- **Islamabad**: 4 stores
- **Rawalpindi**: 2 stores
- **Faisalabad**: 3 stores
- **Multan**: 1 store
- **Peshawar**: 1 store
- **Quetta**: 1 store

## Technical Details

### Medicine Selection Algorithm
- Uses tiered greedy approach with randomization
- Categorizes medicines into price tiers (low/medium/high/premium)
- **Bill total is always >= entered amount** (within 5% tolerance above)
- Selects 3-8 items depending on amount
- Different medicines for each bill in multi-bill mode

### Multi-Bill Date Generation
- First bill uses the selected date
- Subsequent bills get dates going backwards (1-3 days apart randomly)
- Creates realistic date spread for multiple bills

### Browser Compatibility
Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Technologies Used
- Vanilla JavaScript (ES6+)
- CSS3 with Custom Properties
- html2pdf.js for PDF generation

## Troubleshooting

### PDF has multiple pages for single bill
- Use thermal or A5 paper size for single-page bills
- The app automatically reduces spacing for compact output

### Bill total doesn't match entered amount
- Bill total will always be **equal to or slightly higher** than entered amount
- This ensures the bill is never less than requested

### Shuffle buttons not visible
- Look for the purple "Shuffle" buttons next to Store and Template dropdowns
- They have text labels and hover effects for better visibility

### Logos not showing
- Logos are embedded as SVG data URIs - no external files needed
- If issues persist, try refreshing the page

## License

For demonstration purposes only.

## Credits

Medicine data based on commonly available Pakistani pharmaceutical products. Store information is fictional and for demonstration purposes.
