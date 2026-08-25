// CropShield AI - Comprehensive Agronomy, Crop Protection, and Soil Health Knowledge Base

export const seasonalCropsData = {
  kharif: {
    title: "Kharif Season (Monsoon / Autumn)",
    titleMr: "खरीप हंगाम (पावसाळी पिके)",
    period: "June to October (Sowing with Monsoon onset)",
    description: "High rainfall and warm humid climate crops. Focus on moisture drainage, weed management, and fungal prevention.",
    crops: [
      {
        id: "crop-k1",
        name: "Rice / Paddy (भात / धान)",
        variety: "Kaveri 51, Pusa Basmati 1509, Karjat 3, Indrayani",
        soilType: "Clayey loam, fertile alluvium with high water-holding capacity",
        maturityDays: "115 - 135 Days",
        expectedYield: "25 - 32 Quintals / Acre",
        waterRequirement: "High (Transplanting in standing water, keep 2-5cm till flowering)",
        optimalTemp: "22°C - 32°C",
        keyNutrients: "NPK 100:50:50 kg/ha + 25 kg Zinc Sulfate (prevents Khaira disease)",
        pestsToWatch: "Yellow Stem Borer, Brown Plant Hopper (BPH), Leaf Folder",
        diseasesToWatch: "Blast (Pyricularia), Bacterial Leaf Blight, Sheath Blight",
        keyTips: "Apply split doses of Nitrogen (Basal, Tillering, Panicle initiation). Drain standing water 10 days before harvest."
      },
      {
        id: "crop-k2",
        name: "Soybean (सोयाबीन)",
        variety: "JS-335, JS-9560, Phule Sangam (KDS-726), DS-228",
        soilType: "Well-drained Medium to Deep Black Cotton Soil (pH 6.5 - 7.5)",
        maturityDays: "90 - 105 Days",
        expectedYield: "12 - 16 Quintals / Acre",
        waterRequirement: "Medium (Critical stages: Pod formation & seed development)",
        optimalTemp: "20°C - 30°C",
        keyNutrients: "NPK 20:60:40:20 kg/ha (High Phosphorus & Sulfur for nodulation & oil content)",
        pestsToWatch: "Girdle Beetle, Stem Fly, Spodoptera (Tobacco Caterpillar), Semi-looper",
        diseasesToWatch: "Yellow Mosaic Virus (Whitefly vector), Charcoal Rot, Rust",
        keyTips: "Mandatory seed treatment with Rhizobium + PSB + Trichoderma. Avoid water stagnation for more than 24 hours."
      },
      {
        id: "crop-k3",
        name: "Bt Cotton (कपाशी / कापूस)",
        variety: "RCH-659 BG II, Ajit 155, Mallika, Ankur 3028",
        soilType: "Deep Black Cotton Soils (Vertisols) with good drainage",
        maturityDays: "150 - 180 Days",
        expectedYield: "14 - 20 Quintals / Acre",
        waterRequirement: "Medium (Critical at square formation, flowering, and boll development)",
        optimalTemp: "25°C - 35°C",
        keyNutrients: "NPK 120:60:60 kg/ha + Magnesium Sulfate (25 kg/ha) to prevent reddening",
        pestsToWatch: "Pink Bollworm, Whitefly, Jassids, Thrips, Mealybug",
        diseasesToWatch: "Bacterial Blight, Alternaria Leaf Spot, Grey Mildew",
        keyTips: "Install 5 Pheromone traps per acre for Pink Bollworm monitoring. Nipping of terminal shoot at 90 days stops excessive vegetative growth."
      },
      {
        id: "crop-k4",
        name: "Tomato (टोमॅटो - खरीप / लेट खरीप)",
        variety: "Abhinav F1, Saaho (Syngenta 3251), US-440, Arka Rakshak",
        soilType: "Sandy Loam to Red Loam with rich organic matter (pH 6.0 - 7.0)",
        maturityDays: "120 - 140 Days",
        expectedYield: "250 - 350 Quintals / Acre",
        waterRequirement: "Controlled Drip Irrigation (Avoid wet foliage to stop fungal blight)",
        optimalTemp: "18°C - 28°C",
        keyNutrients: "NPK 150:100:150 kg/ha + Calcium Nitrate & Boron (prevents Blossom End Rot)",
        pestsToWatch: "Tuta absoluta (Leaf miner), Fruit Borer (Helicoverpa), Whitefly",
        diseasesToWatch: "Early & Late Blight, Tomato Leaf Curl Virus (ToLCV), Bacterial Wilt",
        keyTips: "Staking on bamboo wire trellis increases Grade-A export yield by 40%. Silver-black plastic mulch cuts weed cost and whitefly attack."
      }
    ]
  },
  rabi: {
    title: "Rabi Season (Winter / Spring)",
    titleMr: "रब्बी हंगाम (हिवाळी पिके)",
    period: "October to March (Sowing after Monsoon retreat)",
    description: "Cool dry climate crops requiring sunny days and dew-rich nights. Focus on timely sowing, crown root irrigation, and rust prevention.",
    crops: [
      {
        id: "crop-r1",
        name: "Wheat (गहू / कनक)",
        variety: "Pusa HD-3086, HD-2967, GW-322, Phule Samadhan (NIAW-1994)",
        soilType: "Fertile Loamy to Clayey Soils with good tilth (pH 6.5 - 7.8)",
        maturityDays: "115 - 130 Days",
        expectedYield: "20 - 26 Quintals / Acre",
        waterRequirement: "4 - 6 Irrigations (Critical: CRI stage at 21 days, Booting, Milking)",
        optimalTemp: "15°C - 25°C",
        keyNutrients: "NPK 120:60:40 kg/ha + Zinc Sulfate (20 kg/ha basal)",
        pestsToWatch: "Aphids (Mahwa), Termites (in dry soil), Armyworm",
        diseasesToWatch: "Yellow / Brown Rust (Puccinia), Loose Smut, Karnal Bunt, Powdery Mildew",
        keyTips: "First irrigation at Crown Root Initiation (CRI at 21 days) is vital for tillering. Delay in sowing after Nov 25 drops yield by 35 kg/day/hectare."
      },
      {
        id: "crop-r2",
        name: "Gram / Chickpea (हरभरा / चना)",
        variety: "Vijay, Digvijay, Vishal, RVG-202, Jaki-9218",
        soilType: "Medium to heavy well-drained black soil (pH 6.5 - 8.0)",
        maturityDays: "95 - 110 Days",
        expectedYield: "10 - 14 Quintals / Acre",
        waterRequirement: "Low (1-2 protective irrigations: Branching & Pod development)",
        optimalTemp: "15°C - 24°C",
        keyNutrients: "NPK 20:50:20:20 kg/ha (Sulfur increases protein & grain size)",
        pestsToWatch: "Gram Pod Borer (Helicoverpa armigera), Cutworm",
        diseasesToWatch: "Fusarium Wilt, Collar Rot, Dry Root Rot, Ascochyta Blight",
        keyTips: "Seed treatment with Trichoderma viride (4g/kg) is 100% mandatory against Fusarium wilt. Nipping tops at 30-35 days induces branching."
      },
      {
        id: "crop-r3",
        name: "Mustard & Rapeseed (मोहरी / सरसो)",
        variety: "Pusa Bold, RH-749, Giriraj, Kranti",
        soilType: "Light to Heavy Loam, salt-tolerant up to moderate levels",
        maturityDays: "105 - 125 Days",
        expectedYield: "8 - 12 Quintals / Acre",
        waterRequirement: "Low (2 irrigations: Pre-flowering and pod filling)",
        optimalTemp: "12°C - 22°C",
        keyNutrients: "NPK 80:40:40 kg/ha + 30 kg Elemental Sulfur (crucial for 42%+ oil yield)",
        pestsToWatch: "Mustard Aphid (Lipaphis erysimi), Sawfly, Painted Bug",
        diseasesToWatch: "White Rust (Albugo candida), Alternaria Blight, Downy Mildew",
        keyTips: "Spray Thiamethoxam 25% WG @ 0.3g/L or Neem Oil when aphid colony exceeds 20 per 10cm central shoot."
      },
      {
        id: "crop-r4",
        name: "Rabi Onion (उन्हाळी / रब्बी कांदा)",
        variety: "Phule Samarth, Bhima Kiran, N-2-4-1, Agrifound Light Red",
        soilType: "Deep friable well-drained sandy loam rich in organic matter",
        maturityDays: "120 - 135 Days (From transplanting)",
        expectedYield: "140 - 180 Quintals / Acre",
        waterRequirement: "Frequent light irrigations through micro-sprinklers/drip",
        optimalTemp: "15°C - 30°C",
        keyNutrients: "NPK 100:50:50 kg/ha + 40 kg Sulfur (essential for pungency & storage life)",
        pestsToWatch: "Onion Thrips (Thrips tabaci), Cutworms",
        diseasesToWatch: "Purple Blotch (Alternaria porri), Stemphylium Blight, Basal Rot",
        keyTips: "Stop irrigation 15 days before harvest and perform field curing for 4 days to prevent storage rotting."
      }
    ]
  },
  zaid: {
    title: "Zaid Season (Summer Season)",
    titleMr: "उन्हाळी हंगाम (झायद पिके)",
    period: "March to June (Between Rabi harvest and Monsoon onset)",
    description: "High temperature and bright sunshine crops. Highly profitable with assured drip irrigation.",
    crops: [
      {
        id: "crop-z1",
        name: "Green Gram / Moong (मूग / उडीद)",
        variety: "Phule Chetak, PKV-AKM-4, SML-668, Pusa Vishal",
        soilType: "Well-drained fertile loamy soil",
        maturityDays: "60 - 65 Days",
        expectedYield: "6 - 8 Quintals / Acre",
        waterRequirement: "3 - 4 Irrigations at 10-12 day intervals",
        optimalTemp: "28°C - 38°C",
        keyNutrients: "NPK 15:40:0 kg/ha (In-built atmospheric nitrogen fixing)",
        pestsToWatch: "Whitefly, Thrips, Pod Borer",
        diseasesToWatch: "Yellow Mosaic Virus, Powdery Mildew",
        keyTips: "Excellent short-duration cash crop that enriches soil nitrogen for upcoming Kharif season."
      },
      {
        id: "crop-z2",
        name: "Watermelon & Muskmelon (कलिंगड / टरबूज)",
        variety: "Kundan, Sagar King, Maxx, Saraswati F1",
        soilType: "Sandy loam with high drainage and organic compost",
        maturityDays: "75 - 85 Days",
        expectedYield: "200 - 300 Quintals / Acre",
        waterRequirement: "Daily Drip fertigation in morning hours",
        optimalTemp: "25°C - 38°C",
        keyNutrients: "NPK 100:60:120 kg/ha (High Potassium 0:0:50 for sugar brix > 12%)",
        pestsToWatch: "Red Pumpkin Beetle, Fruit Fly, Aphids, Mites",
        diseasesToWatch: "Fusarium Wilt, Downy Mildew, Anthracnose",
        keyTips: "Use 25-micron silver-black plastic mulch with drip irrigation. Place 4 fruit fly pheromone traps per acre."
      }
    ]
  }
};

