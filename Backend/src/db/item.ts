import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  isPurchased: { type: Boolean, default: false },
});

export const ItemModel = mongoose.model("Item", ItemSchema);
