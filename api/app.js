import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "../routes/todoRoutes.js"; // 👈 1 level up because file is inside /api

dotenv.config();

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🛣️ Routes
app.use("/api/todos", todoRoutes);

// 🌐 MongoDB Connection (connect once)
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));
}

// ⚠️ DO NOT use app.listen() on Vercel
// ❗ Vercel automatically handles server listening

export default app; // ✅ Must export app (required by Vercel)