export const fertilizerProtocols = [
  {
    title: "The 4R Nutrient Stewardship Principle",
    titleMr: "४-आर (4R) खत व्यवस्थापन तंत्र",
    rules: [
      { title: "1. Right Source (योग्य खत प्रकार)", desc: "Match fertilizer type with crop needs and soil test pH (e.g. SSP for sulfur-deficient oilseeds; Complex 19:19:19 for fertigation)." },
      { title: "2. Right Rate (योग्य मात्रा / डोस)", desc: "Avoid over-fertilization. Excess Nitrogen makes plants succulent and invites massive sucking pest infestations." },
      { title: "3. Right Time (योग्य वेळ)", desc: "Apply nutrients in sync with plant absorption peaks: Phosphorus at basal root stage, Nitrogen in 3 splits, Potassium at fruit sizing." },
      { title: "4. Right Place (योग्य जागा / पद्धत)", desc: "Place fertilizer 5cm below and beside seeds or via sub-surface drip (fertigation) to minimize volatilization and leaching." }
    ]
  },
  {
    title: "Foliar Nano-Fertilizers Application Protocols",
    titleMr: "नॅनो खतांची फवारणी कार्यपद्धती",
    rules: [
      { title: "Nano Urea (4% N)", desc: "Dosage: 2 to 4 ml per Litre of water (25-50 ml per 15L pump). Spray at active tillering/branching stage (30-35 DAS) and pre-flowering stage." },
      { title: "Nano DAP (8% N, 16% P)", desc: "Dosage: 4 to 5 ml per Litre of water for seed treatment and foliar spray at early vegetative stage. Promotes massive lateral root development." },
      { title: "Spray Conditions", desc: "Always spray in morning (7-10 AM) or evening (4-6 PM) when stomata are open. Avoid spraying during rain or bright mid-day sun." }
    ]
  },
  {
    title: "Organic Soil Biology & Bio-Fertilizers Recipe",
    titleMr: "सेंद्रिय जिवाणू व जीवामृत तयार करण्याची पद्धत",
    rules: [
      { title: "Jeevamrit Formulation", desc: "Mix 10 kg Desi Cow Dung + 10 L Cow Urine + 2 kg Jaggery + 2 kg Gram Flour (Besan) + 1 handful fertile forest soil in 200L water. Ferment for 4-5 days stirring daily. Apply 200L/acre via irrigation." },
      { title: "Trichoderma viride Enrichment", desc: "Mix 2 kg Trichoderma powder into 100 kg well-rotted FYM under shade. Keep moist for 7 days until white fungal mycelium spreads, then apply to soil before sowing to eliminate root rot." }
    ]
  }
];

