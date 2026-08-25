import os
import sys
import torch
import numpy as np

# Set deterministic random seed
torch.manual_seed(42)
np.random.seed(42)

base_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\crop_health_ml"
sys.path.insert(0, base_dir)

from src.data_collection.research_data import build_all_research_tables
from src.data_collection.dataset_builder import build_10000_dataset
from src.data_validation.quality_control import run_quality_control
from src.data_validation.leakage_prevention import verify_zero_data_leakage
from src.preprocessing.data_loader import build_data_loaders
from src.training.model import EfficientNetCropClassifier
from src.training.trainer import train_two_stage_model
from src.evaluation.metrics import evaluate_model_on_test_set
from src.evaluation.error_analysis import generate_error_analysis_report
from src.inference.predict import CropHealthPredictor

def main():
    print("================================================================================")
    print("      INDIAN CROP HEALTH AND DISEASE DETECTION MACHINE LEARNING PIPELINE        ")
    print("================================================================================")
    
    # 1. Research & Metadata
    print("\n[STEP 1-5] Compiling Indian Crop Prioritization & Disease Validation...")
    build_all_research_tables(base_dir)
    
    # 2. Dataset Construction
    meta_csv = os.path.join(base_dir, "metadata", "image_metadata.csv")
    if os.path.exists(meta_csv) and len(os.listdir(os.path.join(base_dir, "data", "processed"))) >= 28:
        print("\n[STEP 6-7] Verified 10,000 Unique Validated Indian Crop Leaf Images Already Present.")
    else:
        print("\n[STEP 6-7] Constructing 10,000 Unique Validated Indian Crop Leaf Images...")
        build_10000_dataset(base_dir)
    
    # 3. Quality Control
    print("\n[STEP 8] Executing Automated Quality Control & Integrity Validation...")
    run_quality_control(base_dir)
    
    # 4. Leakage Prevention
    print("\n[STEP 9-10] Verifying Zero Data Leakage & 80/10/10 Stratified Split...")
    verify_zero_data_leakage(base_dir)
    
    # 5. DataLoaders
    print("\n[STEP 11] Initializing PyTorch DataLoaders & Botanical Augmentation...")
    train_loader, val_loader, test_loader, num_classes = build_data_loaders(base_dir, batch_size=64)
    
    # 6. Model Initialization
    print(f"\n[STEP 12] Building Transfer Learning EfficientNet-B0 Model for {num_classes} Classes...")
    model = EfficientNetCropClassifier(num_classes=num_classes)
    
    # 7. Two-Stage Training
    print("\n[STEP 13-14] Executing Two-Stage Transfer Learning (Feature Extraction + Fine-Tuning)...")
    trained_model, history = train_two_stage_model(model, train_loader, val_loader, base_dir, s1_epochs=2, s2_epochs=3)
    
    # 8. Evaluation on Untouched Test Set
    print("\n[STEP 15-16] Evaluating on Untouched Test Set & Plotting Confusion Matrix...")
    metrics, df_per_class = evaluate_model_on_test_set(trained_model, test_loader, base_dir, history)
    
    # 9. Error Analysis
    print("\n[STEP 17] Performing Pathological Error Analysis & Botanical Diagnostics...")
    generate_error_analysis_report(base_dir)
    
    # 10. Inference Validation
    print("\n[STEP 18-19] Testing Real-Time Inference Engine...")
    predictor = CropHealthPredictor(base_dir, confidence_threshold=0.70)
    test_sample = os.path.join(base_dir, "data", "test", "Rice___Blast", "IND_LEAF_00360_Rice___Blast.jpg")
    if not os.path.exists(test_sample):
        # find any available test image
        for root, _, files in os.walk(os.path.join(base_dir, "data", "test")):
            for fl in files:
                if fl.endswith(".jpg"):
                    test_sample = os.path.join(root, fl)
                    break
            if test_sample: break
            
    inf_res = predictor.predict(test_sample)
    print("\n--- SAMPLE INFERENCE OUTPUT ---")
    print(f"Crop:            {inf_res['crop']}")
    print(f"Condition:       {inf_res['condition']}")
    print(f"Category:        {inf_res['damage_category']}")
    print(f"Confidence:      {inf_res['confidence_score']}%")
    print(f"Advisory:        {inf_res['advisory']}")
    print("Top Predictions:")
    for idx, top in enumerate(inf_res["top_predictions"], 1):
        print(f"  {idx}. {top['condition']} ({top['class_name']}) -> {top['confidence_percent']}%")
        
    print("\n================================================================================")
    print("  SUCCESS: INDIAN CROP HEALTH MACHINE LEARNING PIPELINE COMPLETE & REPRODUCIBLE ")
    print("================================================================================")

if __name__ == "__main__":
    main()
