import React, { useState } from "react";
import axios from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);  // Save the file to state
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.name || !form.description || !form.price || !form.category || !form.stock || !image) {
      alert("All fields and image are required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("image", image);  // Attach the image

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "admin") {
        alert("You are not authorized to add products.");
        return;
      }

      const res = await axios.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",  // Important for file upload
        },
      });

      alert("Product added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-blue-300 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>
      <form className="space-y-4" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <textarea
          placeholder="Product Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* File upload for image */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* Show image preview if file is selected */}
        {image && (
          <div className="my-4">
            <img src={URL.createObjectURL(image)} alt="Product Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