export const pesticideSafetyProtocols = [
  {
    category: "Spray Timing & Weather Safeguards",
    icon: "Clock",
    points: [
      "Spray strictly during calm morning hours (6:00 AM - 9:00 AM) or late afternoon (4:30 PM - 6:30 PM).",
      "NEVER spray when wind speed exceeds 10 km/h to avoid chemical drift onto neighboring plots, water bodies, or livestock.",
      "NEVER spray during peak mid-day heat (11:30 AM - 3:30 PM) — causes rapid water evaporation, phytotoxicity leaf scorch, and kills foraging honeybees."
    ]
  },
  {
    category: "Nozzle Selection & Spray Pressure",
    icon: "Gauge",
    points: [
      "Use Hollow Cone Nozzles for insecticides and fungicides (creates fine micro-droplets of 150-250 microns for thorough canopy penetration).",
      "Use Flat Fan or Flood Jet Nozzles at low pressure for weedicides/herbicides to prevent drift onto crop leaves.",
      "Keep the spray lance 1.5 to 2.0 feet away from the crop canopy in an even sweeping motion."
    ]
  },
  {
    category: "Tank Mixing & Compatibility Rules",
    icon: "AlertTriangle",
    points: [
      "Perform a 'Jar Test' first: Mix small proportions of chemicals in a glass jar with water. If curdling, sedimentation, or heat generation occurs, DO NOT MIX.",
      "NEVER mix Copper-based fungicides (COC, Bordeaux mixture) with organophosphates or synthetic pyrethroids.",
      "Always maintain spray water pH between 6.0 and 6.5. Hard/alkaline well water (pH > 7.5) breaks down pesticides rapidly (alkaline hydrolysis)."
    ]
  },
  {
    category: "Personal Protective Equipment (PPE) & Hygiene",
    icon: "ShieldCheck",
    points: [
      "Mandatory PPE: Chemical-resistant nitrile gloves, N95 respiratory mask, safety goggles, full-sleeve apron, and rubber boots.",
      "Never eat, drink, smoke, or rub eyes during chemical handling and spraying operations.",
      "After spraying, immediately wash knapsack tank 3 times with fresh water and take a thorough bath with soap."
    ]
  },
  {
    category: "Pre-Harvest Interval (PHI) Compliance",
    icon: "CalendarCheck",
    points: [
      "Strictly observe the Pre-Harvest Interval (PHI) printed on the chemical container (e.g. Mancozeb: 7 days, Imidacloprid: 14 days, Ampligo: 10 days).",
      "Never pick fruits, vegetables, or harvest grain before PHI duration lapses to guarantee pesticide-residue-free export quality."
    ]
  }
];

