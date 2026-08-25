# Indian Crop Health - Comprehensive Error Analysis & Pathological Dissection

## 1. Top Performing Disease Classes
- **Potato___Late_Blight**: F1 = 20.00%, Precision = 21.21%, Recall = 18.92%
- **Potato___Healthy**: F1 = 16.90%, Precision = 17.65%, Recall = 16.22%
- **Tomato___Late_Blight**: F1 = 5.26%, Precision = 100.00%, Recall = 2.70%

## 2. Most Challenging Classes
- **Rice___Blast**: F1 = 0.00%, Precision = 0.00%, Recall = 0.00%
- **Rice___Bacterial_Blight**: F1 = 0.00%, Precision = 0.00%, Recall = 0.00%
- **Rice___Healthy**: F1 = 0.00%, Precision = 0.00%, Recall = 0.00%

## 3. Pathological Root Cause of Confusions
1. **Fungal Blight Overlap (Early Blight vs Late Blight)**: Both Alternaria solani and Phytophthora infestans cause necrotic foliar browning. Concentric target rings distinguish Early Blight, while greasy water-soaked margins characterize Late Blight.
2. **Viral Cupping vs Mite Stippling**: Spider mite foliar feeding stippling can induce mild leaf curling resembling initial viral infection. High-resolution attention layers resolve fine webbing.
3. **Abiotic Chlorosis vs Early Fungal Infection**: Nitrogen deficiency chlorosis starts uniformly from lower canopy margins, whereas pathogen chlorosis presents as discrete localized halos around lesions.
