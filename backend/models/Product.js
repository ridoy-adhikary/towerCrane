import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  status: { type: String, default: "Active" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
