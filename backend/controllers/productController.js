import Product from "../models/Product.js";

// ✅ Get all products (public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add product (Admin only)
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, location, imageUrl } = req.body;

    const product = await Product.create({
      user: req.user._id,
      title,
      description,
      price,
      category,
      location,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Admin check is handled in middleware (adminOnly)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Contact seller (Buyer feature)
export const contactSeller = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      sellerName: product.user.name,
      sellerEmail: product.user.email,
      productTitle: product.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