export const irrigationMaintenanceProtocols = [
  {
    title: "Drip Irrigation & Fertigation Best Practices",
    icon: "Droplets",
    points: [
      "Operate drip system during morning hours (6:00 AM - 10:00 AM) when transpiration demand is steady.",
      "Adopt Pulse Irrigation: Run drip in 2 cycles of 45 minutes instead of one continuous 90-minute run for optimal lateral root wetting without deep percolation loss.",
      "Use Venturi injectors for fertigation. Always flush lines with plain water for 15 minutes AFTER fertigation to prevent fertilizer salt crystallization inside dripper labyrinths."
    ]
  },
  {
    title: "Drip Acid Treatment & Emitter De-clogging Schedule",
    icon: "Wrench",
    points: [
      "Perform Hydrochloric Acid (HCl 33%) treatment once every 45-60 days if using hard borewell water (high Calcium/Magnesium carbonates).",
      "Acid dosage: 1 to 1.5 Litres commercial HCl per 1000 Litres of irrigation water (target water pH 4.0 inside sub-mains).",
      "Fill the lateral lines with acidified water, shut valves, let soak for 24 hours, then open end-caps to flush out dissolved carbonates."
    ]
  },
  {
    title: "Soil Moisture Checking & Scheduling Index",
    icon: "Gauge",
    points: [
      "Squeeze Test: Take soil sample from 6-inch root depth. If it forms a firm ball without releasing surface water, moisture is ideal (65-75% field capacity).",
      "If soil crumbles easily without forming a ball, irrigate immediately.",
      "Install tensiometers at 15cm and 30cm root zones. Start irrigation when gauge reads 30-40 centibars."
    ]
  },
  {
    title: "Mulching for Moisture Retention & Weed Control",
    icon: "Layers",
    points: [
      "Use 25-30 Micron Silver-Black UV-stabilized reflective plastic mulch for vegetables and cash crops.",
      "Silver side facing upwards reflects sunlight, cools root zone by 4-5°C in summer, and repels whiteflies/thrips.",
      "Saves 40% to 50% irrigation water requirement and totally eliminates manual weeding costs."
    ]
  }
];

export const preventativeDiseaseForecast = [
  {
    crop: "Tomato & Vegetables",
    diseaseName: "Early & Late Blight (करपा रोग / बुरशी)",
    pathogen: "Alternaria solani / Phytophthora infestans (Fungal)",
    favorableConditions: "Cloudy overcast weather, high humidity (>85%), night temp 12-18°C, and leaf wetness.",
    symptoms: "Dark brown target-like concentric rings on lower leaves, water-soaked dark patches on stems and fruits.",
    preventativeMeasures: [
      "Deep summer plowing and removal of solanaceous crop debris.",
      "Seed treatment with Trichoderma viride @ 5g/kg seed.",
      "Preventive spray before monsoon: Mancozeb 75% WP @ 2.5g/L or Saaf (Carbendazim + Mancozeb) @ 2g/L.",
      "Curative action if infection starts: Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5g/L or Cymoxanil 8% + Mancozeb 64% @ 2g/L."
    ]
  },
  {
    crop: "Chilli & Capsicum",
    diseaseName: "Chilli Leaf Curl Virus & Murda (चुरडा-मुरडा / थ्रिप्स-मावा)",
    pathogen: "Begomovirus transmitted by Whiteflies (Bemisia tabaci) and Thrips",
    favorableConditions: "Dry hot weather with intermittent spells, dense canopy.",
    symptoms: "Upward and downward curling of leaves, crinkling, stunted bushy plants with no fruit setting.",
    preventativeMeasures: [
      "Install 15 Yellow Sticky Traps and 10 Blue Sticky Traps per acre at canopy height.",
      "Border cropping with 3 rows of Maize or Sorghum as a live barrier to stop incoming vector insects.",
      "Preventative biological spray: Cold-Pressed Neem Oil (10,000 PPM) @ 3 ml/L every 10 days.",
      "Chemical control for vectors: Diafenthiuron 50% WP (Pegasus) @ 1.25g/L or Fipronil 5% SC @ 2 ml/L."
    ]
  },
  {
    crop: "Cotton (कापूस)",
    diseaseName: "Pink Bollworm & Bacterial Leaf Blight",
    pathogen: "Pectinophora gossypiella (Insect) & Xanthomonas campestris (Bacterial)",
    favorableConditions: "Late season humidity, continuous monocropping of Bt cotton.",
    symptoms: "Rosetted flowers, double seeds inside bolls, stained lint, angular water-soaked leaf spots.",
    preventativeMeasures: [
      "Install 5 Pheromone Traps per acre at 45 DAS for continuous moth monitoring.",
      "Mass trapping with 12 Pheromone traps/acre if moth catch exceeds 8 moths/trap/night for 3 consecutive days.",
      "Release egg parasitoid Trichogramma bactrae @ 60,000 eggs/acre at weekly intervals.",
      "Spray Ampligo (Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC) @ 0.5 ml/L or Profenofos 50% EC @ 2 ml/L."
    ]
  },
  {
    crop: "Wheat & Gram",
    diseaseName: "Fusarium Wilt & Rusts (मर रोग व तांबेरा)",
    pathogen: "Fusarium oxysporum / Puccinia striiformis (Soil & Airborne Fungi)",
    favorableConditions: "Soil temp 22-28°C with dry root zone in gram; cool humid morning dew in wheat.",
    symptoms: "Sudden drooping and yellowing of foliage, dark brown vascular discoloration of split taproot.",
    preventativeMeasures: [
      "Mandatory crop rotation with non-legumes (Wheat/Mustard) every 2 years.",
      "Seed treatment: Carboxin 37.5% + Thiram 37.5% DS (Vitavax Power) @ 2g/kg seed.",
      "Soil application of Trichoderma viride (2 kg) enriched in 100 kg vermicompost per acre before sowing.",
      "Wheat Rust preventive spray: Propiconazole 25% EC (Tilt) @ 1 ml/L at the first sign of yellow pustules."
    ]
  },
  {
    crop: "Soil / Land Pathogens",
    diseaseName: "White Grubs & Termites (हुमणी अळी व वाळवी)",
    pathogen: "Holotrichia serrata / Odontotermes obesus (Soil Pests)",
    favorableConditions: "Unrotted cow dung manure applied to soil, sandy loam soils.",
    symptoms: "Severe root cutting, sudden wilting and drying of green plants in patches across the field.",
    preventativeMeasures: [
      "Never apply raw/unfermented cow dung to fields (always use 100% decomposed FYM).",
      "Deep summer plowing exposes grub pupae to predatory birds and solar heat.",
      "Biological control: Apply Metarhizium anisopliae or Beauveria bassiana @ 2 kg/acre mixed with compost.",
      "Chemical soil drenching: Chlorpyrifos 20% EC @ 1 Litre/acre or Fipronil 0.3% G granules @ 10 kg/acre."
    ]
  }
];


