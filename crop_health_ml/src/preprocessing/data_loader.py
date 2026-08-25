import os
import pandas as pd
from torch.utils.data import DataLoader
from src.preprocessing.preprocessor import IndianCropDataset
from src.augmentation.botanical_augmentation import get_train_transforms, get_eval_transforms

def build_data_loaders(base_dir, batch_size=32, num_workers=0):
    meta_path = os.path.join(base_dir, "metadata", "image_metadata.csv")
    df = pd.read_csv(meta_path)
    
    df_train = df[df["train_val_test_split"] == "train"]
    df_val = df[df["train_val_test_split"] == "validation"]
    df_test = df[df["train_val_test_split"] == "test"]
    
    train_dataset = IndianCropDataset(df_train, base_dir, transform=get_train_transforms())
    val_dataset = IndianCropDataset(df_val, base_dir, transform=get_eval_transforms())
    test_dataset = IndianCropDataset(df_test, base_dir, transform=get_eval_transforms())
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=num_workers)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=num_workers)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=num_workers)
    
    num_classes = df["class_index"].nunique()
    print(f"DataLoaders built: Train ({len(train_dataset)}), Val ({len(val_dataset)}), Test ({len(test_dataset)}), Classes ({num_classes})")
    return train_loader, val_loader, test_loader, num_classes
