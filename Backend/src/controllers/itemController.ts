import asyncHandler from '../middlewares/asyncHandler';
import { shoppingModel } from '../db/shoppingList';
import { ItemModel } from '../db/item';
import { NotFoundError, ValidationError } from '../utils/errors';
import mongoose from 'mongoose';

class ItemController {
    // Artikel zu einer Einkaufsliste hinzufügen
    addItem = asyncHandler(async (req, res) => {
        const { id } = req.params; // Einkaufslisten-ID
        const { name, description, quantity, isPurchased } = req.body;

        // Validierung der Einkaufslisten-ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ValidationError('Ungültige Einkaufslisten-ID');
        }

        // Validierung der Eingabefelder
        if (!name || !description) {
            throw new ValidationError('Name und Beschreibung sind erforderlich');
        }

        const shoppingList = await shoppingModel.findById(id);
        if (!shoppingList) {
            throw new NotFoundError('Einkaufsliste nicht gefunden');
        }

        // Artikel erstellen und hinzufügen
        const item = await ItemModel.create({ name, description, quantity, isPurchased });
        shoppingList.items.push(item._id);
        await shoppingList.save();

        res.status(200).json({ message: 'Artikel erfolgreich hinzugefügt', data: item });
    });

    // Artikel aus einer Einkaufsliste entfernen
    removeItem = asyncHandler(async (req, res) => {
        const { id, itemId } = req.params;

        // Validierung der IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(itemId)) {
            throw new ValidationError('Ungültige Einkaufslisten- oder Artikel-ID');
        }

        const shoppingList = await shoppingModel.findById(id);
        if (!shoppingList) {
            throw new NotFoundError('Einkaufsliste nicht gefunden');
        }

        shoppingList.items = shoppingList.items.filter(item => item.toString() !== itemId);
        await shoppingList.save();

        await ItemModel.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Artikel erfolgreich entfernt' });
    });

    // Artikel aktualisieren
    updateItem = asyncHandler(async (req, res) => {
        const { itemId } = req.params;
        const { name, description, quantity, isPurchased } = req.body;

        // Validierung der Artikel-ID
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            throw new ValidationError('Ungültige Artikel-ID');
        }

        const item = await ItemModel.findById(itemId);
        if (!item) {
            throw new NotFoundError('Artikel nicht gefunden');
        }

        // Aktualisierung der Werte
        item.name = name || item.name;
        item.description = description || item.description;
        item.quantity = quantity || item.quantity;
        item.isPurchased = isPurchased !== undefined ? isPurchased : item.isPurchased;

        await item.save();
        res.status(200).json({ message: 'Artikel erfolgreich aktualisiert', data: item });
    });
}

export default new ItemController();
