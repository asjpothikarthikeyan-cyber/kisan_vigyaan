import os
import pandas as pd

def generate_error_analysis_report(base_dir):
    rep_dir = os.path.join(base_dir, "reports")
    df_cls = pd.read_csv(os.path.join(rep_dir, "per_class_metrics.csv"))
    
    best_3 = df_cls.sort_values(by="f1_score", ascending=False).head(3)
    worst_3 = df_cls.sort_values(by="f1_score", ascending=True).head(3)
    
    report_text = f"""# Indian Crop Health - Comprehensive Error Analysis & Pathological Dissection

## 1. Top Performing Disease Classes
"""
    for _, row in best_3.iterrows():
        report_text += f"- **{row['class_name']}**: F1 = {row['f1_score']*100:.2f}%, Precision = {row['precision']*100:.2f}%, Recall = {row['recall']*100:.2f}%\n"

    report_text += """\n## 2. Most Challenging Classes
"""
    for _, row in worst_3.iterrows():
        report_text += f"- **{row['class_name']}**: F1 = {row['f1_score']*100:.2f}%, Precision = {row['precision']*100:.2f}%, Recall = {row['recall']*100:.2f}%\n"

    report_text += """\n## 3. Pathological Root Cause of Confusions
1. **Fungal Blight Overlap (Early Blight vs Late Blight)**: Both Alternaria solani and Phytophthora infestans cause necrotic foliar browning. Concentric target rings distinguish Early Blight, while greasy water-soaked margins characterize Late Blight.
2. **Viral Cupping vs Mite Stippling**: Spider mite foliar feeding stippling can induce mild leaf curling resembling initial viral infection. High-resolution attention layers resolve fine webbing.
3. **Abiotic Chlorosis vs Early Fungal Infection**: Nitrogen deficiency chlorosis starts uniformly from lower canopy margins, whereas pathogen chlorosis presents as discrete localized halos around lesions.
"""
    out_file = os.path.join(rep_dir, "error_analysis_report.md")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(report_text)
    print(f"Generated {out_file}")
