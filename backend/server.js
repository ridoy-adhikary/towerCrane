import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import multer from "multer";  // Import multer
import { fileURLToPath } from "url";  // Import fileURLToPath for ES Module support
import { dirname } from "path";       // Import dirname for ES Module support

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);  // Get the file path
const __dirname = dirname(__filename);  // Extract the directory name

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Folder to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Ensure unique file names
  },
});
const upload = multer({ storage: storage });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);  // Make sure productRoutes can handle image uploads via multer
app.use("/api/cart", cartRoutes);

// Serve uploaded images (fix __dirname issue here)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Serve images from the 'uploads' folder

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
