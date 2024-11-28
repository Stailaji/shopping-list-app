import asyncHandler from '../middlewares/asyncHandler';
import { shoppingModel } from '../db/shoppingList';
import { ItemModel } from '../db/item';
import { NotFoundError, ValidationError } from '../utils/errors';
import mongoose from 'mongoose';

class ShoppingListController {
    // Alle Einkaufslisten abrufen
    getAllShoppingLists = asyncHandler(async (req, res) => {
        const shoppingLists = await shoppingModel.find().populate('items');
        res.status(200).json({ data: shoppingLists });
    });

    getShoppingList = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ValidationError('Ungültige Einkaufslisten-ID');
        }

        const shoppingList = await shoppingModel.findById(id).populate('items');
        if (!shoppingList) {
            throw new NotFoundError('Einkaufsliste nicht gefunden');
        }

        res.status(200).json({ data: shoppingList });
    });

    // Neue Einkaufsliste erstellen
    createShoppingList = asyncHandler(async (req, res) => {
        const { name, description } = req.body;

        if (!name || !description) {
            throw new ValidationError('Name und Beschreibung sind erforderlich');
        }

        const shoppingList = await shoppingModel.create({ name, description });
        res.status(201).json({ data: shoppingList });
    });

    // Einkaufsliste aktualisieren
    updateShoppingList = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ValidationError('Ungültige Einkaufslisten-ID');
        }

        const shoppingList = await shoppingModel.findById(id);
        if (!shoppingList) {
            throw new NotFoundError('Einkaufsliste nicht gefunden');
        }

        shoppingList.name = name || shoppingList.name;
        shoppingList.description = description || shoppingList.description;
        await shoppingList.save();

        res.status(200).json({ data: shoppingList });
    });

    // Einkaufslisten löschen
    deleteShoppingList = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ValidationError('Ungültige Einkaufslisten-ID');
        }

        const shoppingList = await shoppingModel.findByIdAndDelete(id);
        if (!shoppingList) {
            throw new NotFoundError('Einkaufsliste nicht gefunden');
        }

        res.status(200).json({ message: 'Einkaufsliste erfolgreich gelöscht' });
    });

    getShoppingListsByItem = asyncHandler(async (req, res) => {
        const { itemName } = req.params;
    
        if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {
            throw new ValidationError('Artikelname darf nicht leer sein');
        }
    
        // Suchen von Artikeln nach Namen (case-insensitive Suche)
        const items = await ItemModel.find({
            name: { $regex: itemName, $options: 'i' },
        });
    
        if (!items || items.length === 0) {
            throw new NotFoundError('Keine Artikel mit diesem Namen gefunden');
        }
    
        // Extrahieren der IDs der gefundenen Artikel
        const itemIds = items.map((item) => item._id);
    
        // Einkaufslisten abrufen, die diese Artikel enthalten
        const shoppingLists = await shoppingModel.find({ items: { $in: itemIds } }).populate('items');
    
        if (!shoppingLists || shoppingLists.length === 0) {
            throw new NotFoundError('Keine Einkaufslisten mit Artikeln dieses Namens gefunden');
        }
    
        res.status(200).json({ data: shoppingLists });
    });

    // Einkaufslisten durchsuchen
    searchShoppingLists = asyncHandler(async (req, res) => {
        const { query } = req.query;

        if (!query || typeof query !== 'string' || query.trim() === '') {
            throw new ValidationError('Suchanfrage darf nicht leer sein');
        }

        const shoppingLists = await shoppingModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        }).populate('items');

        res.status(200).json({ data: shoppingLists });
    });

    // Einkaufslisten-Statistiken
    getStatistics = asyncHandler(async (req, res) => {
        const shoppingLists = await shoppingModel.find().populate('items');

        const statistics = shoppingLists.map((list) => {
            const totalItems = list.items.length;
            const purchasedItems = list.items.filter((item: any) => item.isPurchased).length;
            const purchasedPercentage = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;

            return {
                listId: list._id,
                name: list.name,
                purchasedPercentage,
            };
        });

        res.status(200).json({ data: statistics });
    });
}

export default new ShoppingListController();
