import Product from "../models/Product.js";

// ✅ Get all products (public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// ✅ Add product (Admin only)
export const addProduct = async (req, res) => {
  const { title, description, price, category, location, imageUrl } = req.body;

  // Input validation
  if (!title || !description || !price || !category || !location || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({
      user: req.user._id,
      title,
      description,
      price,
      category,
      location,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// ✅ Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update the product with new details
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// ✅ Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
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
    console.error(error);
    res.status(500).json({ message: "Server error while contacting seller" });
  }
};