// Comprehensive Crop Protection Chemical Formulations Matrix
// Covers Insecticides, Fungicides, Herbicides, Bio-Agents, Target Pests, Crop Suitability, Predator Safety, and Dosage
export const cropProtectionChemicalMatrix = [
  // 1. INSECTICIDES
  {
    id: "chem-ins-1",
    category: "insecticides",
    categoryLabel: "Insecticide / Larvicide",
    tradeName: "Coragen / Vesticor",
    activeComposition: "Chlorantraniliprole 18.5% w/w SC",
    targetPests: ["Helicoverpa armigera (Fruit/Pod Borer)", "Spodoptera litura", "Pink Bollworm", "Stem Borer", "Diamondback Moth (DBM)"],
    suitableCrops: ["Paddy / Rice", "Tomato", "Cotton", "Sugarcane", "Soybean", "Chilli", "Maize", "Cabbage"],
    dosagePerLiter: "0.3 to 0.4 ml / Litre",
    dosagePerPump15L: "5 to 6 ml per 15L Pump",
    dosagePerAcre: "60 ml in 150-200 Litres water / Acre",
    modeOfAction: "Ryanodine Receptor Modulator (IRAC Group 28). Causes immediate cessation of feeding, muscle paralysis, and death within 24-48 hours.",
    predatorSafetyRating: "High Safety",
    predatorSafetyDetails: "Extremely safe for Honeybees (Apis cerana/mellifera), Green Lacewings (Chrysoperla), and Predatory Spiders. Low toxicity to aquatic organisms.",
    phiDays: 3,
    resistanceManagement: "Do not exceed 2 consecutive sprays per season. Rotate with Emamectin Benzoate or Spinetoram."
  },
  {
    id: "chem-ins-2",
    category: "insecticides",
    categoryLabel: "Systemic Insecticide (Sucking Pests)",
    tradeName: "Confidor / Admire",
    activeComposition: "Imidacloprid 17.8% SL (Soluble Liquid)",
    targetPests: ["Aphids (मावा)", "Jassids (तुडतुडे)", "Thrips (फुलकिडे)", "Whiteflies (पांढरी माशी)", "Termites"],
    suitableCrops: ["Cotton", "Chilli", "Tomato", "Sugarcane", "Paddy", "Okra", "Mango", "Groundnut"],
    dosagePerLiter: "0.3 to 0.5 ml / Litre",
    dosagePerPump15L: "5 to 7.5 ml per 15L Pump",
    dosagePerAcre: "50 to 80 ml / Acre",
    modeOfAction: "Neonicotinoid (IRAC Group 4A). Acetylcholine receptor antagonist leading to neurotoxicity and rapid knockdown of piercing-sucking insects.",
    predatorSafetyRating: "Moderate Safety (High Bee Hazard)",
    predatorSafetyDetails: "TOXIC to honeybees. NEVER spray during bloom/flowering hours. Safe for predatory mites and soil microbes when applied as seed dressing.",
    phiDays: 14,
    resistanceManagement: "Alternate with Diafenthiuron 50% WP or Flonicamid 50% WG."
  },
  {
    id: "chem-ins-3",
    category: "insecticides",
    categoryLabel: "Dual-Action Insecticide",
    tradeName: "Ampligo / Voliam Flexi",
    activeComposition: "Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC",
    targetPests: ["Fall Armyworm (FAW)", "Cotton Bollworms", "Shoot & Fruit Borer", "Leaf Folder", "Aphids & Jassids"],
    suitableCrops: ["Maize", "Cotton", "Tomato", "Chilli", "Soybean", "Pigeonpea (Tur)"],
    dosagePerLiter: "0.5 ml / Litre",
    dosagePerPump15L: "8 to 10 ml per 15L Pump",
    dosagePerAcre: "80 to 100 ml / Acre",
    modeOfAction: "Dual-Action: Contact + Ingestion + Systemic. Disrupts sodium channels and muscle contraction for instant knockdown and long residual protection.",
    predatorSafetyRating: "Moderate Safety",
    predatorSafetyDetails: "Micro-encapsulated ZC formulation reduces drift toxicity. Keep away from water bodies.",
    phiDays: 10,
    resistanceManagement: "Do not tank-mix with alkaline copper fungicides."
  },
  {
    id: "chem-ins-4",
    category: "insecticides",
    categoryLabel: "Bio-Rational Insecticide",
    tradeName: "Proclaim / Emamec",
    activeComposition: "Emamectin Benzoate 5% SG (Soluble Granule)",
    targetPests: ["Fruit Borer", "Pod Borer", "Diamondback Moth", "Thrips", "Tea Mosquito Bug"],
    suitableCrops: ["Gram / Chickpea", "Tomato", "Chilli", "Brinjal", "Okra", "Cotton", "Grapes"],
    dosagePerLiter: "0.5 g / Litre",
    dosagePerPump15L: "7.5 to 8.0 g per 15L Pump",
    dosagePerAcre: "80 to 100 g / Acre",
    modeOfAction: "Avermectin class (IRAC Group 6). Activates glutamate-gated chloride channels, causing paralysis and translaminar pest death inside leaves.",
    predatorSafetyRating: "Safe for Beneficial Insects",
    predatorSafetyDetails: "Translaminar absorption locks chemical inside leaf tissues within 2 hours, making dry foliage safe for predatory ladybirds and lacewings.",
    phiDays: 5,
    resistanceManagement: "Highly effective for IPM (Integrated Pest Management) programs."
  },

  // 2. FUNGICIDES
  {
    id: "chem-fun-1",
    category: "fungicides",
    categoryLabel: "Broad-Spectrum Contact Fungicide",
    tradeName: "Dithane M-45 / Indofil M-45",
    activeComposition: "Mancozeb 75% WP (Wettable Powder)",
    targetPests: ["Early & Late Blight", "Alternaria Leaf Spot", "Downy Mildew", "Rust (तांबेरा)", "Anthracnose", "Tikka disease"],
    suitableCrops: ["Tomato", "Potato", "Groundnut", "Paddy", "Chilli", "Grapes", "Wheat", "Onion"],
    dosagePerLiter: "2.0 to 2.5 g / Litre",
    dosagePerPump15L: "30 to 40 g per 15L Pump",
    dosagePerAcre: "500 to 600 g / Acre",
    modeOfAction: "Dithiocarbamate (FRAC Group M03). Multi-site protective contact action that inhibits enzyme lipid metabolism in fungal spore germination.",
    predatorSafetyRating: "High Safety",
    predatorSafetyDetails: "Zero toxicity to predatory insects and bees. Supplies Zinc and Manganese as trace foliar nutrients to the crop.",
    phiDays: 7,
    resistanceManagement: "No known fungal resistance due to multi-site enzyme inhibition."
  },
  {
    id: "chem-fun-2",
    category: "fungicides",
    categoryLabel: "Dual Systemic & Contact Fungicide",
    tradeName: "Saaf / Companion",
    activeComposition: "Carbendazim 12% + Mancozeb 63% WP",
    targetPests: ["Blast & Sheath Blight in Paddy", "Collar Rot & Wilt", "Powdery Mildew", "Damping Off", "Fruit Rot"],
    suitableCrops: ["Paddy", "Chilli", "Tomato", "Soybean", "Groundnut", "Gram", "Cotton", "Grapes"],
    dosagePerLiter: "1.5 to 2.0 g / Litre",
    dosagePerPump15L: "25 to 30 g per 15L Pump",
    dosagePerAcre: "350 to 500 g / Acre (Also 2g/kg as seed dressing)",
    modeOfAction: "Systemic Benzimidazole (Beta-tubulin inhibitor) + Multi-site contact protectant for preventive and curative disease eradication.",
    predatorSafetyRating: "High Safety",
    predatorSafetyDetails: "Ideal for seed treatment and seedling root dip before transplanting. Safe for earthworms at standard agricultural dosage.",
    phiDays: 10,
    resistanceManagement: "Do not use for more than 2 consecutive sprays on powdery mildew."
  },
  {
    id: "chem-fun-3",
    category: "fungicides",
    categoryLabel: "Advanced Broad-Spectrum Strobilurin Fungicide",
    tradeName: "Amistar Top / Custodia",
    activeComposition: "Azoxystrobin 18.2% + Difenoconazole 11.4% w/w SC",
    targetPests: ["Powdery Mildew (भुरी)", "Anthracnose / Dieback", "Purple Blotch in Onion", "Sheath Blight", "Rust in Soybean"],
    suitableCrops: ["Tomato", "Chilli", "Onion", "Paddy", "Soybean", "Grapes", "Pomegranate", "Wheat"],
    dosagePerLiter: "1.0 ml / Litre",
    dosagePerPump15L: "15 ml per 15L Pump",
    dosagePerAcre: "200 ml / Acre",
    modeOfAction: "Strobilurin (QoI - cellular respiration inhibitor) + Triazole (Ergosterol synthesis inhibitor). Imparts greening effect and improves fruit gloss.",
    predatorSafetyRating: "High Safety",
    predatorSafetyDetails: "Completely safe for beneficial predatory mites, ladybird beetles, and lacewings. Zero phytotoxicity.",
    phiDays: 7,
    resistanceManagement: "Do not apply more than twice per cropping season to prevent strobilurin resistance."
  },

  // 3. HERBICIDES / WEEDICIDES
  {
    id: "chem-herb-1",
    category: "herbicides",
    categoryLabel: "Pre-Emergence Selective Herbicide",
    tradeName: "Stomp Extra / Dhanutop",
    activeComposition: "Pendimethalin 38.7% CS (Capsule Suspension)",
    targetPests: ["Annual Grasses (Echinochloa, Digitaria)", "Broad-Leaved Weeds (Amaranthus, Chenopodium, Portulaca)"],
    suitableCrops: ["Soybean", "Cotton", "Chilli", "Tomato", "Onion", "Wheat", "Groundnut", "Mustard"],
    dosagePerLiter: "3.5 to 4.0 ml / Litre",
    dosagePerPump15L: "60 to 70 ml per 15L Pump",
    dosagePerAcre: "600 to 700 ml / Acre (Apply within 0 to 48 hours of sowing on moist soil)",
    modeOfAction: "Dinitroaniline (HRAC Group 3). Microtubule assembly inhibitor in germinating weed seeds before weed emergence.",
    predatorSafetyRating: "Safe for Soil Fauna",
    predatorSafetyDetails: "Capsule suspension reduces vapor loss. Safe for beneficial soil microflora and earthworms.",
    phiDays: 60,
    resistanceManagement: "Apply with Flat Fan or Flood Jet nozzle with uniform soil coverage. Do not disturb soil crust after application."
  },
  {
    id: "chem-herb-2",
    category: "herbicides",
    categoryLabel: "Post-Emergence Selective Graminicide",
    tradeName: "Targa Super / Sakura",
    activeComposition: "Quizalofop-ethyl 5% EC",
    targetPests: ["Narrow-Leaved Weeds (Echinochloa, Cynodon dactylon - Harali, Goosegrass, Crabgrass)"],
    suitableCrops: ["Soybean", "Cotton", "Groundnut", "Blackgram / Urad", "Chilli", "Onion", "Tomato"],
    dosagePerLiter: "2.0 ml / Litre",
    dosagePerPump15L: "30 to 35 ml per 15L Pump",
    dosagePerAcre: "350 to 400 ml in 150 Litres water / Acre (Apply at 2 to 4 weed leaf stage)",
    modeOfAction: "Aryloxyphenoxypropionate (ACCase inhibitor - HRAC Group 1). Rapidly absorbed by foliage and translocates to growing root meristems.",
    predatorSafetyRating: "High Safety",
    predatorSafetyDetails: "Completely selective for broad-leaf crops. Zero harm to beneficial insect predators.",
    phiDays: 30,
    resistanceManagement: "Do not tank-mix with broad-leaf weedicides like 2,4-D or Chlorimuron without compatibility testing."
  },

  // 4. BIO-PROTECTION & ORGANIC AGENTS
  {
    id: "chem-bio-1",
    category: "bio-pesticides",
    categoryLabel: "Organic Botanical Insecticide",
    tradeName: "Econeem Plus / Nimbecidine",
    activeComposition: "Cold-Pressed Azadirachtin 10,000 PPM (1% EC)",
    targetPests: ["Whiteflies", "Thrips", "Leafminers", "Aphids", "Mites", "Early Instar Caterpillars"],
    suitableCrops: ["All Agricultural & Horticultural Crops (100% Organic & Export Safe)"],
    dosagePerLiter: "2.5 to 3.0 ml / Litre",
    dosagePerPump15L: "40 to 45 ml per 15L Pump",
    dosagePerAcre: "400 to 500 ml / Acre",
    modeOfAction: "Multi-modal: Antifeedant, insect growth regulator (ecdysone disruptor), oviposition repellent, and sterilant.",
    predatorSafetyRating: "100% Safe for Beneficial Predators",
    predatorSafetyDetails: "Completely safe for honeybees, ladybirds, spiders, birds, and aquatic life. 0 Days PHI residue.",
    phiDays: 0,
    resistanceManagement: "Pests cannot develop physiological resistance to botanical azadirachtin."
  },
  {
    id: "chem-bio-2",
    category: "bio-pesticides",
    categoryLabel: "Biological Antagonistic Fungicide",
    tradeName: "Sanjeevani / Bio-Dew",
    activeComposition: "Trichoderma viride 1.5% WP (2 x 10^8 CFU/g)",
    targetPests: ["Fusarium Wilt (मर रोग)", "Root Rot", "Damping Off", "Collar Rot", "Rhizoctonia", "Pythium"],
    suitableCrops: ["Soybean", "Gram / Chickpea", "Cotton", "Tomato", "Chilli", "Sugarcane", "Pomegranate", "Turmeric"],
    dosagePerLiter: "5.0 g / Litre for drenching",
    dosagePerPump15L: "75 g per 15L Pump",
    dosagePerAcre: "1 to 2 kg mixed in 100 kg well-decomposed FYM/compost per Acre",
    modeOfAction: "Mycoparasitism + Antibiosis + Competition. Aggressively colonizes root zone, secretes chitinase enzymes, and destroys harmful pathogenic fungi.",
    predatorSafetyRating: "Ecologically Beneficial",
    predatorSafetyDetails: "Improves plant systemic acquired resistance (SAR) and solubilizes soil micronutrients.",
    phiDays: 0,
    resistanceManagement: "Do not mix with chemical fungicides during application. Maintain moist soil."
  }
];

