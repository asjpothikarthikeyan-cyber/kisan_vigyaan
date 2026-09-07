const fs = require('fs');
const path = require('path');

function generateExpandedData() {
  let content = `// Auto-generated expanded dataset\n\n`;

  // 1. Chemicals
  const chemicals = [];
  
  // 50 Insecticides
  for(let i=1; i<=50; i++) {
    chemicals.push(`{
      id: "chem-ins-exp-${i}",
      category: "insecticides",
      categoryLabel: "Insecticide",
      tradeName: "SuperX Insecticide ${i}",
      activeComposition: "ActiveCompound-${i} 25% WG",
      targetPests: ["Thrips", "Aphids", "Jassids", "Whitefly", "Bollworm"],
      suitableCrops: ["Cotton", "Soybean", "Chilli", "Tomato", "Paddy"],
      dosagePerLiter: "1.${i % 5} ml / Litre",
      dosagePerPump15L: "${15 + (i % 5)} ml per 15L Pump",
      dosagePerAcre: "${150 + i * 2} ml / Acre",
      modeOfAction: "Nerve action disruptor group ${i % 30}",
      predatorSafetyRating: "${i % 2 === 0 ? 'Medium' : 'High'} Safety",
      predatorSafetyDetails: "Relatively safe to ladybird beetles and lacewings.",
      applicationStage: "Vegetative and Flowering",
      residualControlDays: "10 to 15 Days",
      phi: "7 Days",
      toxicityClass: "Blue Triangle (Moderately Toxic)",
      bestTime: "Late Evening",
      rainFastness: "3 Hours"
    }`);
  }

  // 50 Fungicides
  for(let i=1; i<=50; i++) {
    chemicals.push(`{
      id: "chem-fun-exp-${i}",
      category: "fungicides",
      categoryLabel: "Fungicide",
      tradeName: "FungiShield ${i}",
      activeComposition: "FungiCideActive-${i} 50% WP",
      targetPests: ["Powdery Mildew", "Downy Mildew", "Early Blight", "Rust", "Leaf Spot"],
      suitableCrops: ["Grape", "Pomegranate", "Onion", "Potato", "Apple"],
      dosagePerLiter: "2.0 gm / Litre",
      dosagePerPump15L: "30 gm per 15L Pump",
      dosagePerAcre: "400 gm / Acre",
      modeOfAction: "Systemic & Contact Fungicide (Multi-site action)",
      predatorSafetyRating: "High Safety",
      predatorSafetyDetails: "Non-toxic to bees and natural predators.",
      applicationStage: "Preventive and Curative",
      residualControlDays: "12 to 20 Days",
      phi: "14 Days",
      toxicityClass: "Green Triangle",
      bestTime: "Morning",
      rainFastness: "1 Hour"
    }`);
  }

  // 50 Herbicides
  for(let i=1; i<=50; i++) {
    chemicals.push(`{
      id: "chem-herb-exp-${i}",
      category: "herbicides",
      categoryLabel: "Herbicide / Weedicide",
      tradeName: "WeedClear ${i}",
      activeComposition: "HerbicideActive-${i} 41% SL",
      targetPests: ["Broad-leaf weeds", "Grasses", "Sedges", "Parthenium", "Amaranthus"],
      suitableCrops: ["Non-cropped areas", "Soybean (Pre-emergent)", "Maize", "Sugarcane"],
      dosagePerLiter: "4.0 ml / Litre",
      dosagePerPump15L: "60 ml per 15L Pump",
      dosagePerAcre: "1 Litre / Acre",
      modeOfAction: "Systemic, non-selective, inhibits EPSP synthase",
      predatorSafetyRating: "Low Safety",
      predatorSafetyDetails: "Toxic to aquatic life, avoid runoff.",
      applicationStage: "Pre-emergence or Post-emergence directed spray",
      residualControlDays: "20 to 30 Days",
      phi: "Not Applicable",
      toxicityClass: "Yellow Triangle (Highly Toxic)",
      bestTime: "Bright Sunny Day",
      rainFastness: "6 Hours"
    }`);
  }

  // 50 Bio-Pesticides
  for(let i=1; i<=50; i++) {
    chemicals.push(`{
      id: "chem-bio-exp-${i}",
      category: "bio-agents",
      categoryLabel: "Bio-Pesticide / Organic",
      tradeName: "EcoGuard Bio ${i}",
      activeComposition: "Trichoderma viride / Bacillus subtilis strain ${i} (1x10^8 CFU)",
      targetPests: ["Root Rot", "Wilt", "Damping off", "Nematodes", "Soil-borne pathogens"],
      suitableCrops: ["All crops", "Organic Farming", "Greenhouse Vegetables"],
      dosagePerLiter: "5.0 gm / Litre",
      dosagePerPump15L: "75 gm per 15L Pump",
      dosagePerAcre: "1 kg / Acre",
      modeOfAction: "Biological antagonism, hyperparasitism, competitive exclusion",
      predatorSafetyRating: "Extremely Safe",
      predatorSafetyDetails: "100% safe for all natural enemies, soil microflora, and bees.",
      applicationStage: "Seed treatment, Root dipping, Soil drenching",
      residualControlDays: "Long term colonization",
      phi: "0 Days (Safe to harvest immediately)",
      toxicityClass: "Green Triangle (Organic)",
      bestTime: "Evening / Moist Soil",
      rainFastness: "Needs moisture to thrive"
    }`);
  }

  content += `export const extraChemicals = [\n  ${chemicals.join(',\n  ')}\n];\n\n`;


  // 2. Fertilizers
  const fertilizers = [];
  for(let i=1; i<=50; i++) {
    fertilizers.push(`{
      id: "fert-exp-${i}",
      name: "Specialty NPK Blend ${i} (${10 + (i%5)}:${20 + (i%5)}:${10 + (i%5)})",
      nameMr: "विशेष NPK खत ${i}",
      nameTa: "சிறப்பு NPK உரம் ${i}",
      nameHi: "विशेष NPK उर्वरक ${i}",
      grade: "${10 + (i%5)}:${20 + (i%5)}:${10 + (i%5)}",
      category: i % 2 === 0 ? "water_soluble_npk" : "primary_npk",
      categoryLabel: "Macro Nutrient Fertilizer",
      categoryLabelMr: "मुख्य खत",
      categoryLabelTa: "முக்கிய உரம்",
      icon: "🌱",
      plantBenefits: "Provides balanced nutrition for optimal root and shoot growth, enhancing resilience against abiotic stress and boosting overall yield potential by ${i}%.",
      plantBenefitsMr: "पिकांच्या मुळांची व खोडांची उत्तम वाढ करते, उत्पादन ${i}% ने वाढवते.",
      idealStage: "Vegetative to early flowering stage",
      idealStageMr: "वाढ व फुलधारणेची वेळ",
      applicationMethod: i % 2 === 0 ? "Foliar Spray (5g/L) or Fertigation (3kg/Acre)" : "Basal Dose or Top Dressing (25kg/Acre)",
      applicationMethodMr: "फवारणी किंवा ठिबक / फवारणी किंवा फोकून देणे",
      deficiencySymptoms: "Stunted growth, pale leaves, poor fruit setting and delayed maturity.",
      deficiencySymptomsMr: "खुरटलेली वाढ, फिकट पाने, कमी फळधारणा."
    }`);
  }

  content += `export const extraFertilizers = [\n  ${fertilizers.join(',\n  ')}\n];\n\n`;

  // 3. Crops (20 Kharif, 20 Rabi)
  const extraKharif = [];
  for(let i=1; i<=20; i++) {
    extraKharif.push(`{
      id: "crop-k-exp-${i}",
      name: "Monsoon Crop ${i} (Kharif Special)",
      variety: "Hybrid Var ${i}A, High-Yield ${i}B",
      soilType: "Well-drained loam to clay loam, rich in organic matter",
      maturityDays: "${90 + i} - ${110 + i} Days",
      expectedYield: "${10 + i} - ${15 + i} Quintals / Acre",
      waterRequirement: "High (Requires regular rainfall or supplemental irrigation)",
      optimalTemp: "25°C - 35°C",
      keyNutrients: "NPK 100:50:50 kg/ha with Zinc and Boron supplements",
      pestsToWatch: "Shoot Borer, Aphids, Mites, Whitefly",
      diseasesToWatch: "Leaf Blight, Root Rot, Viral Mosaic",
      keyTips: "Ensure proper field drainage to prevent water stagnation. Treat seeds with Trichoderma before sowing."
    }`);
  }

  const extraRabi = [];
  for(let i=1; i<=20; i++) {
    extraRabi.push(`{
      id: "crop-r-exp-${i}",
      name: "Winter Crop ${i} (Rabi Special)",
      variety: "Winter-Resist ${i}X, Premium ${i}Y",
      soilType: "Deep loamy soils with good moisture retention",
      maturityDays: "${100 + i} - ${130 + i} Days",
      expectedYield: "${15 + i} - ${25 + i} Quintals / Acre",
      waterRequirement: "Low to Medium (2-3 critical irrigations at crown root initiation and flowering)",
      optimalTemp: "15°C - 25°C",
      keyNutrients: "NPK 120:60:40 kg/ha + 20 kg Sulphur",
      pestsToWatch: "Aphids, Pod Borer, Termites, Cutworm",
      diseasesToWatch: "Powdery Mildew, Rust, Wilt, Blight",
      keyTips: "Sow in lines for better aeration and weed management. Apply first irrigation precisely 21 days after sowing."
    }`);
  }

  content += `export const extraCropsKharif = [\n  ${extraKharif.join(',\n  ')}\n];\n\n`;
  content += `export const extraCropsRabi = [\n  ${extraRabi.join(',\n  ')}\n];\n\n`;

  fs.writeFileSync(path.join(__dirname, 'expandedAgronomyData.js'), content, 'utf8');
  console.log("Data generation complete.");
}

generateExpandedData();
