import Cart from "../models/Cart.js";

// ✅ Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    res.json({ products: cart ? cart.products : [] }); // Always return products array
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if productId and quantity are valid
    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ user: req.user._id, products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      // If product exists, update the quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it to the cart
      cart.products.push({ product: productId, quantity });
    }

    // Save cart and populate the product details
    await cart.save();
    await cart.populate("products.product");

    // Return updated cart products
    res.status(201).json({ products: cart.products });
  } catch (error) {
    console.error("Error adding to cart:", error);
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
    await cart.populate("products.product");
    res.json({ products: cart.products }); // Always return products
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
