import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import {
  getProducts,
  getProductById,   // ✅ new controller
  addProduct,
  updateProduct,
  deleteProduct,
  contactSeller,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save inside /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB per image
});

// Admin only → get only logged-in admin's products
router.get("/my", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your products" });
  }
});

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById); // ✅ fetch single product by id

// Admin only routes
router.post("/", protect, adminOnly, upload.array("images", 5), addProduct);
router.put("/:id", protect, adminOnly, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Buyer route → contact seller
router.get("/:id/contact", protect, contactSeller);

export default router;
