import torch
import torch.nn as nn
import torchvision.models as models

class EfficientNetCropClassifier(nn.Module):
    def __init__(self, num_classes, dropout_rate=0.30):
        super().__init__()
        # Load ImageNet pretrained EfficientNet-B0
        try:
            self.backbone = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
        except Exception:
            self.backbone = models.efficientnet_b0(pretrained=True)
            
        in_features = self.backbone.classifier[1].in_features
        # Custom classification head
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=dropout_rate, inplace=True),
            nn.Linear(in_features, num_classes)
        )

    def forward(self, x):
        return self.backbone(x)

    def freeze_backbone(self):
        """Stage 1: Freeze backbone, train only classification head."""
        for param in self.backbone.features.parameters():
            param.requires_grad = False
        for param in self.backbone.classifier.parameters():
            param.requires_grad = True

    def unfreeze_upper_layers(self):
        """Stage 2: Unfreeze upper feature blocks for fine-tuning."""
        for param in self.backbone.parameters():
            param.requires_grad = True
