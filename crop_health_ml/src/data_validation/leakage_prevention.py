import os
import pandas as pd

def verify_zero_data_leakage(base_dir):
    meta_path = os.path.join(base_dir, "metadata", "image_metadata.csv")
    df = pd.read_csv(meta_path)
    
    print("Verifying Zero Data Leakage Across Partitions...")
    
    train_hashes = set(df[df["train_val_test_split"] == "train"]["md5_hash"])
    val_hashes = set(df[df["train_val_test_split"] == "validation"]["md5_hash"])
    test_hashes = set(df[df["train_val_test_split"] == "test"]["md5_hash"])
    
    train_val_leak = train_hashes.intersection(val_hashes)
    train_test_leak = train_hashes.intersection(test_hashes)
    val_test_leak = val_hashes.intersection(test_hashes)
    
    assert len(train_val_leak) == 0, f"LEAKAGE DETECTED: {len(train_val_leak)} hashes in Train & Val!"
    assert len(train_test_leak) == 0, f"LEAKAGE DETECTED: {len(train_test_leak)} hashes in Train & Test!"
    assert len(val_test_leak) == 0, f"LEAKAGE DETECTED: {len(val_test_leak)} hashes in Val & Test!"
    
    print("Zero Data Leakage Confirmed! 100% Partition Isolation Verified.")
    return True

if __name__ == "__main__":
    base_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\crop_health_ml"
    verify_zero_data_leakage(base_dir)
