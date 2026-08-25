import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR
import copy

def train_two_stage_model(model, train_loader, val_loader, base_dir, device="cpu", s1_epochs=2, s2_epochs=3):
    models_dir = os.path.join(base_dir, "models")
    best_dir = os.path.join(models_dir, "best_model")
    final_dir = os.path.join(models_dir, "final_model")
    os.makedirs(best_dir, exist_ok=True)
    os.makedirs(final_dir, exist_ok=True)

    criterion = nn.CrossEntropyLoss()
    history = {"train_loss": [], "val_loss": [], "train_acc": [], "val_acc": []}
    best_val_loss = float("inf")
    best_model_weights = None

    # === STAGE 1: Feature Extraction (Frozen Backbone) ===
    print("\n--- STAGE 1: Feature Extraction (Backbone Frozen) ---")
    model.freeze_backbone()
    optimizer_s1 = optim.AdamW(filter(lambda p: p.requires_grad, model.parameters()), lr=1e-3, weight_decay=0.01)
    scheduler_s1 = CosineAnnealingLR(optimizer_s1, T_max=s1_epochs)

    for epoch in range(1, s1_epochs + 1):
        model.train()
        running_loss, correct, total = 0.0, 0, 0
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer_s1.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer_s1.step()

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        scheduler_s1.step()
        train_loss = running_loss / total
        train_acc = correct / total

        # Validation
        model.eval()
        v_loss, v_corr, v_tot = 0.0, 0, 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                v_loss += loss.item() * images.size(0)
                _, preds = torch.max(outputs, 1)
                v_corr += torch.sum(preds == labels.data).item()
                v_tot += labels.size(0)

        val_loss = v_loss / v_tot
        val_acc = v_corr / v_tot

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_acc"].append(train_acc)
        history["val_acc"].append(val_acc)

        print(f"Stage 1 - Epoch {epoch}/{s1_epochs} | Train Loss: {train_loss:.4f} Acc: {train_acc*100:.2f}% | Val Loss: {val_loss:.4f} Acc: {val_acc*100:.2f}%")
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_model_weights = copy.deepcopy(model.state_dict())

    # === STAGE 2: Fine-Tuning (Unfreeze Upper Layers) ===
    print("\n--- STAGE 2: Fine-Tuning (Upper Layers Unfrozen) ---")
    model.unfreeze_upper_layers()
    optimizer_s2 = optim.AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
    scheduler_s2 = CosineAnnealingLR(optimizer_s2, T_max=s2_epochs)

    for epoch in range(1, s2_epochs + 1):
        model.train()
        running_loss, correct, total = 0.0, 0, 0
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer_s2.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer_s2.step()

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        scheduler_s2.step()
        train_loss = running_loss / total
        train_acc = correct / total

        # Validation
        model.eval()
        v_loss, v_corr, v_tot = 0.0, 0, 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                v_loss += loss.item() * images.size(0)
                _, preds = torch.max(outputs, 1)
                v_corr += torch.sum(preds == labels.data).item()
                v_tot += labels.size(0)

        val_loss = v_loss / v_tot
        val_acc = v_corr / v_tot

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_acc"].append(train_acc)
        history["val_acc"].append(val_acc)

        print(f"Stage 2 - Epoch {epoch}/{s2_epochs} | Train Loss: {train_loss:.4f} Acc: {train_acc*100:.2f}% | Val Loss: {val_loss:.4f} Acc: {val_acc*100:.2f}%")
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_model_weights = copy.deepcopy(model.state_dict())

    # Save artifacts
    torch.save(best_model_weights, os.path.join(best_dir, "best_model.pth"))
    torch.save(model.state_dict(), os.path.join(final_dir, "final_model.pth"))
    print("\nSaved models/best_model/best_model.pth and models/final_model/final_model.pth")
    return model, history
