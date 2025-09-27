import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Buyer-only routes (must be logged in)
router.get("/", protect, getCart); // Fetch cart for the logged-in user
router.post("/", protect, addToCart); // Add product to cart for the logged-in user
router.delete("/:productId", protect, removeFromCart); // Remove product from cart

export default router;
