import express from 'express';
import shoppingListController from '../controllers/shoppingListController';
import itemController from '../controllers/itemController';
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

// Einkaufslisten-Routen
router.get('/shoppingLists', shoppingListController.getAllShoppingLists);
router.get("/shoppingLists/statistics", shoppingListController.getStatistics);
router.get("/shoppingLists/search", shoppingListController.searchShoppingLists);
router.get('/shoppingLists/:id', shoppingListController.getShoppingList); // Einzelne Liste abrufen
router.post('/shoppingLists', shoppingListController.createShoppingList);
router.put('/shoppingLists/:id', shoppingListController.updateShoppingList);
router.delete('/shoppingLists/:id', shoppingListController.deleteShoppingList);
router.get("/shoppingLists/itemByName/:itemName", shoppingListController.getShoppingListsByItem);



// Artikel-Routen
router.post('/shoppingLists/:id/items', itemController.addItem);
router.delete('/shoppingLists/:id/items/:itemId', itemController.removeItem);
router.put('/items/:itemId', itemController.updateItem);

  
export default router;
