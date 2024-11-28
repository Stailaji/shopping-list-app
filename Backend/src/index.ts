import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/node-typescript-app";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection failed:", err));
