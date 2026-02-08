/**
 * Embedded Data
 * Contains all application data to avoid CORS issues when opening directly from file system
 */

const APP_DATA = {
  medicines: [
    // PAINKILLERS & FEVER
    { "id": "MED001", "name": "Panadol Extra", "genericName": "Paracetamol + Caffeine", "manufacturer": "GSK Pakistan", "category": "painkiller", "strength": "500mg + 65mg", "packSize": "10 tablets", "price": 85, "minQty": 1, "maxQty": 5 },
    { "id": "MED002", "name": "Disprin", "genericName": "Aspirin", "manufacturer": "Reckitt Benckiser", "category": "painkiller", "strength": "300mg", "packSize": "10 tablets", "price": 45, "minQty": 1, "maxQty": 5 },
    { "id": "MED003", "name": "Ponstan", "genericName": "Mefenamic Acid", "manufacturer": "Pfizer Pakistan", "category": "painkiller", "strength": "500mg", "packSize": "10 tablets", "price": 120, "minQty": 1, "maxQty": 5 },
    { "id": "MED004", "name": "Brufen", "genericName": "Ibuprofen", "manufacturer": "Abbott Pakistan", "category": "painkiller", "strength": "400mg", "packSize": "20 tablets", "price": 180, "minQty": 1, "maxQty": 4 },
    { "id": "MED005", "name": "Voltral", "genericName": "Diclofenac Sodium", "manufacturer": "Novartis Pakistan", "category": "painkiller", "strength": "50mg", "packSize": "20 tablets", "price": 220, "minQty": 1, "maxQty": 4 },
    { "id": "MED048", "name": "Tramal", "genericName": "Tramadol", "manufacturer": "Grunenthal", "category": "painkiller", "strength": "50mg", "packSize": "10 capsules", "price": 255, "minQty": 1, "maxQty": 3 },
    { "id": "MED049", "name": "Synflex", "genericName": "Naproxen Sodium", "manufacturer": "Roche Pakistan", "category": "painkiller", "strength": "550mg", "packSize": "10 tablets", "price": 175, "minQty": 1, "maxQty": 4 },
    { "id": "MED033", "name": "Calpol", "genericName": "Paracetamol", "manufacturer": "GSK Pakistan", "category": "painkiller", "strength": "120mg/5ml", "packSize": "60ml syrup", "price": 75, "minQty": 1, "maxQty": 5 },
    { "id": "MED034", "name": "Nurofen", "genericName": "Ibuprofen", "manufacturer": "Reckitt Benckiser", "category": "painkiller", "strength": "100mg/5ml", "packSize": "100ml syrup", "price": 195, "minQty": 1, "maxQty": 3 },

    // ANTIBIOTICS
    { "id": "MED006", "name": "Flagyl", "genericName": "Metronidazole", "manufacturer": "Sanofi Pakistan", "category": "antibiotic", "strength": "400mg", "packSize": "20 tablets", "price": 150, "minQty": 1, "maxQty": 4 },
    { "id": "MED007", "name": "Augmentin", "genericName": "Amoxicillin + Clavulanic Acid", "manufacturer": "GSK Pakistan", "category": "antibiotic", "strength": "625mg", "packSize": "6 tablets", "price": 450, "minQty": 1, "maxQty": 4 },
    { "id": "MED008", "name": "Azomax", "genericName": "Azithromycin", "manufacturer": "Getz Pharma", "category": "antibiotic", "strength": "500mg", "packSize": "3 tablets", "price": 380, "minQty": 1, "maxQty": 4 },
    { "id": "MED009", "name": "Ceclor", "genericName": "Cefaclor", "manufacturer": "Eli Lilly", "category": "antibiotic", "strength": "250mg", "packSize": "12 capsules", "price": 520, "minQty": 1, "maxQty": 3 },
    { "id": "MED010", "name": "Ciproxin", "genericName": "Ciprofloxacin", "manufacturer": "Bayer Pakistan", "category": "antibiotic", "strength": "500mg", "packSize": "10 tablets", "price": 350, "minQty": 1, "maxQty": 4 },
    { "id": "MED050", "name": "Softin", "genericName": "Cefixime", "manufacturer": "Getz Pharma", "category": "antibiotic", "strength": "200mg", "packSize": "10 capsules", "price": 340, "minQty": 1, "maxQty": 4 },
    { "id": "MED051", "name": "Zinnat", "genericName": "Cefuroxime", "manufacturer": "GSK Pakistan", "category": "antibiotic", "strength": "500mg", "packSize": "10 tablets", "price": 680, "minQty": 1, "maxQty": 3 },
    { "id": "MED052", "name": "Velosef", "genericName": "Cephradine", "manufacturer": "Bristol-Myers", "category": "antibiotic", "strength": "500mg", "packSize": "12 capsules", "price": 420, "minQty": 1, "maxQty": 4 },

    // GASTRIC & ANTACIDS
    { "id": "MED011", "name": "Risek", "genericName": "Omeprazole", "manufacturer": "Getz Pharma", "category": "gastric", "strength": "20mg", "packSize": "14 capsules", "price": 280, "minQty": 1, "maxQty": 4 },
    { "id": "MED012", "name": "Nexum", "genericName": "Esomeprazole", "manufacturer": "Getz Pharma", "category": "gastric", "strength": "40mg", "packSize": "14 tablets", "price": 420, "minQty": 1, "maxQty": 4 },
    { "id": "MED013", "name": "Motilium", "genericName": "Domperidone", "manufacturer": "Johnson & Johnson", "category": "gastric", "strength": "10mg", "packSize": "30 tablets", "price": 195, "minQty": 1, "maxQty": 4 },
    { "id": "MED014", "name": "Eno", "genericName": "Sodium Bicarbonate", "manufacturer": "GSK Pakistan", "category": "antacid", "strength": "5g", "packSize": "6 sachets", "price": 60, "minQty": 1, "maxQty": 10 },
    { "id": "MED015", "name": "Gaviscon", "genericName": "Alginate + Antacid", "manufacturer": "Reckitt Benckiser", "category": "antacid", "strength": "500mg", "packSize": "150ml syrup", "price": 320, "minQty": 1, "maxQty": 3 },

    // ANTIALLERGY
    { "id": "MED016", "name": "Zyrtec", "genericName": "Cetirizine", "manufacturer": "GSK Pakistan", "category": "antiallergy", "strength": "10mg", "packSize": "10 tablets", "price": 95, "minQty": 1, "maxQty": 5 },
    { "id": "MED017", "name": "Telfast", "genericName": "Fexofenadine", "manufacturer": "Sanofi Pakistan", "category": "antiallergy", "strength": "180mg", "packSize": "10 tablets", "price": 240, "minQty": 1, "maxQty": 4 },
    { "id": "MED018", "name": "Claritin", "genericName": "Loratadine", "manufacturer": "Schering-Plough", "category": "antiallergy", "strength": "10mg", "packSize": "10 tablets", "price": 185, "minQty": 1, "maxQty": 4 },

    // RESPIRATORY
    { "id": "MED019", "name": "Ventolin Inhaler", "genericName": "Salbutamol", "manufacturer": "GSK Pakistan", "category": "respiratory", "strength": "100mcg", "packSize": "200 doses", "price": 650, "minQty": 1, "maxQty": 3 },
    { "id": "MED020", "name": "Seretide", "genericName": "Fluticasone + Salmeterol", "manufacturer": "GSK Pakistan", "category": "respiratory", "strength": "250/50mcg", "packSize": "60 doses", "price": 2850, "minQty": 1, "maxQty": 2 },
    { "id": "MED021", "name": "Actifed", "genericName": "Triprolidine + Pseudoephedrine", "manufacturer": "GSK Pakistan", "category": "cold", "strength": "2.5mg + 60mg", "packSize": "100ml syrup", "price": 165, "minQty": 1, "maxQty": 4 },
    { "id": "MED022", "name": "Corex-D", "genericName": "Dextromethorphan + CPM", "manufacturer": "Pfizer Pakistan", "category": "cough", "strength": "10mg + 4mg", "packSize": "120ml syrup", "price": 140, "minQty": 1, "maxQty": 4 },
    { "id": "MED023", "name": "Ambroxol", "genericName": "Ambroxol HCl", "manufacturer": "Boehringer", "category": "cough", "strength": "30mg", "packSize": "100ml syrup", "price": 125, "minQty": 1, "maxQty": 4 },
    { "id": "MED055", "name": "Nasivion", "genericName": "Oxymetazoline", "manufacturer": "Merck Pakistan", "category": "nasal", "strength": "0.05%", "packSize": "10ml drops", "price": 145, "minQty": 1, "maxQty": 4 },
    { "id": "MED053", "name": "Strepsils", "genericName": "Amylmetacresol", "manufacturer": "Reckitt Benckiser", "category": "throat", "strength": "Lozenges", "packSize": "24 lozenges", "price": 95, "minQty": 1, "maxQty": 5 },

    // DIABETES MEDICINES
    { "id": "MED024", "name": "Glucophage", "genericName": "Metformin", "manufacturer": "Merck Pakistan", "category": "diabetes", "strength": "500mg", "packSize": "30 tablets", "price": 285, "minQty": 1, "maxQty": 4 },
    { "id": "MED025", "name": "Amaryl", "genericName": "Glimepiride", "manufacturer": "Sanofi Pakistan", "category": "diabetes", "strength": "2mg", "packSize": "30 tablets", "price": 580, "minQty": 1, "maxQty": 3 },
    { "id": "MED026", "name": "Januvia", "genericName": "Sitagliptin", "manufacturer": "MSD Pakistan", "category": "diabetes", "strength": "100mg", "packSize": "14 tablets", "price": 2650, "minQty": 1, "maxQty": 3 },
    { "id": "MED056", "name": "Galvus", "genericName": "Vildagliptin", "manufacturer": "Novartis Pakistan", "category": "diabetes", "strength": "50mg", "packSize": "28 tablets", "price": 2200, "minQty": 1, "maxQty": 3 },
    { "id": "MED057", "name": "Jardiance", "genericName": "Empagliflozin", "manufacturer": "Boehringer", "category": "diabetes", "strength": "25mg", "packSize": "30 tablets", "price": 4500, "minQty": 1, "maxQty": 2 },
    { "id": "MED058", "name": "Trajenta", "genericName": "Linagliptin", "manufacturer": "Boehringer", "category": "diabetes", "strength": "5mg", "packSize": "30 tablets", "price": 3200, "minQty": 1, "maxQty": 2 },
    { "id": "MED059", "name": "Glucobay", "genericName": "Acarbose", "manufacturer": "Bayer Pakistan", "category": "diabetes", "strength": "50mg", "packSize": "30 tablets", "price": 850, "minQty": 1, "maxQty": 3 },

    // INSULIN PRODUCTS
    { "id": "MED060", "name": "Lantus SoloStar", "genericName": "Insulin Glargine", "manufacturer": "Sanofi Pakistan", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml pen", "price": 4200, "minQty": 1, "maxQty": 5 },
    { "id": "MED061", "name": "NovoRapid FlexPen", "genericName": "Insulin Aspart", "manufacturer": "Novo Nordisk", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml pen", "price": 3800, "minQty": 1, "maxQty": 5 },
    { "id": "MED062", "name": "Humalog KwikPen", "genericName": "Insulin Lispro", "manufacturer": "Eli Lilly", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml pen", "price": 3950, "minQty": 1, "maxQty": 5 },
    { "id": "MED063", "name": "Levemir FlexTouch", "genericName": "Insulin Detemir", "manufacturer": "Novo Nordisk", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml pen", "price": 4100, "minQty": 1, "maxQty": 5 },
    { "id": "MED064", "name": "Tresiba FlexTouch", "genericName": "Insulin Degludec", "manufacturer": "Novo Nordisk", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml pen", "price": 5500, "minQty": 1, "maxQty": 4 },
    { "id": "MED065", "name": "Humulin 70/30", "genericName": "Human Insulin Mix", "manufacturer": "Eli Lilly", "category": "insulin", "strength": "100 IU/ml", "packSize": "10ml vial", "price": 1850, "minQty": 1, "maxQty": 4 },
    { "id": "MED066", "name": "Mixtard 30 Penfill", "genericName": "Human Insulin Mix", "manufacturer": "Novo Nordisk", "category": "insulin", "strength": "100 IU/ml", "packSize": "3ml cartridge", "price": 1200, "minQty": 1, "maxQty": 6 },
    { "id": "MED067", "name": "Insulin Syringes", "genericName": "BD Ultra-Fine", "manufacturer": "BD Medical", "category": "diabetic-supplies", "strength": "0.5ml", "packSize": "10 syringes", "price": 350, "minQty": 1, "maxQty": 10 },
    { "id": "MED068", "name": "Glucometer Strips", "genericName": "Blood Glucose Test Strips", "manufacturer": "Accu-Chek", "category": "diabetic-supplies", "strength": "Standard", "packSize": "50 strips", "price": 1800, "minQty": 1, "maxQty": 4 },
    { "id": "MED069", "name": "Lancets", "genericName": "Blood Lancets", "manufacturer": "Accu-Chek", "category": "diabetic-supplies", "strength": "28G", "packSize": "100 lancets", "price": 450, "minQty": 1, "maxQty": 5 },

    // CARDIAC MEDICINES
    { "id": "MED027", "name": "Concor", "genericName": "Bisoprolol", "manufacturer": "Merck Pakistan", "category": "cardiac", "strength": "5mg", "packSize": "30 tablets", "price": 495, "minQty": 1, "maxQty": 3 },
    { "id": "MED028", "name": "Tenormin", "genericName": "Atenolol", "manufacturer": "AstraZeneca", "category": "cardiac", "strength": "50mg", "packSize": "28 tablets", "price": 365, "minQty": 1, "maxQty": 4 },
    { "id": "MED029", "name": "Lopressor", "genericName": "Metoprolol", "manufacturer": "Novartis Pakistan", "category": "cardiac", "strength": "50mg", "packSize": "20 tablets", "price": 310, "minQty": 1, "maxQty": 4 },
    { "id": "MED030", "name": "Zestril", "genericName": "Lisinopril", "manufacturer": "AstraZeneca", "category": "cardiac", "strength": "10mg", "packSize": "14 tablets", "price": 390, "minQty": 1, "maxQty": 4 },
    { "id": "MED031", "name": "Lipitor", "genericName": "Atorvastatin", "manufacturer": "Pfizer Pakistan", "category": "cholesterol", "strength": "20mg", "packSize": "30 tablets", "price": 950, "minQty": 1, "maxQty": 3 },
    { "id": "MED032", "name": "Crestor", "genericName": "Rosuvastatin", "manufacturer": "AstraZeneca", "category": "cholesterol", "strength": "10mg", "packSize": "28 tablets", "price": 1450, "minQty": 1, "maxQty": 3 },
    { "id": "MED070", "name": "Plavix", "genericName": "Clopidogrel", "manufacturer": "Sanofi Pakistan", "category": "cardiac", "strength": "75mg", "packSize": "28 tablets", "price": 1850, "minQty": 1, "maxQty": 3 },
    { "id": "MED071", "name": "Eliquis", "genericName": "Apixaban", "manufacturer": "Pfizer Pakistan", "category": "cardiac", "strength": "5mg", "packSize": "60 tablets", "price": 8500, "minQty": 1, "maxQty": 2 },
    { "id": "MED072", "name": "Xarelto", "genericName": "Rivaroxaban", "manufacturer": "Bayer Pakistan", "category": "cardiac", "strength": "20mg", "packSize": "28 tablets", "price": 6200, "minQty": 1, "maxQty": 2 },

    // MATERNITY & PRENATAL
    { "id": "MED073", "name": "Folic Acid", "genericName": "Folic Acid", "manufacturer": "GSK Pakistan", "category": "maternity", "strength": "5mg", "packSize": "100 tablets", "price": 180, "minQty": 1, "maxQty": 5 },
    { "id": "MED074", "name": "Pregnacare Original", "genericName": "Prenatal Multivitamin", "manufacturer": "Vitabiotics", "category": "maternity", "strength": "Complete", "packSize": "30 tablets", "price": 2200, "minQty": 1, "maxQty": 4 },
    { "id": "MED075", "name": "Elevit Pronatal", "genericName": "Prenatal Vitamins + Minerals", "manufacturer": "Bayer Pakistan", "category": "maternity", "strength": "Complete", "packSize": "30 tablets", "price": 2800, "minQty": 1, "maxQty": 4 },
    { "id": "MED076", "name": "Iberet Folic-500", "genericName": "Iron + Folic Acid + B12", "manufacturer": "Abbott Pakistan", "category": "maternity", "strength": "525mg", "packSize": "30 tablets", "price": 650, "minQty": 1, "maxQty": 4 },
    { "id": "MED077", "name": "Ferrous Sulfate", "genericName": "Iron Supplement", "manufacturer": "Local Pharma", "category": "maternity", "strength": "200mg", "packSize": "100 tablets", "price": 120, "minQty": 1, "maxQty": 5 },
    { "id": "MED078", "name": "Calcium + D3", "genericName": "Calcium Carbonate + Vitamin D3", "manufacturer": "Getz Pharma", "category": "maternity", "strength": "600mg + 400IU", "packSize": "30 tablets", "price": 450, "minQty": 1, "maxQty": 5 },
    { "id": "MED079", "name": "Progesterone", "genericName": "Progesterone", "manufacturer": "Pharmatec", "category": "maternity", "strength": "200mg", "packSize": "30 capsules", "price": 1800, "minQty": 1, "maxQty": 3 },
    { "id": "MED080", "name": "Duphaston", "genericName": "Dydrogesterone", "manufacturer": "Abbott Pakistan", "category": "maternity", "strength": "10mg", "packSize": "20 tablets", "price": 1650, "minQty": 1, "maxQty": 4 },
    { "id": "MED081", "name": "Anti-D Immunoglobulin", "genericName": "Rho(D) Immune Globulin", "manufacturer": "CSL Behring", "category": "maternity", "strength": "300mcg", "packSize": "1 injection", "price": 8500, "minQty": 1, "maxQty": 2 },
    { "id": "MED082", "name": "Cytotec", "genericName": "Misoprostol", "manufacturer": "Pfizer Pakistan", "category": "maternity", "strength": "200mcg", "packSize": "28 tablets", "price": 1200, "minQty": 1, "maxQty": 2 },

    // POST-MATERNITY & LACTATION
    { "id": "MED083", "name": "Lactare", "genericName": "Galactagogue", "manufacturer": "TTK Healthcare", "category": "post-maternity", "strength": "Herbal", "packSize": "30 capsules", "price": 850, "minQty": 1, "maxQty": 4 },
    { "id": "MED084", "name": "Galact Granules", "genericName": "Shatavari + Fenugreek", "manufacturer": "Himalaya", "category": "post-maternity", "strength": "Herbal", "packSize": "200g", "price": 750, "minQty": 1, "maxQty": 3 },
    { "id": "MED085", "name": "Domperidone", "genericName": "Domperidone", "manufacturer": "Local Pharma", "category": "post-maternity", "strength": "10mg", "packSize": "30 tablets", "price": 180, "minQty": 1, "maxQty": 5 },
    { "id": "MED086", "name": "Chest Cream", "genericName": "Lanolin", "manufacturer": "Medela", "category": "post-maternity", "strength": "Pure", "packSize": "37g tube", "price": 1200, "minQty": 1, "maxQty": 3 },
    { "id": "MED087", "name": "Feeder Pump", "genericName": "Manual Feeder Pump", "manufacturer": "Philips Avent", "category": "post-maternity", "strength": "Manual", "packSize": "1 unit", "price": 4500, "minQty": 1, "maxQty": 1 },
    { "id": "MED088", "name": "Nursing Pads", "genericName": "Disposable Feeder Pads", "manufacturer": "Pigeon", "category": "post-maternity", "strength": "Standard", "packSize": "36 pads", "price": 650, "minQty": 1, "maxQty": 5 },
    { "id": "MED089", "name": "Postpartum Vitamins", "genericName": "Postnatal Multivitamin", "manufacturer": "Centrum", "category": "post-maternity", "strength": "Complete", "packSize": "60 tablets", "price": 1950, "minQty": 1, "maxQty": 3 },
    { "id": "MED090", "name": "Sitz Bath Salts", "genericName": "Epsom Salt + Herbs", "manufacturer": "Earth Mama", "category": "post-maternity", "strength": "Therapeutic", "packSize": "500g", "price": 1100, "minQty": 1, "maxQty": 3 },

    // BABY CARE
    { "id": "MED091", "name": "Gripe Water", "genericName": "Dill Seed Water", "manufacturer": "Woodward's", "category": "baby-care", "strength": "Standard", "packSize": "150ml", "price": 280, "minQty": 1, "maxQty": 4 },
    { "id": "MED092", "name": "Baby Vitamin D", "genericName": "Cholecalciferol Drops", "manufacturer": "Enfamil", "category": "baby-care", "strength": "400IU/drop", "packSize": "50ml", "price": 850, "minQty": 1, "maxQty": 3 },
    { "id": "MED093", "name": "Colic Drops", "genericName": "Simethicone", "manufacturer": "Infacol", "category": "baby-care", "strength": "40mg/ml", "packSize": "50ml", "price": 450, "minQty": 1, "maxQty": 4 },
    { "id": "MED094", "name": "Diaper Rash Cream", "genericName": "Zinc Oxide", "manufacturer": "Sudocrem", "category": "baby-care", "strength": "15%", "packSize": "125g", "price": 750, "minQty": 1, "maxQty": 3 },

    // VITAMINS & SUPPLEMENTS
    { "id": "MED035", "name": "ORS", "genericName": "Oral Rehydration Salts", "manufacturer": "WHO Formula", "category": "hydration", "strength": "20.5g", "packSize": "5 sachets", "price": 35, "minQty": 1, "maxQty": 20 },
    { "id": "MED038", "name": "Vitamin C", "genericName": "Ascorbic Acid", "manufacturer": "Local Pharma", "category": "vitamin", "strength": "500mg", "packSize": "30 tablets", "price": 65, "minQty": 1, "maxQty": 10 },
    { "id": "MED039", "name": "Centrum", "genericName": "Multivitamin", "manufacturer": "Pfizer Pakistan", "category": "vitamin", "strength": "Complete", "packSize": "30 tablets", "price": 950, "minQty": 1, "maxQty": 3 },
    { "id": "MED040", "name": "Calcimax", "genericName": "Calcium + Vitamin D", "manufacturer": "Getz Pharma", "category": "supplement", "strength": "500mg + 200IU", "packSize": "30 tablets", "price": 395, "minQty": 1, "maxQty": 4 },
    { "id": "MED041", "name": "Ferosoft", "genericName": "Iron + Folic Acid", "manufacturer": "Getz Pharma", "category": "supplement", "strength": "150mg + 0.5mg", "packSize": "30 tablets", "price": 280, "minQty": 1, "maxQty": 4 },
    { "id": "MED042", "name": "Omega-3", "genericName": "Fish Oil", "manufacturer": "Local Pharma", "category": "supplement", "strength": "1000mg", "packSize": "30 softgels", "price": 650, "minQty": 1, "maxQty": 4 },

    // TOPICAL & CREAMS
    { "id": "MED043", "name": "Dermazin", "genericName": "Silver Sulfadiazine", "manufacturer": "Novartis Pakistan", "category": "topical", "strength": "1%", "packSize": "50g cream", "price": 345, "minQty": 1, "maxQty": 3 },
    { "id": "MED044", "name": "Betnovate", "genericName": "Betamethasone", "manufacturer": "GSK Pakistan", "category": "topical", "strength": "0.1%", "packSize": "20g cream", "price": 265, "minQty": 1, "maxQty": 4 },
    { "id": "MED045", "name": "Polyfax", "genericName": "Polymyxin B + Bacitracin", "manufacturer": "GSK Pakistan", "category": "topical", "strength": "Ointment", "packSize": "20g tube", "price": 235, "minQty": 1, "maxQty": 4 },
    { "id": "MED054", "name": "Vicks VapoRub", "genericName": "Menthol + Camphor", "manufacturer": "P&G Pakistan", "category": "topical", "strength": "Ointment", "packSize": "50g jar", "price": 285, "minQty": 1, "maxQty": 4 },

    // OTHER
    { "id": "MED036", "name": "Imodium", "genericName": "Loperamide", "manufacturer": "Johnson & Johnson", "category": "antidiarrheal", "strength": "2mg", "packSize": "6 capsules", "price": 90, "minQty": 1, "maxQty": 5 },
    { "id": "MED037", "name": "Dulcolax", "genericName": "Bisacodyl", "manufacturer": "Boehringer", "category": "laxative", "strength": "5mg", "packSize": "20 tablets", "price": 110, "minQty": 1, "maxQty": 5 },
    { "id": "MED046", "name": "Xanax", "genericName": "Alprazolam", "manufacturer": "Pfizer Pakistan", "category": "anxiety", "strength": "0.5mg", "packSize": "30 tablets", "price": 480, "minQty": 1, "maxQty": 2 },
    { "id": "MED047", "name": "Lexotanil", "genericName": "Bromazepam", "manufacturer": "Roche Pakistan", "category": "anxiety", "strength": "3mg", "packSize": "30 tablets", "price": 520, "minQty": 1, "maxQty": 2 }
  ],

  stores: [
    // LAHORE STORES
    {
      "id": "STORE001",
      "name": "Al-Shifa Medical Store",
      "tagline": "Your Health, Our Priority",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23007550'/%3E%3Crect x='25' y='18' width='10' height='24' fill='white'/%3E%3Crect x='18' y='25' width='24' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Shop #12, Main Boulevard", "area": "Gulberg III", "city": "Lahore", "phone": "042-35761234", "mobile": "0300-1234567" },
      "license": "DL-PB-12345", "ntn": "1234567-8"
    },
    {
      "id": "STORE002",
      "name": "Sehat Pharmacy",
      "tagline": "Complete Healthcare Solutions",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' rx='8' fill='%230066CC'/%3E%3Crect x='25' y='15' width='10' height='30' fill='white'/%3E%3Crect x='15' y='25' width='30' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "145-C, Commercial Area", "area": "DHA Phase 5", "city": "Lahore", "phone": "042-35697412", "mobile": "0321-9876543" },
      "license": "DL-PB-23456", "ntn": "2345678-9"
    },
    {
      "id": "STORE003",
      "name": "Medina Chemist",
      "tagline": "Trusted Since 1985",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' stroke='%23228B22' stroke-width='4' fill='none'/%3E%3Ctext x='30' y='38' font-size='20' fill='%23228B22' text-anchor='middle' font-weight='bold'%3EM%3C/text%3E%3C/svg%3E",
      "address": { "street": "Shop #5, Model Town Link Road", "area": "Model Town", "city": "Lahore", "phone": "042-35162789", "mobile": "0333-4567890" },
      "license": "DL-PB-34567", "ntn": "3456789-0"
    },
    {
      "id": "STORE013",
      "name": "HealthPlus Pharmacy",
      "tagline": "More Than Medicine",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%2300BFFF'/%3E%3Crect x='25' y='18' width='10' height='24' fill='white'/%3E%3Crect x='18' y='25' width='24' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Ground Floor, Packages Mall", "area": "Walton Road", "city": "Lahore", "phone": "042-35123456", "mobile": "0321-5678901" },
      "license": "DL-PB-33456", "ntn": "3345678-0"
    },
    {
      "id": "STORE017",
      "name": "Wellness Pharmacy",
      "tagline": "Wellness Starts Here",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%2332CD50'/%3E%3Crect x='24' y='18' width='12' height='24' fill='white'/%3E%3Crect x='14' y='24' width='32' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Main Ghazi Road", "area": "Cantt", "city": "Lahore", "phone": "042-36612345", "mobile": "0333-5678901" },
      "license": "DL-PB-77890", "ntn": "7789012-4"
    },

    // KARACHI STORES (Original + 10 New)
    {
      "id": "STORE004",
      "name": "Karachi Medical Center",
      "tagline": "24/7 Healthcare Partner",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='8' y='8' width='44' height='44' fill='%23DC143C'/%3E%3Crect x='26' y='16' width='8' height='28' fill='white'/%3E%3Crect x='16' y='26' width='28' height='8' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "A-23, Block 7", "area": "Clifton", "city": "Karachi", "phone": "021-35836921", "mobile": "0345-1234567" },
      "license": "DL-SD-45678", "ntn": "4567890-1"
    },
    {
      "id": "STORE005",
      "name": "Fazal Din's Pharma",
      "tagline": "Quality Medicines Guaranteed",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%234B0082'/%3E%3Ctext x='30' y='40' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EFD%3C/text%3E%3C/svg%3E",
      "address": { "street": "18-Main Tariq Road", "area": "PECHS", "city": "Karachi", "phone": "021-34536789", "mobile": "0312-9876543" },
      "license": "DL-SD-56789", "ntn": "5678901-2"
    },
    {
      "id": "STORE014",
      "name": "D. Watson Pharmacy",
      "tagline": "Your Family Pharmacy",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' fill='%23EA7E00'/%3E%3Ctext x='30' y='42' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EDW%3C/text%3E%3C/svg%3E",
      "address": { "street": "Shop #25, Ocean Mall", "area": "Clifton Block 9", "city": "Karachi", "phone": "021-35891234", "mobile": "0345-8901234" },
      "license": "DL-SD-44567", "ntn": "4456789-1"
    },
    {
      "id": "STORE021",
      "name": "Agha's Pharmacy",
      "tagline": "Serving Karachi Since 1962",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23006400'/%3E%3Ctext x='30' y='40' font-size='22' fill='white' text-anchor='middle' font-weight='bold'%3EAP%3C/text%3E%3C/svg%3E",
      "address": { "street": "Plot 15, Main Shahrah-e-Faisal", "area": "PECHS Block 2", "city": "Karachi", "phone": "021-34320001", "mobile": "0300-2221111" },
      "license": "DL-SD-77801", "ntn": "7780123-1"
    },
    {
      "id": "STORE022",
      "name": "Medi Plus Pharmacy",
      "tagline": "Health First Always",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' rx='10' fill='%231E90FF'/%3E%3Crect x='25' y='15' width='10' height='30' fill='white'/%3E%3Crect x='15' y='25' width='30' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Shop 7, Bahadurabad Chowrangi", "area": "Bahadurabad", "city": "Karachi", "phone": "021-34123456", "mobile": "0321-3332222" },
      "license": "DL-SD-77802", "ntn": "7780234-2"
    },
    {
      "id": "STORE023",
      "name": "Sehat Ghar Pharmacy",
      "tagline": "Affordable Healthcare",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23FF6347'/%3E%3Crect x='24' y='18' width='12' height='24' fill='white'/%3E%3Crect x='18' y='24' width='24' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Block 13-D/1, Main Road", "area": "Gulshan-e-Iqbal", "city": "Karachi", "phone": "021-34981234", "mobile": "0333-4445555" },
      "license": "DL-SD-77803", "ntn": "7780345-3"
    },
    {
      "id": "STORE024",
      "name": "Aman Medical Store",
      "tagline": "Peace of Mind Healthcare",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' rx='8' fill='%23008B8B'/%3E%3Ctext x='30' y='40' font-size='20' fill='white' text-anchor='middle' font-weight='bold'%3EAMS%3C/text%3E%3C/svg%3E",
      "address": { "street": "Plot 45, Block 6", "area": "Federal B Area", "city": "Karachi", "phone": "021-36801234", "mobile": "0300-5556666" },
      "license": "DL-SD-77804", "ntn": "7780456-4"
    },
    {
      "id": "STORE025",
      "name": "Habib Pharmacy",
      "tagline": "Trusted Medicine Partner",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%238B0000'/%3E%3Ctext x='30' y='40' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EHP%3C/text%3E%3C/svg%3E",
      "address": { "street": "Shop 3, North Nazimabad Block H", "area": "North Nazimabad", "city": "Karachi", "phone": "021-36631234", "mobile": "0345-6667777" },
      "license": "DL-SD-77805", "ntn": "7780567-5"
    },
    {
      "id": "STORE026",
      "name": "City Pharma",
      "tagline": "Your City, Your Pharmacy",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='8' y='8' width='44' height='44' rx='6' fill='%234169E1'/%3E%3Crect x='24' y='16' width='12' height='28' fill='white'/%3E%3Crect x='16' y='24' width='28' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Near Ayesha Manzil", "area": "Nazimabad No. 1", "city": "Karachi", "phone": "021-36601111", "mobile": "0312-7778888" },
      "license": "DL-SD-77806", "ntn": "7780678-6"
    },
    {
      "id": "STORE027",
      "name": "Defence Pharmacy",
      "tagline": "Premium Healthcare Solutions",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23191970'/%3E%3Crect x='25' y='18' width='10' height='24' fill='gold'/%3E%3Crect x='18' y='25' width='24' height='10' fill='gold'/%3E%3C/svg%3E",
      "address": { "street": "Shop 12, Zamzama Commercial", "area": "DHA Phase 5", "city": "Karachi", "phone": "021-35831234", "mobile": "0300-8889999" },
      "license": "DL-SD-77807", "ntn": "7780789-7"
    },
    {
      "id": "STORE028",
      "name": "Korangi Medical Store",
      "tagline": "Healthcare for Everyone",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' fill='%23556B2F'/%3E%3Crect x='24' y='14' width='12' height='32' fill='white'/%3E%3Crect x='14' y='24' width='32' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Sector 33, Main Road", "area": "Korangi Industrial Area", "city": "Karachi", "phone": "021-35051234", "mobile": "0321-9990000" },
      "license": "DL-SD-77808", "ntn": "7780890-8"
    },
    {
      "id": "STORE029",
      "name": "Al-Noor Pharmacy",
      "tagline": "Light of Health",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23DAA520'/%3E%3Crect x='25' y='18' width='10' height='24' fill='white'/%3E%3Crect x='18' y='25' width='24' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Block 2, Near Askari Park", "area": "Gulistan-e-Johar", "city": "Karachi", "phone": "021-34611234", "mobile": "0333-1112222" },
      "license": "DL-SD-77809", "ntn": "7780901-9"
    },
    {
      "id": "STORE030",
      "name": "Malir Pharmacy",
      "tagline": "Community Health Partner",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='8' y='8' width='44' height='44' rx='22' fill='%232F4F4F'/%3E%3Crect x='26' y='18' width='8' height='24' fill='white'/%3E%3Crect x='18' y='26' width='24' height='8' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Near Jinnah International Airport", "area": "Malir Cantt", "city": "Karachi", "phone": "021-34571234", "mobile": "0345-2223333" },
      "license": "DL-SD-77810", "ntn": "7781012-0"
    },

    // ISLAMABAD STORES
    {
      "id": "STORE006",
      "name": "Islamabad Pharmacy",
      "tagline": "Modern Medicine, Traditional Care",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='10' y='10' width='40' height='40' rx='20' fill='%23008080'/%3E%3Crect x='25' y='20' width='10' height='20' fill='white'/%3E%3Crect x='20' y='25' width='20' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Shop #8, Jinnah Super Market", "area": "F-7 Markaz", "city": "Islamabad", "phone": "051-2654789", "mobile": "0300-5678901" },
      "license": "DL-ICT-67890", "ntn": "6789012-3"
    },
    {
      "id": "STORE007",
      "name": "Blue Area Chemist",
      "tagline": "Your Neighborhood Pharmacy",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%231A5FB4'/%3E%3Crect x='24' y='18' width='12' height='24' fill='white'/%3E%3Crect x='14' y='24' width='32' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Office #3, Ufone Tower", "area": "Blue Area", "city": "Islamabad", "phone": "051-2871234", "mobile": "0321-2345678" },
      "license": "DL-ICT-78901", "ntn": "7890123-4"
    },
    {
      "id": "STORE015",
      "name": "Care Pharmacy",
      "tagline": "Because We Care",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' fill='%23FF1493'/%3E%3Crect x='26' y='20' width='8' height='20' fill='white'/%3E%3Crect x='20' y='26' width='20' height='8' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "House #45, Street 12", "area": "G-10/2", "city": "Islamabad", "phone": "051-2112345", "mobile": "0300-2345678" },
      "license": "DL-ICT-55678", "ntn": "5567890-2"
    },
    {
      "id": "STORE020",
      "name": "Family Pharmacy",
      "tagline": "Caring for Families",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='8' y='8' width='44' height='44' rx='22' fill='%2387CEEB'/%3E%3Crect x='26' y='20' width='8' height='20' fill='white'/%3E%3Crect x='20' y='26' width='20' height='8' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "House #234, Street 5", "area": "PWD Housing Society", "city": "Islamabad", "phone": "051-5432109", "mobile": "0300-8901234" },
      "license": "DL-ICT-00123", "ntn": "0012345-7"
    },

    // RAWALPINDI STORES
    {
      "id": "STORE008",
      "name": "Rawalpindi Medical Hall",
      "tagline": "Serving Since 1970",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%238B4513'/%3E%3Ctext x='30' y='40' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3ERMH%3C/text%3E%3C/svg%3E",
      "address": { "street": "121-A, Bank Road", "area": "Saddar", "city": "Rawalpindi", "phone": "051-5556789", "mobile": "0333-8901234" },
      "license": "DL-PB-89012", "ntn": "8901234-5"
    },
    {
      "id": "STORE016",
      "name": "MediMart",
      "tagline": "Smart Shopping for Health",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='10' y='10' width='40' height='40' rx='5' fill='%236B5B95'/%3E%3Crect x='25' y='20' width='10' height='20' fill='white'/%3E%3Crect x='20' y='25' width='20' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Plot #78, Commercial Area", "area": "Bahria Town Phase 4", "city": "Rawalpindi", "phone": "051-5789012", "mobile": "0321-9012345" },
      "license": "DL-PB-66789", "ntn": "6678901-3"
    },

    // FAISALABAD STORES
    {
      "id": "STORE009",
      "name": "Faisalabad Drugstore",
      "tagline": "Health First, Always",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' fill='%232E8B57'/%3E%3Crect x='26' y='20' width='8' height='20' fill='white'/%3E%3Crect x='20' y='26' width='20' height='8' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Shop #45, D-Ground", "area": "Peoples Colony", "city": "Faisalabad", "phone": "041-8765432", "mobile": "0345-6789012" },
      "license": "DL-PB-90123", "ntn": "9012345-6"
    },
    {
      "id": "STORE018",
      "name": "Prime Medical Store",
      "tagline": "Prime Quality, Prime Service",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' rx='10' fill='%23FFD700'/%3E%3Ctext x='30' y='40' font-size='18' fill='%23333' text-anchor='middle' font-weight='bold'%3EPMS%3C/text%3E%3C/svg%3E",
      "address": { "street": "Shop #12, Kohinoor City", "area": "Jaranwala Road", "city": "Faisalabad", "phone": "041-2567890", "mobile": "0345-2345678" },
      "license": "DL-PB-88901", "ntn": "8890123-5"
    },
    {
      "id": "STORE019",
      "name": "Life Pharmacy",
      "tagline": "Enhancing Life Quality",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' fill='%23FF6347'/%3E%3Crect x='25' y='18' width='10' height='24' fill='white'/%3E%3Crect x='18' y='25' width='24' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Near Allied Hospital", "area": "Madina Town", "city": "Faisalabad", "phone": "041-8543210", "mobile": "0312-6789012" },
      "license": "DL-PB-99012", "ntn": "9901234-6"
    },

    // OTHER CITIES
    {
      "id": "STORE010",
      "name": "Multan Pharmacy",
      "tagline": "City of Saints, Store of Health",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='5' y='5' width='50' height='50' rx='5' fill='%23FF6B35'/%3E%3Crect x='25' y='15' width='10' height='30' fill='white'/%3E%3Crect x='15' y='25' width='30' height='10' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Near GPO, Kutchery Road", "area": "Chowk Ghanta Ghar", "city": "Multan", "phone": "061-4567890", "mobile": "0312-3456789" },
      "license": "DL-PB-01234", "ntn": "0123456-7"
    },
    {
      "id": "STORE011",
      "name": "Peshawar Chemist",
      "tagline": "Gateway to Health",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23800000'/%3E%3Crect x='24' y='18' width='12' height='24' fill='white'/%3E%3Crect x='14' y='24' width='32' height='12' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Shop #7, Saddar Road", "area": "University Town", "city": "Peshawar", "phone": "091-5234567", "mobile": "0300-7890123" },
      "license": "DL-KP-11234", "ntn": "1123456-8"
    },
    {
      "id": "STORE012",
      "name": "Quetta Medical Store",
      "tagline": "Balochistan's Trusted Pharmacy",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='8' y='8' width='44' height='44' rx='8' fill='%232F4F4F'/%3E%3Ctext x='30' y='40' font-size='16' fill='white' text-anchor='middle' font-weight='bold'%3EQMS%3C/text%3E%3C/svg%3E",
      "address": { "street": "Jinnah Road, Near GPO", "area": "Cantonment", "city": "Quetta", "phone": "081-2834567", "mobile": "0333-1234567" },
      "license": "DL-BL-22345", "ntn": "2234567-9"
    }
  ],

  templates: [
    { "id": "thermal-print", "name": "Thermal Print (Default)", "description": "80mm thermal printer style - compact monospace" },
    { "id": "simple-receipt", "name": "Simple Receipt", "description": "Receipt style print" },
    { "id": "classic-professional", "name": "Classic Professional", "description": "Blue formal design with traditional layout" },
    { "id": "modern-minimal", "name": "Modern Minimal", "description": "Clean grayscale with minimalist aesthetics" },
    { "id": "pharmacy-green", "name": "Pharmacy Green", "description": "Health-focused green theme" },
    { "id": "corporate-blue", "name": "Corporate Blue", "description": "Business formal appearance" },
    { "id": "warm-healthcare", "name": "Warm Healthcare", "description": "Orange and coral tones" },
    { "id": "medical-trust", "name": "Medical Trust", "description": "Teal medical professional" },
    { "id": "premium-gold", "name": "Premium Gold", "description": "Luxury gold accents" },
    { "id": "digital-modern", "name": "Digital Modern", "description": "Gradient blue tech look" },
    { "id": "traditional", "name": "Traditional", "description": "Classic green and white" },
    { "id": "fresh-mint", "name": "Fresh Mint", "description": "Light mint green theme" },
    { "id": "bold-statement", "name": "Bold Statement", "description": "High contrast black and white" },
    { "id": "soft-pastel", "name": "Soft Pastel", "description": "Pink and lavender tones" },
    { "id": "night-mode", "name": "Night Mode", "description": "Dark theme design" },
    { "id": "eco-friendly", "name": "Eco Friendly", "description": "Nature green and brown" },
    { "id": "tech-pharma", "name": "Tech Pharma", "description": "Purple tech aesthetic" },
    { "id": "retro-classic", "name": "Retro Classic", "description": "Vintage sepia tones" },
    { "id": "clean-clinical", "name": "Clean Clinical", "description": "Hospital white and blue" },
    { "id": "gradient-flow", "name": "Gradient Flow", "description": "Flowing color gradient" },
    { "id": "split-design", "name": "Split Design", "description": "Two-tone split layout" }
  ],

  travelItems: [
    // AC SLEEPER
    { "id": "TRV001", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Standard", "category": "ac-sleeper", "route": "Lahore - Karachi", "seatType": "Sleeper", "price": 5000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV002", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Standard", "category": "ac-sleeper", "route": "Islamabad - Karachi", "seatType": "Sleeper", "price": 5500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV003", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Standard", "category": "ac-sleeper", "route": "Lahore - Islamabad", "seatType": "Sleeper", "price": 4000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV004", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Standard", "category": "ac-sleeper", "route": "Multan - Karachi", "seatType": "Sleeper", "price": 4500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV005", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Standard", "category": "ac-sleeper", "route": "Faisalabad - Karachi", "seatType": "Sleeper", "price": 5200, "minQty": 1, "maxQty": 10 },
    { "id": "TRV006", "name": "AC Sleeper", "description": "Air Conditioned Sleeper Berth", "operator": "Premium", "category": "ac-sleeper", "route": "Lahore - Karachi", "seatType": "Sleeper", "price": 6000, "minQty": 1, "maxQty": 10 },

    // AC BUSINESS CLASS
    { "id": "TRV007", "name": "AC Business Class", "description": "Air Conditioned Business Seat", "operator": "Standard", "category": "ac-business", "route": "Lahore - Karachi", "seatType": "Business", "price": 4000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV008", "name": "AC Business Class", "description": "Air Conditioned Business Seat", "operator": "Standard", "category": "ac-business", "route": "Islamabad - Karachi", "seatType": "Business", "price": 4500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV009", "name": "AC Business Class", "description": "Air Conditioned Business Seat", "operator": "Standard", "category": "ac-business", "route": "Lahore - Islamabad", "seatType": "Business", "price": 3000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV010", "name": "AC Business Class", "description": "Air Conditioned Business Seat", "operator": "Standard", "category": "ac-business", "route": "Multan - Lahore", "seatType": "Business", "price": 3500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV011", "name": "AC Business Class", "description": "Air Conditioned Business Seat", "operator": "Premium", "category": "ac-business", "route": "Lahore - Karachi", "seatType": "Business", "price": 5000, "minQty": 1, "maxQty": 10 },

    // VIP COACH
    { "id": "TRV012", "name": "VIP Coach", "description": "VIP Luxury Coach Seat", "operator": "Standard", "category": "vip-coach", "route": "Lahore - Karachi", "seatType": "VIP", "price": 3500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV013", "name": "VIP Coach", "description": "VIP Luxury Coach Seat", "operator": "Standard", "category": "vip-coach", "route": "Islamabad - Lahore", "seatType": "VIP", "price": 2500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV014", "name": "VIP Coach", "description": "VIP Luxury Coach Seat", "operator": "Standard", "category": "vip-coach", "route": "Multan - Islamabad", "seatType": "VIP", "price": 3000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV015", "name": "VIP Coach", "description": "VIP Luxury Coach Seat", "operator": "Premium", "category": "vip-coach", "route": "Lahore - Karachi", "seatType": "VIP", "price": 4500, "minQty": 1, "maxQty": 10 },

    // AC DELUXE
    { "id": "TRV016", "name": "AC Deluxe", "description": "Air Conditioned Deluxe Seat", "operator": "Standard", "category": "ac-deluxe", "route": "Lahore - Islamabad", "seatType": "Deluxe", "price": 2500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV017", "name": "AC Deluxe", "description": "Air Conditioned Deluxe Seat", "operator": "Standard", "category": "ac-deluxe", "route": "Lahore - Karachi", "seatType": "Deluxe", "price": 3000, "minQty": 1, "maxQty": 10 },
    { "id": "TRV018", "name": "AC Deluxe", "description": "Air Conditioned Deluxe Seat", "operator": "Standard", "category": "ac-deluxe", "route": "Islamabad - Karachi", "seatType": "Deluxe", "price": 3500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV019", "name": "AC Deluxe", "description": "Air Conditioned Deluxe Seat", "operator": "Standard", "category": "ac-deluxe", "route": "Faisalabad - Islamabad", "seatType": "Deluxe", "price": 2000, "minQty": 1, "maxQty": 10 },

    // ECONOMY SEAT
    { "id": "TRV020", "name": "Economy Seat", "description": "Standard Economy Class", "operator": "Standard", "category": "economy", "route": "Lahore - Islamabad", "seatType": "Economy", "price": 1200, "minQty": 1, "maxQty": 15 },
    { "id": "TRV021", "name": "Economy Seat", "description": "Standard Economy Class", "operator": "Standard", "category": "economy", "route": "Lahore - Karachi", "seatType": "Economy", "price": 1800, "minQty": 1, "maxQty": 15 },
    { "id": "TRV022", "name": "Economy Seat", "description": "Standard Economy Class", "operator": "Standard", "category": "economy", "route": "Islamabad - Karachi", "seatType": "Economy", "price": 2000, "minQty": 1, "maxQty": 15 },
    { "id": "TRV023", "name": "Economy Seat", "description": "Standard Economy Class", "operator": "Standard", "category": "economy", "route": "Multan - Lahore", "seatType": "Economy", "price": 800, "minQty": 1, "maxQty": 15 },
    { "id": "TRV024", "name": "Economy Seat", "description": "Standard Economy Class", "operator": "Standard", "category": "economy", "route": "Faisalabad - Lahore", "seatType": "Economy", "price": 900, "minQty": 1, "maxQty": 15 },

    // STANDARD BUS
    { "id": "TRV025", "name": "Standard Bus", "description": "Non-AC Standard Bus Seat", "operator": "Standard", "category": "standard-bus", "route": "Lahore - Islamabad", "seatType": "Standard", "price": 800, "minQty": 1, "maxQty": 15 },
    { "id": "TRV026", "name": "Standard Bus", "description": "Non-AC Standard Bus Seat", "operator": "Standard", "category": "standard-bus", "route": "Lahore - Karachi", "seatType": "Standard", "price": 1200, "minQty": 1, "maxQty": 15 },
    { "id": "TRV027", "name": "Standard Bus", "description": "Non-AC Standard Bus Seat", "operator": "Standard", "category": "standard-bus", "route": "Multan - Karachi", "seatType": "Standard", "price": 1000, "minQty": 1, "maxQty": 15 },
    { "id": "TRV028", "name": "Standard Bus", "description": "Non-AC Standard Bus Seat", "operator": "Standard", "category": "standard-bus", "route": "Peshawar - Islamabad", "seatType": "Standard", "price": 500, "minQty": 1, "maxQty": 15 },
    { "id": "TRV029", "name": "Standard Bus", "description": "Non-AC Standard Bus Seat", "operator": "Standard", "category": "standard-bus", "route": "Faisalabad - Islamabad", "seatType": "Standard", "price": 700, "minQty": 1, "maxQty": 15 },

    // MINI COACH / COASTER
    { "id": "TRV030", "name": "Mini Coach", "description": "AC Coaster / Mini Coach", "operator": "Standard", "category": "mini-coach", "route": "Lahore - Islamabad", "seatType": "Coaster", "price": 1500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV031", "name": "Mini Coach", "description": "AC Coaster / Mini Coach", "operator": "Standard", "category": "mini-coach", "route": "Islamabad - Peshawar", "seatType": "Coaster", "price": 1800, "minQty": 1, "maxQty": 10 },
    { "id": "TRV032", "name": "Mini Coach", "description": "AC Coaster / Mini Coach", "operator": "Standard", "category": "mini-coach", "route": "Lahore - Karachi", "seatType": "Coaster", "price": 2500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV033", "name": "Mini Coach", "description": "AC Coaster / Mini Coach", "operator": "Standard", "category": "mini-coach", "route": "Multan - Islamabad", "seatType": "Coaster", "price": 2000, "minQty": 1, "maxQty": 10 },

    // REFRESHMENTS / EXTRAS
    { "id": "TRV034", "name": "Meal Package", "description": "On-board Meal (Lunch/Dinner)", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 350, "minQty": 1, "maxQty": 15 },
    { "id": "TRV035", "name": "Snack Box", "description": "Light Snacks & Beverages", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 150, "minQty": 1, "maxQty": 15 },
    { "id": "TRV036", "name": "Blanket & Pillow", "description": "Comfort Kit (Blanket + Pillow)", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 200, "minQty": 1, "maxQty": 10 },
    { "id": "TRV037", "name": "Refreshment Pack", "description": "Water + Juice + Biscuits", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 100, "minQty": 1, "maxQty": 15 },
    { "id": "TRV038", "name": "Hot Beverage", "description": "Tea / Coffee Service", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 80, "minQty": 1, "maxQty": 15 },
    { "id": "TRV039", "name": "Breakfast Pack", "description": "Morning Breakfast Package", "operator": "Standard", "category": "extras", "route": "All Routes", "seatType": "N/A", "price": 250, "minQty": 1, "maxQty": 15 },

    // LUGGAGE CHARGES
    { "id": "TRV040", "name": "Extra Luggage", "description": "Additional Luggage (per bag)", "operator": "Standard", "category": "luggage", "route": "All Routes", "seatType": "N/A", "price": 500, "minQty": 1, "maxQty": 5 },
    { "id": "TRV041", "name": "Oversize Luggage", "description": "Oversize/Heavy Luggage Surcharge", "operator": "Standard", "category": "luggage", "route": "All Routes", "seatType": "N/A", "price": 800, "minQty": 1, "maxQty": 3 },
    { "id": "TRV042", "name": "Luggage Insurance", "description": "Luggage Protection Cover", "operator": "Standard", "category": "luggage", "route": "All Routes", "seatType": "N/A", "price": 300, "minQty": 1, "maxQty": 5 },

    // INSURANCE
    { "id": "TRV043", "name": "Travel Insurance", "description": "Passenger Travel Insurance", "operator": "Standard", "category": "insurance", "route": "All Routes", "seatType": "N/A", "price": 200, "minQty": 1, "maxQty": 10 },
    { "id": "TRV044", "name": "Premium Insurance", "description": "Comprehensive Travel Cover", "operator": "Premium", "category": "insurance", "route": "All Routes", "seatType": "N/A", "price": 500, "minQty": 1, "maxQty": 10 },
    { "id": "TRV045", "name": "Accident Cover", "description": "Personal Accident Insurance", "operator": "Standard", "category": "insurance", "route": "All Routes", "seatType": "N/A", "price": 150, "minQty": 1, "maxQty": 10 }
  ],

  travelAgencies: [
    {
      "id": "AGENCY001", "name": "Daewoo Express", "tagline": "Pakistan's Premium Bus Service",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%230052A5'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%230052A5'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%230052A5'/%3E%3Crect x='14' y='22' width='20' height='8' rx='2' fill='white' opacity='0.7'/%3E%3C/svg%3E",
      "address": { "street": "Daewoo Terminal, Thokar Niaz Baig", "area": "GT Road", "city": "Lahore", "phone": "042-111-007-008", "mobile": "0300-1111222" },
      "license": "TL-PB-10001", "ntn": "1000001-1"
    },
    {
      "id": "AGENCY002", "name": "Faisal Movers", "tagline": "Travel with Comfort & Safety",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23006B3F'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='%23FFD700'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23006B3F'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23006B3F'/%3E%3Crect x='14' y='22' width='20' height='8' rx='2' fill='%23FFD700' opacity='0.7'/%3E%3C/svg%3E",
      "address": { "street": "Faisal Movers Terminal, Badami Bagh", "area": "Badami Bagh", "city": "Lahore", "phone": "042-111-128-128", "mobile": "0321-5551234" },
      "license": "TL-PB-10002", "ntn": "1000002-2"
    },
    {
      "id": "AGENCY003", "name": "Bilal Travels", "tagline": "Your Journey, Our Responsibility",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23004D40'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3EBT%3C/text%3E%3C/svg%3E",
      "address": { "street": "General Bus Stand, Lahore Road", "area": "Railway Station", "city": "Faisalabad", "phone": "041-2631234", "mobile": "0333-4441234" },
      "license": "TL-PB-10003", "ntn": "1000003-3"
    },
    {
      "id": "AGENCY004", "name": "Skyways", "tagline": "Fly on the Road",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%2387CEEB'/%3E%3Cpath d='M15 35 L30 20 L45 35' stroke='white' stroke-width='3' fill='none'/%3E%3Crect x='12' y='32' width='36' height='10' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='3' fill='%2387CEEB'/%3E%3Ccircle cx='40' cy='42' r='3' fill='%2387CEEB'/%3E%3C/svg%3E",
      "address": { "street": "Skyways Terminal, Pir Wadhai", "area": "Pir Wadhai", "city": "Rawalpindi", "phone": "051-111-759-759", "mobile": "0345-6661234" },
      "license": "TL-PB-10004", "ntn": "1000004-4"
    },
    {
      "id": "AGENCY005", "name": "Niazi Express", "tagline": "Speed, Safety & Service",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23CC0000'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23CC0000'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23CC0000'/%3E%3Ctext x='30' y='26' font-size='12' fill='white' text-anchor='middle' font-weight='bold'%3ENE%3C/text%3E%3C/svg%3E",
      "address": { "street": "Niazi Terminal, Kalma Chowk", "area": "Gulberg", "city": "Lahore", "phone": "042-111-642-642", "mobile": "0300-7771234" },
      "license": "TL-PB-10005", "ntn": "1000005-5"
    },
    {
      "id": "AGENCY006", "name": "Road Master", "tagline": "Masters of the Road",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%238B4513'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='%23FFD700'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%238B4513'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%238B4513'/%3E%3C/svg%3E",
      "address": { "street": "General Bus Stand", "area": "Lorry Adda", "city": "Multan", "phone": "061-4561234", "mobile": "0312-8881234" },
      "license": "TL-PB-10006", "ntn": "1000006-6"
    },
    {
      "id": "AGENCY007", "name": "Waraich Express", "tagline": "Connecting Pakistan",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23FF8C00'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3EWE%3C/text%3E%3C/svg%3E",
      "address": { "street": "Bus Terminal, GT Road", "area": "Gujranwala Bypass", "city": "Gujranwala", "phone": "055-3841234", "mobile": "0333-2221234" },
      "license": "TL-PB-10007", "ntn": "1000007-7"
    },
    {
      "id": "AGENCY008", "name": "Manthar Transport", "tagline": "Safe & Reliable Travel",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23800080'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23800080'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23800080'/%3E%3C/svg%3E",
      "address": { "street": "Manthar Terminal, Super Highway", "area": "Sohrab Goth", "city": "Karachi", "phone": "021-36601234", "mobile": "0345-9991234" },
      "license": "TL-SD-10008", "ntn": "1000008-8"
    },
    {
      "id": "AGENCY009", "name": "Khan Brothers", "tagline": "Brotherhood of Travel",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23000080'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3EKB%3C/text%3E%3C/svg%3E",
      "address": { "street": "Bus Stand, University Road", "area": "University Town", "city": "Peshawar", "phone": "091-5711234", "mobile": "0300-1231234" },
      "license": "TL-KP-10009", "ntn": "1000009-9"
    },
    {
      "id": "AGENCY010", "name": "New Khan", "tagline": "New Standards in Travel",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23008080'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3ENK%3C/text%3E%3C/svg%3E",
      "address": { "street": "Haji Camp Bus Terminal", "area": "Saddar", "city": "Karachi", "phone": "021-32781234", "mobile": "0321-4561234" },
      "license": "TL-SD-10010", "ntn": "1000010-0"
    },
    {
      "id": "AGENCY011", "name": "Kohistan Express", "tagline": "Mountain to City Express",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23228B22'/%3E%3Cpath d='M15 42 L25 25 L35 42 Z' fill='white' opacity='0.8'/%3E%3Cpath d='M25 42 L35 22 L45 42 Z' fill='white'/%3E%3C/svg%3E",
      "address": { "street": "Northern Bus Terminal", "area": "General Bus Stand", "city": "Mansehra", "phone": "0997-301234", "mobile": "0345-5551234" },
      "license": "TL-KP-10011", "ntn": "1000011-1"
    },
    {
      "id": "AGENCY012", "name": "Balochistan Express", "tagline": "Gateway to Balochistan",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23B22222'/%3E%3Ctext x='30' y='38' font-size='16' fill='white' text-anchor='middle' font-weight='bold'%3EBE%3C/text%3E%3C/svg%3E",
      "address": { "street": "Quetta Bus Terminal, Sariab Road", "area": "Sariab", "city": "Quetta", "phone": "081-2831234", "mobile": "0333-8881234" },
      "license": "TL-BL-10012", "ntn": "1000012-2"
    },
    {
      "id": "AGENCY013", "name": "Punjab Coaches", "tagline": "Heart of Punjab Transport",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23DAA520'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23DAA520'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23DAA520'/%3E%3C/svg%3E",
      "address": { "street": "General Bus Stand, Circular Road", "area": "Circular Road", "city": "Lahore", "phone": "042-37121234", "mobile": "0300-4441234" },
      "license": "TL-PB-10013", "ntn": "1000013-3"
    },
    {
      "id": "AGENCY014", "name": "Royal Coaches", "tagline": "Travel Like Royalty",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%234B0082'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='%23FFD700'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%234B0082'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%234B0082'/%3E%3C/svg%3E",
      "address": { "street": "Terminal 2, Faizabad", "area": "Faizabad", "city": "Rawalpindi", "phone": "051-4431234", "mobile": "0321-7771234" },
      "license": "TL-PB-10014", "ntn": "1000014-4"
    },
    {
      "id": "AGENCY015", "name": "Sindh Express", "tagline": "Pride of Sindh",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23DC143C'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3ESE%3C/text%3E%3C/svg%3E",
      "address": { "street": "Cantt Station Road", "area": "Cantt", "city": "Hyderabad", "phone": "022-2781234", "mobile": "0345-3331234" },
      "license": "TL-SD-10015", "ntn": "1000015-5"
    },
    {
      "id": "AGENCY016", "name": "Al-Makkah Travels", "tagline": "Blessed Journeys",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23006400'/%3E%3Cpath d='M25 20 L30 12 L35 20 Z' fill='%23FFD700'/%3E%3Crect x='27' y='20' width='6' height='20' fill='%23FFD700'/%3E%3C/svg%3E",
      "address": { "street": "Near Railway Station", "area": "City Station", "city": "Lahore", "phone": "042-37241234", "mobile": "0333-1111234" },
      "license": "TL-PB-10016", "ntn": "1000016-6"
    },
    {
      "id": "AGENCY017", "name": "Natco", "tagline": "Northern Areas Transport",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%232F4F4F'/%3E%3Ctext x='30' y='36' font-size='14' fill='white' text-anchor='middle' font-weight='bold'%3ENATCO%3C/text%3E%3C/svg%3E",
      "address": { "street": "NATCO Terminal, Danyore", "area": "Danyore", "city": "Gilgit", "phone": "05811-55234", "mobile": "0355-8881234" },
      "license": "TL-GB-10017", "ntn": "1000017-7"
    },
    {
      "id": "AGENCY018", "name": "Rehman Travels", "tagline": "Comfort on Every Mile",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23556B2F'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3ERT%3C/text%3E%3C/svg%3E",
      "address": { "street": "Bus Stand, Mall Road", "area": "Mall Road", "city": "Sialkot", "phone": "052-4261234", "mobile": "0300-6661234" },
      "license": "TL-PB-10018", "ntn": "1000018-8"
    },
    {
      "id": "AGENCY019", "name": "Gujjar Express", "tagline": "Fast & Affordable",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23FF4500'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23FF4500'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23FF4500'/%3E%3C/svg%3E",
      "address": { "street": "GT Road Bus Stand", "area": "GT Road", "city": "Gujrat", "phone": "053-3521234", "mobile": "0312-5551234" },
      "license": "TL-PB-10019", "ntn": "1000019-9"
    },
    {
      "id": "AGENCY020", "name": "Al-Qaim Travels", "tagline": "Your Trusted Travel Partner",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23191970'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='%23C0C0C0'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23191970'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23191970'/%3E%3C/svg%3E",
      "address": { "street": "Bahawalpur Bus Terminal", "area": "Circular Road", "city": "Bahawalpur", "phone": "062-2881234", "mobile": "0345-1121234" },
      "license": "TL-PB-10020", "ntn": "1000020-0"
    },
    {
      "id": "AGENCY021", "name": "Sammi Daewoo", "tagline": "Premium Executive Service",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%230052A5'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='%23FFD700'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%230052A5'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%230052A5'/%3E%3C/svg%3E",
      "address": { "street": "Motorway Service Area", "area": "M-2 Motorway", "city": "Islamabad", "phone": "051-111-222-333", "mobile": "0300-8881234" },
      "license": "TL-ICT-10021", "ntn": "1000021-1"
    },
    {
      "id": "AGENCY022", "name": "Yousaf Travels", "tagline": "Budget-Friendly Travel",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23CD853F'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3EYT%3C/text%3E%3C/svg%3E",
      "address": { "street": "Sargodha Bus Stand", "area": "Fatima Jinnah Road", "city": "Sargodha", "phone": "048-3721234", "mobile": "0333-7771234" },
      "license": "TL-PB-10022", "ntn": "1000022-2"
    },
    {
      "id": "AGENCY023", "name": "Mardan Coaches", "tagline": "KPK's Finest Transport",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23708090'/%3E%3Crect x='12' y='28' width='36' height='14' rx='3' fill='white'/%3E%3Ccircle cx='20' cy='42' r='4' fill='%23708090'/%3E%3Ccircle cx='40' cy='42' r='4' fill='%23708090'/%3E%3C/svg%3E",
      "address": { "street": "General Bus Stand, Bank Road", "area": "Bank Road", "city": "Mardan", "phone": "0937-871234", "mobile": "0345-4441234" },
      "license": "TL-KP-10023", "ntn": "1000023-3"
    },
    {
      "id": "AGENCY024", "name": "Swat Coaches", "tagline": "Valley to City Express",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%232E8B57'/%3E%3Cpath d='M18 42 L30 18 L42 42 Z' fill='white' opacity='0.9'/%3E%3C/svg%3E",
      "address": { "street": "Mingora Bus Stand", "area": "Main Bazaar", "city": "Swat", "phone": "0946-711234", "mobile": "0300-9991234" },
      "license": "TL-KP-10024", "ntn": "1000024-4"
    },
    {
      "id": "AGENCY025", "name": "Hub Coaches", "tagline": "Connecting Hub to Pakistan",
      "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='28' fill='%23696969'/%3E%3Ctext x='30' y='38' font-size='18' fill='white' text-anchor='middle' font-weight='bold'%3EHC%3C/text%3E%3C/svg%3E",
      "address": { "street": "RCD Highway Terminal", "area": "Hub Chowki", "city": "Hub", "phone": "0853-301234", "mobile": "0312-2221234" },
      "license": "TL-BL-10025", "ntn": "1000025-5"
    }
  ],

  paperSizes: [
    { "id": "thermal", "name": "Thermal (80mm)", "width": "80mm", "height": "200mm" },
    { "id": "a5", "name": "A5 (148 × 210 mm)", "width": "148mm", "height": "210mm" },
    { "id": "half-letter", "name": "Half Letter (5.5 × 8.5 in)", "width": "5.5in", "height": "8.5in" },
    { "id": "a4", "name": "A4 (210 × 297 mm)", "width": "210mm", "height": "297mm" },
    { "id": "letter", "name": "Letter (8.5 × 11 in)", "width": "8.5in", "height": "11in" },
    { "id": "legal", "name": "Legal (8.5 × 14 in)", "width": "8.5in", "height": "14in" }
  ]
};
