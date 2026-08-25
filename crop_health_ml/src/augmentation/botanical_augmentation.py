import torchvision.transforms as T

def get_train_transforms(image_size=(224, 224)):
    """
    Biologically realistic agricultural foliar augmentations:
    - Flips and minor rotations simulating field camera angles
    - Color jitter simulating cloud/sunlight field illumination
    - Preserves pathogen lesion morphology without geometric distortion
    """
    return T.Compose([
        T.Resize(image_size),
        T.RandomHorizontalFlip(p=0.5),
        T.RandomVerticalFlip(p=0.2),
        T.RandomRotation(degrees=15),
        T.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.10, hue=0.05),
        T.RandomAffine(degrees=0, translate=(0.05, 0.05), shear=5),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

def get_eval_transforms(image_size=(224, 224)):
    """Clean validation and test transformations without any stochastic augmentation."""
    return T.Compose([
        T.Resize(image_size),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
