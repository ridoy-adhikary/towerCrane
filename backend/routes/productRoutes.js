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

// ✅ Admin only routes
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// ✅ Buyer feature → contact seller
router.get("/:id/contact", protect, contactSeller);

export default router;
