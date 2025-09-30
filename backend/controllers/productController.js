import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching product" });
  }
};

// Add product (multiple images)
export const addProduct = async (req, res) => {
  const { title, description, price, category, location } = req.body;
  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  if (!title || !description || !price || !category || !location || images.length === 0) {
    return res.status(400).json({ message: "All fields and at least one image are required" });
  }

  try {
    const product = new Product({
      user: req.user._id,
      title,
      description,
      price,
      category,
      location,
      images,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let updatedImages = product.images;
    if (req.files && req.files.length > 0) {
      updatedImages = req.files.map(file => `/uploads/${file.filename}`);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: updatedImages },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Contact seller
export const contactSeller = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({
      sellerName: product.user.name,
      sellerEmail: product.user.email,
      productTitle: product.title,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error while contacting seller" });
  }
};
