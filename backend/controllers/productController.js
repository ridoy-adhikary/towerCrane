import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.json(products);
};

export const addProduct = async (req, res) => {
  const { title, description, price, category, location, imageUrl } = req.body;
  const product = await Product.create({
    user: req.user._id,
    title, description, price, category, location, imageUrl
  });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await product.remove();
  res.json({ message: "Product removed" });
};
