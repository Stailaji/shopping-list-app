import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], 
});

export const shoppingModel = mongoose.model("ShoppingList", shoppingListSchema);
