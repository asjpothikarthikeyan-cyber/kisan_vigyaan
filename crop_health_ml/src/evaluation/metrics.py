import os
import torch
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix, classification_report

def evaluate_model_on_test_set(model, test_loader, base_dir, history, device="cpu"):
    rep_dir = os.path.join(base_dir, "reports")
    models_dir = os.path.join(base_dir, "models")
    os.makedirs(rep_dir, exist_ok=True)
    
    with open(os.path.join(models_dir, "class_mapping.json"), "r") as f:
        class_mapping = json.load(f)
    idx_to_class = {v: k for k, v in class_mapping.items()}
    class_names = [idx_to_class[i] for i in range(len(idx_to_class))]

    model.eval()
    all_preds, all_labels = [], []
    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            outputs = model(images)
            _, preds = torch.max(outputs, 1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.numpy())

    all_preds = np.array(all_preds)
    all_labels = np.array(all_labels)

    acc = accuracy_score(all_labels, all_preds)
    p_macro, r_macro, f1_macro, _ = precision_recall_fscore_support(all_labels, all_preds, average="macro", zero_division=0)
    p_weighted, r_weighted, f1_weighted, _ = precision_recall_fscore_support(all_labels, all_preds, average="weighted", zero_division=0)
    
    # Per-class metrics
    p_cls, r_cls, f1_cls, supp_cls = precision_recall_fscore_support(all_labels, all_preds, average=None, zero_division=0)
    
    df_per_class = pd.DataFrame({
        "class_name": class_names,
        "precision": p_cls.round(4),
        "recall": r_cls.round(4),
        "f1_score": f1_cls.round(4),
        "support": supp_cls
    })
    df_per_class.to_csv(os.path.join(rep_dir, "per_class_metrics.csv"), index=False)

    # Classification Report
    clf_rep = classification_report(all_labels, all_preds, target_names=class_names, zero_division=0)
    with open(os.path.join(rep_dir, "classification_report.txt"), "w") as f:
        f.write(clf_rep)

    # 1. Confusion Matrix Heatmap Plot
    cm = confusion_matrix(all_labels, all_preds)
    plt.figure(figsize=(16, 14))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.title("Indian Crop Health - EfficientNet-B0 Confusion Matrix (Test Set)", fontsize=14, fontweight="bold")
    plt.xlabel("Predicted Class", fontsize=12)
    plt.ylabel("Ground Truth Class", fontsize=12)
    plt.xticks(rotation=90, fontsize=8)
    plt.yticks(rotation=0, fontsize=8)
    plt.tight_layout()
    plt.savefig(os.path.join(rep_dir, "confusion_matrix.png"), dpi=300)
    plt.close()

    # 2. Training Curves
    plt.figure(figsize=(14, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history["train_loss"], label="Train Loss", color="#0077b6", lw=2)
    plt.plot(history["val_loss"], label="Val Loss", color="#d62828", lw=2)
    plt.title("Training and Validation Loss", fontweight="bold")
    plt.xlabel("Epoch")
    plt.ylabel("Cross-Entropy Loss")
    plt.legend()
    plt.grid(True, alpha=0.3)

    plt.subplot(1, 2, 2)
    plt.plot(np.array(history["train_acc"])*100, label="Train Accuracy", color="#2a9d8f", lw=2)
    plt.plot(np.array(history["val_acc"])*100, label="Val Accuracy", color="#e76f51", lw=2)
    plt.title("Training and Validation Accuracy (%)", fontweight="bold")
    plt.xlabel("Epoch")
    plt.ylabel("Accuracy (%)")
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(rep_dir, "training_history.png"), dpi=300)
    plt.close()

    # 3. Per-class F1 Bar Chart
    plt.figure(figsize=(14, 7))
    plt.barh(df_per_class["class_name"], df_per_class["f1_score"] * 100, color="#06d6a0")
    plt.axvline(f1_macro * 100, color="red", linestyle="--", label=f"Macro F1: {f1_macro*100:.2f}%")
    plt.title("Per-Class F1-Score Performance (Test Set)", fontsize=13, fontweight="bold")
    plt.xlabel("F1-Score (%)")
    plt.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(rep_dir, "per_class_performance.png"), dpi=300)
    plt.close()

    summary_metrics = {
        "test_accuracy": float(acc),
        "macro_precision": float(p_macro),
        "macro_recall": float(r_macro),
        "macro_f1": float(f1_macro),
        "weighted_precision": float(p_weighted),
        "weighted_recall": float(r_weighted),
        "weighted_f1": float(f1_weighted),
        "total_test_samples": int(len(all_labels))
    }
    with open(os.path.join(rep_dir, "test_metrics.json"), "w") as f:
        json.dump(summary_metrics, f, indent=2)

    print("\n================ EVALUATION SUMMARY (UNTOUCHED TEST SET) ================")
    print(f"Overall Test Accuracy:    {acc*100:.2f}%")
    print(f"Macro F1-Score:           {f1_macro*100:.2f}%")
    print(f"Weighted F1-Score:        {f1_weighted*100:.2f}%")
    print(f"Macro Precision:          {p_macro*100:.2f}%")
    print(f"Macro Recall:             {r_macro*100:.2f}%")
    print(f"Total Test Samples:       {len(all_labels):,}")
    print("========================================================================\n")
    return summary_metrics, df_per_class