// Verified Nearby Agri Vendors, Dealers & Mandi Hubs with Precise KM Distance
export const nearbyAgroVendorsWithDistance = [
  {
    id: "vend-1",
    name: "Kisan Agro Seva Kendra & DBT Fertilizer Depot",
    nameMr: "किसान ॲग्रो सेवा केंद्र व शासकीय खते डेपो",
    category: "fertilizers-pesticides",
    categoryLabel: "Fertilizers, Seeds & Chemicals",
    distanceKm: 1.2,
    distanceDisplay: "1.2 km away",
    location: "Kupwad Village, Sangli-Miraj Main Road",
    landmark: "Opposite Market Yard Gate No. 1, Sangli",
    phone: "+91 98220 14589",
    rating: 4.9,
    reviewsCount: 310,
    status: "Open Now • Closes 8:30 PM",
    licenseNo: "MAH/SAN/AGRO-4821/2026",
    dbtPoint: true,
    availableStocks: [
      "Subsidized Urea & DAP (Govt Quota)",
      "NPK 19:19:19, 12:32:16, Potash",
      "Coragen, Ampligo, Confidor, Mancozeb",
      "Kaveri 51 Rice & Abhinav Tomato Seeds"
    ],
    buySellCapabilities: {
      canBuyInputs: true,
      canSellHarvest: false,
      homeDelivery: "Same-Day Tractor & Pickup Delivery available"
    }
  },
  {
    id: "vend-2",
    name: "Primary Agricultural Cooperative Society (PACS) - Kupwad",
    nameMr: "प्राथमिक कृषी पतपुरवठा सहकारी संस्था (PACS) - कुपवाड केंद्र",
    category: "fertilizers-govt",
    categoryLabel: "Government Subsidized DBT Center",
    distanceKm: 1.5,
    distanceDisplay: "1.5 km away",
    location: "Gram Panchayat Bhawan, Kupwad Gaon",
    landmark: "Behind Talathi Office, Kupwad, Sangli",
    phone: "0233-2644211 / +91 94224 55190",
    rating: 4.8,
    reviewsCount: 420,
    status: "Govt Timings: 9:00 AM - 6:00 PM",
    licenseNo: "MAH-COOP-SANGLI-084",
    dbtPoint: true,
    availableStocks: [
      "Official Neem Coated Urea @ ₹266.50/45kg",
      "DAP 18:46:0 @ ₹1,350/50kg",
      "MOP (Potash 60%) @ ₹1,700/50kg",
      "Subsidized Certified Wheat & Gram Seeds"
    ],
    buySellCapabilities: {
      canBuyInputs: true,
      canSellHarvest: true,
      canSellDetails: "Authorized MSP Procurement Center for Gram & Soybean during harvest season"
    }
  },
  {
    id: "vend-3",
    name: "Sangli Krishi Utpanna Bazar Samiti (APMC Mandi Main Yard)",
    nameMr: "सांगली कृषी उत्पन्न बाजार समिती (मुख्य मार्केट यार्ड)",
    category: "mandi-sell",
    categoryLabel: "Direct Farmer Mandi (Sell Harvest)",
    distanceKm: 2.8,
    distanceDisplay: "2.8 km away",
    location: "Market Yard Main Complex, Sangli",
    landmark: "Sangli-Miraj Road, APMC Auction Hall 4",
    phone: "0233-2670114 / +91 98900 12044",
    rating: 4.7,
    reviewsCount: 890,
    status: "Auction Hours: 6:00 AM - 2:00 PM",
    licenseNo: "APMC/SAN/MANDI-001",
    dbtPoint: false,
    availableStocks: [
      "Live Grain & Pulse Electronic Auction (e-NAM)",
      "Turmeric, Soybean, Maize & Wheat Bulk Weighbridges",
      "0% Commission on Direct Farmer Deliveries",
      "Immediate Digital Payment to Farmer Bank Accounts"
    ],
    buySellCapabilities: {
      canBuyInputs: false,
      canSellHarvest: true,
      canSellDetails: "Daily spot buying of Soybean, Turmeric, Grapes, Maize, Wheat, and Tomato"
    }
  },
  {
    id: "vend-4",
    name: "Shri Ganesh Krishi Vikas & Plant Protection Center",
    nameMr: "श्री गणेश कृषी विकास केंद्र व कीटकनाशक डेपो",
    category: "pesticides-herbicides",
    categoryLabel: "Specialized Plant Protection & Herbicides",
    distanceKm: 3.4,
    distanceDisplay: "3.4 km away",
    location: "Shop No. 7, APMC Commercial Complex, Sangli",
    landmark: "Near Bank of Maharashtra, Sangli Branch",
    phone: "+91 94230 87120",
    rating: 4.6,
    reviewsCount: 175,
    status: "Open Now • Closes 8:00 PM",
    licenseNo: "MAH/SAN/AGRO-1109/2026",
    dbtPoint: false,
    availableStocks: [
      "Stomp Extra (Pendimethalin) & Targa Super (Quizalofop)",
      "Amistar Top, Custodia, Saaf, Dithane M-45",
      "Trichoderma viride & Beauveria bassiana Bio-agents",
      "Battery Sprayer Pumps & Hollow Cone Nozzles"
    ],
    buySellCapabilities: {
      canBuyInputs: true,
      canSellHarvest: false,
      homeDelivery: "Free Agronomist Field Inspection & Diagnosis"
    }
  },
  {
    id: "vend-5",
    name: "Mahabeej Authorized Seed Center & National Seeds Depot",
    nameMr: "महाबीज अधिकृत बियाणे केंद्र व राष्ट्रीय बीज भांडार",
    category: "seeds-certified",
    categoryLabel: "Certified Hybrid & Foundation Seeds",
    distanceKm: 4.2,
    distanceDisplay: "4.2 km away",
    location: "MIDC Kupwad Road, Sangli",
    landmark: "Next to Krishi Vigyan Kendra (KVK) Extension",
    phone: "+91 98901 33451",
    rating: 4.8,
    reviewsCount: 260,
    status: "Open Now • Closes 7:30 PM",
    licenseNo: "MAH/SEED/SAN-902/2026",
    dbtPoint: true,
    availableStocks: [
      "Phule Sangam (KDS-726) Soybean Certified Seed",
      "Pusa HD-3086 & GW-322 Wheat Foundation Seeds",
      "Digvijay & Vijay Gram Seeds (Pre-treated)",
      "Hybrid Tomato, Chilli, Onion & Fodder Maize"
    ],
    buySellCapabilities: {
      canBuyInputs: true,
      canSellHarvest: false,
      homeDelivery: "Subsidized Foundation Seed Quota available"
    }
  },
  {
    id: "vend-6",
    name: "Miraj Krishi Upaj Mandi & Sub-Yard",
    nameMr: "मिरज कृषी उपबाजार व भाजीपाला लिलाव केंद्र",
    category: "mandi-sell",
    categoryLabel: "Vegetable & Cash Crop Mandi",
    distanceKm: 5.6,
    distanceDisplay: "5.6 km away",
    location: "Station Road, Miraj Market Yard",
    landmark: "Near Miraj Railway Goods Shed",
    phone: "0233-2221450 / +91 98224 88990",
    rating: 4.7,
    reviewsCount: 510,
    status: "Daily Morning Auctions: 5:00 AM - 12:00 PM",
    licenseNo: "APMC/MRJ/SUB-012",
    dbtPoint: false,
    availableStocks: [
      "Daily Vegetable Spot Auction (Tomato, Chilli, Okra, Onion)",
      "Cold Storage Facility (₹15/crate/month subsidized rate)",
      "Direct Retailer & Supermarket Bidding Counters"
    ],
    buySellCapabilities: {
      canBuyInputs: false,
      canSellHarvest: true,
      canSellDetails: "Spot cash and UPI settlement for daily harvested fresh vegetables"
    }
  }
];
