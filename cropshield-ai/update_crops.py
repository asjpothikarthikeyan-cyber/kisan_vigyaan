import json
import os

# Define 10 Kharif crops
kharif_crops = [
    {"id": "crop-k5", "name": "Maize (मका)", "variety": "Pioneer 3396, DKC 9081", "soilType": "Well-drained deep loams", "maturityDays": "90-110", "expectedYield": "30 Q/Acre", "waterRequirement": "High", "optimalTemp": "25-32C", "keyNutrients": "NPK 120:60:40", "pestsToWatch": "Fall Armyworm", "diseasesToWatch": "Leaf Blight", "keyTips": "Ensure no waterlogging."},
    {"id": "crop-k6", "name": "Sugarcane (ऊस)", "variety": "Co 86032, Co 0238", "soilType": "Deep rich loamy soils", "maturityDays": "300-360", "expectedYield": "400 Q/Acre", "waterRequirement": "Very High", "optimalTemp": "28-36C", "keyNutrients": "NPK 250:115:115", "pestsToWatch": "Early Shoot Borer", "diseasesToWatch": "Red Rot", "keyTips": "Frequent earthing up."},
    {"id": "crop-k7", "name": "Turmeric (हळद)", "variety": "Pragati, Salem", "soilType": "Well-drained sandy loam", "maturityDays": "240-270", "expectedYield": "120 Q/Acre", "waterRequirement": "High", "optimalTemp": "20-30C", "keyNutrients": "NPK 120:60:60", "pestsToWatch": "Shoot Borer", "diseasesToWatch": "Rhizome Rot", "keyTips": "Ensure good drainage to prevent rot."},
    {"id": "crop-k8", "name": "Groundnut (भुईमूग)", "variety": "TAG-24, TG-37A", "soilType": "Sandy loam, well-drained", "maturityDays": "100-115", "expectedYield": "12 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-30C", "keyNutrients": "NPK 25:50:0", "pestsToWatch": "White Grub", "diseasesToWatch": "Tikka Disease", "keyTips": "Gypsum application at pegging stage."},
    {"id": "crop-k9", "name": "Pigeon Pea / Tur (तूर)", "variety": "Asha, Maruti", "soilType": "Deep, well-drained loams", "maturityDays": "140-160", "expectedYield": "8 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "26-30C", "keyNutrients": "NPK 25:50:0", "pestsToWatch": "Pod Borer", "diseasesToWatch": "Fusarium Wilt", "keyTips": "Seed treatment is crucial."},
    {"id": "crop-k10", "name": "Pearl Millet / Bajra (बाजरी)", "variety": "Pusa 415, ICTP 8203", "soilType": "Sandy soils, drought-prone", "maturityDays": "75-90", "expectedYield": "10 Q/Acre", "waterRequirement": "Low", "optimalTemp": "28-35C", "keyNutrients": "NPK 60:30:0", "pestsToWatch": "Stem Borer", "diseasesToWatch": "Downy Mildew", "keyTips": "Highly drought tolerant."},
    {"id": "crop-k11", "name": "Sorghum / Jowar (ज्वारी)", "variety": "CSH 9, CSH 16", "soilType": "Black soils", "maturityDays": "100-115", "expectedYield": "15 Q/Acre", "waterRequirement": "Low", "optimalTemp": "26-32C", "keyNutrients": "NPK 80:40:0", "pestsToWatch": "Shoot Fly", "diseasesToWatch": "Grain Mold", "keyTips": "Sow before onset of monsoon."},
    {"id": "crop-k12", "name": "Castor (एरंडी)", "variety": "GCH-4, GCH-7", "soilType": "Well-drained sandy loam", "maturityDays": "150-180", "expectedYield": "10 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-30C", "keyNutrients": "NPK 40:40:20", "pestsToWatch": "Castor Semilooper", "diseasesToWatch": "Wilt", "keyTips": "Deep plowing required."},
    {"id": "crop-k13", "name": "Chilli (मिरची)", "variety": "G4, Pusa Jwala", "soilType": "Well-drained loamy soil", "maturityDays": "150-180", "expectedYield": "80 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "20-30C", "keyNutrients": "NPK 120:60:60", "pestsToWatch": "Thrips, Mites", "diseasesToWatch": "Leaf Curl Virus", "keyTips": "Regular prophylactic sprays needed."},
    {"id": "crop-k14", "name": "Okra (भेंडी)", "variety": "Arka Anamika", "soilType": "Sandy loam", "maturityDays": "90-100", "expectedYield": "50 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 100:50:50", "pestsToWatch": "Fruit Borer", "diseasesToWatch": "Yellow Vein Mosaic", "keyTips": "Pick fruits every alternate day."}
]

# Define 10 Rabi crops
rabi_crops = [
    {"id": "crop-r5", "name": "Barley (जवस)", "variety": "Karan 19, RD 2552", "soilType": "Sandy loam", "maturityDays": "120-130", "expectedYield": "18 Q/Acre", "waterRequirement": "Low", "optimalTemp": "15-25C", "keyNutrients": "NPK 60:30:20", "pestsToWatch": "Aphids", "diseasesToWatch": "Stripe Rust", "keyTips": "Requires less water than wheat."},
    {"id": "crop-r6", "name": "Peas (वाटाणा)", "variety": "Arkel, Azad P1", "soilType": "Well-drained loam", "maturityDays": "65-70", "expectedYield": "40 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "15-20C", "keyNutrients": "NPK 20:40:0", "pestsToWatch": "Pod Borer", "diseasesToWatch": "Powdery Mildew", "keyTips": "Staking improves yield and quality."},
    {"id": "crop-r7", "name": "Coriander (कोथिंबीर)", "variety": "Pant Haritima", "soilType": "Loamy soil", "maturityDays": "90-110", "expectedYield": "6 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "15-25C", "keyNutrients": "NPK 40:20:20", "pestsToWatch": "Aphids", "diseasesToWatch": "Wilt", "keyTips": "Sow early for good aroma."},
    {"id": "crop-r8", "name": "Potato (बटाटा)", "variety": "Kufri Jyoti", "soilType": "Sandy loam", "maturityDays": "90-110", "expectedYield": "120 Q/Acre", "waterRequirement": "High", "optimalTemp": "15-22C", "keyNutrients": "NPK 120:60:80", "pestsToWatch": "Aphids", "diseasesToWatch": "Late Blight", "keyTips": "Earthing up is crucial."},
    {"id": "crop-r9", "name": "Linseed / Flax (जवस)", "variety": "Garima, Sharda", "soilType": "Heavy black soil", "maturityDays": "110-120", "expectedYield": "6 Q/Acre", "waterRequirement": "Low", "optimalTemp": "20-25C", "keyNutrients": "NPK 40:20:0", "pestsToWatch": "Linseed Gall Midge", "diseasesToWatch": "Rust", "keyTips": "Good for crop rotation."},
    {"id": "crop-r10", "name": "Garlic (लसूण)", "variety": "Yamuna Safed", "soilType": "Well-drained loam", "maturityDays": "130-150", "expectedYield": "45 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "15-25C", "keyNutrients": "NPK 100:50:50", "pestsToWatch": "Thrips", "diseasesToWatch": "Purple Blotch", "keyTips": "Stop irrigation before harvest."},
    {"id": "crop-r11", "name": "Cumin (जिरे)", "variety": "Gujarat Cumin-4", "soilType": "Sandy loam", "maturityDays": "100-110", "expectedYield": "3 Q/Acre", "waterRequirement": "Low", "optimalTemp": "20-25C", "keyNutrients": "NPK 30:20:0", "pestsToWatch": "Aphids", "diseasesToWatch": "Blight", "keyTips": "Extremely sensitive to rain during flowering."},
    {"id": "crop-r12", "name": "Fenugreek (मेथी)", "variety": "Kasuri, Pusa Early", "soilType": "Loamy soils", "maturityDays": "80-90", "expectedYield": "6 Q/Acre", "waterRequirement": "Low", "optimalTemp": "15-25C", "keyNutrients": "NPK 25:50:25", "pestsToWatch": "Aphids", "diseasesToWatch": "Powdery Mildew", "keyTips": "Good for enriching soil."},
    {"id": "crop-r13", "name": "Safflower (करडई)", "variety": "Bhima, Tara", "soilType": "Deep black soils", "maturityDays": "120-130", "expectedYield": "8 Q/Acre", "waterRequirement": "Low", "optimalTemp": "20-25C", "keyNutrients": "NPK 40:40:0", "pestsToWatch": "Aphids", "diseasesToWatch": "Alternaria Leaf Spot", "keyTips": "Highly drought resistant."},
    {"id": "crop-r14", "name": "Oats (ओट्स)", "variety": "Kent, UPO 212", "soilType": "Well-drained loam", "maturityDays": "100-120", "expectedYield": "18 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "15-25C", "keyNutrients": "NPK 80:40:0", "pestsToWatch": "Aphids", "diseasesToWatch": "Crown Rust", "keyTips": "Excellent fodder crop."}
]

# Define 10 Zaid crops
zaid_crops = [
    {"id": "crop-z3", "name": "Watermelon (कलिंगड)", "variety": "Sugar Baby, Arka Manik", "soilType": "Sandy soils", "maturityDays": "80-95", "expectedYield": "150 Q/Acre", "waterRequirement": "High", "optimalTemp": "25-35C", "keyNutrients": "NPK 100:50:50", "pestsToWatch": "Fruit Fly", "diseasesToWatch": "Fusarium Wilt", "keyTips": "Maintain uniform moisture."},
    {"id": "crop-z4", "name": "Muskmelon (खरबूज)", "variety": "Pusa Sharbati", "soilType": "Sandy loam", "maturityDays": "85-100", "expectedYield": "100 Q/Acre", "waterRequirement": "High", "optimalTemp": "25-35C", "keyNutrients": "NPK 80:40:40", "pestsToWatch": "Red Pumpkin Beetle", "diseasesToWatch": "Powdery Mildew", "keyTips": "Avoid waterlogging."},
    {"id": "crop-z5", "name": "Cucumber (काकडी)", "variety": "Pusa Sanyog", "soilType": "Well-drained loam", "maturityDays": "60-70", "expectedYield": "80 Q/Acre", "waterRequirement": "High", "optimalTemp": "25-30C", "keyNutrients": "NPK 60:40:40", "pestsToWatch": "Aphids", "diseasesToWatch": "Downy Mildew", "keyTips": "Requires frequent irrigation."},
    {"id": "crop-z6", "name": "Bitter Gourd (कारले)", "variety": "Pusa Do Mausami", "soilType": "Sandy loam", "maturityDays": "70-80", "expectedYield": "60 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 80:40:40", "pestsToWatch": "Fruit Fly", "diseasesToWatch": "Yellow Vein Mosaic", "keyTips": "Trellising improves yield."},
    {"id": "crop-z7", "name": "Bottle Gourd (दुधी भोपळा)", "variety": "Pusa Summer Prolific", "soilType": "Sandy loam", "maturityDays": "70-80", "expectedYield": "120 Q/Acre", "waterRequirement": "High", "optimalTemp": "25-35C", "keyNutrients": "NPK 80:40:40", "pestsToWatch": "Fruit Fly", "diseasesToWatch": "Powdery Mildew", "keyTips": "Ensure adequate spacing."},
    {"id": "crop-z8", "name": "Pumpkin (भोपळा)", "variety": "Arka Suryamukhi", "soilType": "Loamy soil", "maturityDays": "90-100", "expectedYield": "100 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-30C", "keyNutrients": "NPK 80:40:40", "pestsToWatch": "Red Pumpkin Beetle", "diseasesToWatch": "Downy Mildew", "keyTips": "Keep fruits off damp soil."},
    {"id": "crop-z9", "name": "Ridge Gourd (दोडका)", "variety": "Pusa Nasdar", "soilType": "Sandy loam", "maturityDays": "70-80", "expectedYield": "50 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 60:40:40", "pestsToWatch": "Fruit Fly", "diseasesToWatch": "Powdery Mildew", "keyTips": "Trellising is recommended."},
    {"id": "crop-z10", "name": "Sponge Gourd (गिलके)", "variety": "Pusa Chikni", "soilType": "Sandy loam", "maturityDays": "70-80", "expectedYield": "50 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 60:40:40", "pestsToWatch": "Fruit Fly", "diseasesToWatch": "Downy Mildew", "keyTips": "Harvest when tender."},
    {"id": "crop-z11", "name": "Cowpea (चवळी)", "variety": "Pusa Komal", "soilType": "Well-drained loam", "maturityDays": "60-70", "expectedYield": "30 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 20:40:20", "pestsToWatch": "Aphids", "diseasesToWatch": "Mosaic Virus", "keyTips": "Good for soil enrichment."},
    {"id": "crop-z12", "name": "Fodder Sorghum (चारा ज्वारी)", "variety": "MP Chari", "soilType": "Various soils", "maturityDays": "60-75", "expectedYield": "200 Q/Acre", "waterRequirement": "Medium", "optimalTemp": "25-35C", "keyNutrients": "NPK 80:40:0", "pestsToWatch": "Shoot Fly", "diseasesToWatch": "Rust", "keyTips": "Harvest before flowering for best nutrition."}
]

file_path = 'src/data/agronomyTipsData.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define functions to format JS object string
def dict_to_js(d):
    items = []
    for k, v in d.items():
        if isinstance(v, str):
            items.append(f'        {k}: "{v}"')
        else:
            items.append(f'        {k}: {v}')
    return '{\n' + ',\n'.join(items) + '\n      }'

kharif_str = ',\n      '.join([dict_to_js(c) for c in kharif_crops])
rabi_str = ',\n      '.join([dict_to_js(c) for c in rabi_crops])
zaid_str = ',\n      '.join([dict_to_js(c) for c in zaid_crops])

# Find insertion points
k_index = content.find('id: "crop-k4"')
k_end = content.find('}', k_index) + 1

r_index = content.find('id: "crop-r4"')
r_end = content.find('}', r_index) + 1

z_index = content.find('id: "crop-z2"')
z_end = content.find('}', z_index) + 1
if z_index == -1:
    z_index = content.find('id: "crop-z1"')
    z_end = content.find('}', z_index) + 1

new_content = content[:k_end] + ',\n      ' + kharif_str + content[k_end:r_end] + ',\n      ' + rabi_str + content[r_end:z_end] + ',\n      ' + zaid_str + content[z_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully added 30 crops.")
