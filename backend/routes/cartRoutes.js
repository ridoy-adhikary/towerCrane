import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Buyer-only routes (must be logged in)
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);

export default router;
