import os
import torch
import json
import pandas as pd
import torch.nn.functional as F
from PIL import Image
from src.training.model import EfficientNetCropClassifier
from src.augmentation.botanical_augmentation import get_eval_transforms

class CropHealthPredictor:
    def __init__(self, base_dir, confidence_threshold=0.70):
        self.base_dir = base_dir
        self.confidence_threshold = confidence_threshold
        self.device = "cpu"
        
        # Load class mapping
        mapping_path = os.path.join(base_dir, "models", "class_mapping.json")
        with open(mapping_path, "r") as f:
            self.class_mapping = json.load(f)
            
        self.idx_to_class = {v: k for k, v in self.class_mapping.items()}
        self.num_classes = len(self.class_mapping)
        
        # Load metadata for condition & damage category lookup
        meta_path = os.path.join(base_dir, "metadata", "image_metadata.csv")
        self.df_meta = pd.read_csv(meta_path).drop_duplicates(subset=["class_name"])
        self.meta_lookup = {row["class_name"]: row for _, row in self.df_meta.iterrows()}
        
        # Load model
        self.model = EfficientNetCropClassifier(num_classes=self.num_classes)
        model_path = os.path.join(base_dir, "models", "best_model", "best_model.pth")
        if os.path.exists(model_path):
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.eval()
        self.transform = get_eval_transforms()

    def predict(self, image_input):
        """
        Accepts PIL Image or file path.
        Returns:
            Crop, Condition, Damage Category, Confidence Score, Top-3 Predictions.
        """
        if isinstance(image_input, str):
            image = Image.open(image_input).convert("RGB")
        else:
            image = image_input.convert("RGB")
            
        tensor = self.transform(image).unsqueeze(0).to(self.device)
        with torch.no_grad():
            logits = self.model(tensor)
            probs = F.softmax(logits, dim=1).squeeze(0)
            
        top3_probs, top3_indices = torch.topk(probs, 3)
        top1_idx = top3_indices[0].item()
        top1_prob = top3_probs[0].item()
        top1_cname = self.idx_to_class[top1_idx]
        
        meta = self.meta_lookup.get(top1_cname, {})
        crop = meta.get("crop", top1_cname.split("___")[0])
        condition = meta.get("condition", top1_cname.split("___")[1].replace("_", " "))
        damage_cat = meta.get("damage_category", "Disease")
        
        top3_list = []
        for p, idx in zip(top3_probs, top3_indices):
            c_name = self.idx_to_class[idx.item()]
            c_cond = self.meta_lookup.get(c_name, {}).get("condition", c_name)
            top3_list.append({
                "class_name": c_name,
                "condition": c_cond,
                "confidence_percent": round(p.item() * 100, 2)
            })
            
        result = {
            "crop": crop,
            "condition": condition,
            "damage_category": damage_cat,
            "confidence_score": round(top1_prob * 100, 2),
            "is_confident": top1_prob >= self.confidence_threshold,
            "top_predictions": top3_list
        }
        
        if top1_prob < self.confidence_threshold:
            result["advisory"] = "Unable to confidently identify condition. Expert verification recommended."
        else:
            result["advisory"] = f"Diagnosed with {round(top1_prob*100, 1)}% confidence under {damage_cat} protocol."
            
        return result
