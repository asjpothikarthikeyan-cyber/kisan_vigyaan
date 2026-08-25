# Indian Crop Health and Disease Detection Machine Learning Pipeline

## 🌾 Project Overview
An end-to-end, scientifically rigorous, reproducible **Computer Vision and Machine Learning system** designed for the early detection and management of crop diseases, insect pests, and abiotic stresses across **major Indian agricultural crop landscapes**.

Developed following the guidelines of the **Ministry of Agriculture & Farmers Welfare (MoA&FW)**, **Indian Council of Agricultural Research (ICAR)**, and **State Agricultural Universities (SAUs)**.

---

## 🏛️ Prioritized Indian Crops & Economic Rationale
Crops are prioritized based on a mathematical formula integrating production volume, cultivated acreage, export value, farmer livelihood vulnerability, and disease frequency:

$$\text{Priority Score} = 0.25 \times \text{Economic Value} + 0.20 \times \text{Cultivation Area} + 0.20 \times \text{Farmer Impact} + 0.15 \times \text{Production Volume} + 0.10 \times \text{Pest/Disease Impact} + 0.10 \times \text{Dataset Feasibility}$$

### Top Prioritized Indian Crops:
1. **Rice (*Oryza sativa*)** – 45.5 Mha, 130.8 Mt, Primary food security staple (>65% population), World's #1 rice exporter.
2. **Cotton (*Gossypium hirsutum*)** – 12.5 Mha, 34M bales, "White Gold" cash crop supporting 6M+ farmers and national textile GDP.
3. **Wheat (*Triticum aestivum*)** – 30.5 Mha, 110.5 Mt, Core rabi food reserve and PDS pillar.
4. **Potato (*Solanum tuberosum*)** – 2.2 Mha, 53.5 Mt, Major tuber crop in Indo-Gangetic Plains (devastated by Late Blight).
5. **Tomato (*Solanum lycopersicum*)** – 0.84 Mha, 20.5 Mt, National TOP Mission horticulture vegetable with severe viral & fungal blights.
6. **Chilli (*Capsicum annuum*)** – 0.85 Mha, 2.1 Mt, India is world's #1 dry chilli exporter (>40% global share).
7. **Maize (*Zea mays*)** – 9.8 Mha, 33.7 Mt, Industrial cereal & feed grain, vulnerable to invasive Fall Armyworm.

---

## 🧬 Disease, Pest & Stress Damage Categorization
The system explicitly distinguishes between distinct agricultural damage categories:
* **Fungal Diseases**: Rice Blast (*Magnaporthe oryzae*), Rice Brown Spot (*Bipolaris oryzae*), Wheat Yellow/Stripe Rust (*Puccinia striiformis*), Wheat Brown Rust (*Puccinia triticina*), Tomato Early Blight (*Alternaria solani*), Tomato Late Blight (*Phytophthora infestans*), Potato Early/Late Blight, Maize Northern Blight (*Exserohilum turcicum*), Maize Common Rust (*Puccinia sorghi*).
* **Bacterial Diseases**: Rice Bacterial Leaf Blight (*Xanthomonas oryzae* pv. *oryzae*), Cotton Bacterial Angular Blight (*Xanthomonas citri* pv. *malvacearum*), Tomato Bacterial Spot (*Xanthomonas campestris* pv. *vesicatoria*), Chilli Bacterial Spot.
* **Viral Diseases**: Cotton Leaf Curl Virus (CLCuV), Tomato Yellow Leaf Curl Virus (TYLCV), Chilli Leaf Curl Virus (ChiLCV).
* **Insect Pest Damage**: Maize Fall Armyworm (*Spodoptera frugiperda* shot-hole feeding), Tomato Two-Spotted Spider Mite (*Tetranychus urticae* foliar stippling).
* **Abiotic Stresses**: Nitrogen Deficiency Chlorosis (lower canopy yellowing), Drought/Moisture Stress (leaf rolling and scorched margins).
* **Healthy Foliage**: Baseline healthy controls for Rice, Wheat, Cotton, Tomato, Potato, Chilli, and Maize.

---

## 🔬 Dataset Specifications
* **Total Unique Source Images**: Exactly **10,000 unique leaf images** before augmentation.
* **Partitioning**: **80% Training (8,000)** | **10% Validation (1,000)** | **10% Testing (1,000)** with zero data leakage (verified by MD5 hash collision checks).
* **Metadata Schema**: 20-field metadata record (`metadata/image_metadata.csv`).

---

## 🧠 Neural Architecture & Two-Stage Transfer Learning
* **Backbone**: `EfficientNet-B0` pretrained on ImageNet-1K.
* **Classification Head**: Global Average Pooling $\rightarrow$ Dropout(0.3) $\rightarrow$ Dense Linear(1280, 28) $\rightarrow$ Softmax.
* **Stage 1 (Feature Extraction)**: Frozen backbone, learning rate $\eta = 10^{-3}$, AdamW optimizer, Cosine Annealing learning rate scheduler.
* **Stage 2 (Fine-Tuning)**: Unfrozen upper convolutional blocks (`features.6`, `features.7`, `features.8`, `classifier`), fine-tuned with $\eta = 10^{-4}$.

---

## 🚀 Execution & Reproducibility
To reproduce the complete pipeline end-to-end:
```bash
python run_pipeline.py
```

### Sample Inference Usage:
```python
from src.inference.predict import CropHealthPredictor

predictor = CropHealthPredictor("crop_health_ml", confidence_threshold=0.70)
result = predictor.predict("data/test/Rice___Blast/IND_LEAF_00360_Rice___Blast.jpg")
print(result)
```
Output:
```json
{
  "crop": "Rice",
  "condition": "Blast",
  "damage_category": "Fungal Disease",
  "confidence_score": 93.4,
  "is_confident": true,
  "top_predictions": [
    {"class_name": "Rice___Blast", "condition": "Blast", "confidence_percent": 93.4},
    {"class_name": "Rice___Brown_Spot", "condition": "Brown Spot", "confidence_percent": 4.1},
    {"class_name": "Rice___Healthy", "condition": "Healthy Leaf", "confidence_percent": 1.5}
  ],
  "advisory": "Diagnosed with 93.4% confidence under Fungal Disease protocol."
}
```
