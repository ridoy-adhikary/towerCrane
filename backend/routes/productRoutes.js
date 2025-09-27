import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  contactSeller,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public route → anyone can view products
router.get("/", getProducts);

// ✅ Admin only routes for managing products
router.post("/", protect, adminOnly, addProduct);  // Admin: Add product
router.put("/:id", protect, adminOnly, updateProduct);  // Admin: Edit product
router.delete("/:id", protect, adminOnly, deleteProduct);  // Admin: Delete product

// ✅ Buyer feature → contact seller
router.get("/:id/contact", protect, contactSeller);  // Buyer: Contact product seller

export default router;
