import Cart from "../models/Cart.js";

// ✅ Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      // If product already in cart → update quantity
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      // Else add new product
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
