import React, { useState } from "react";
import axios from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.location ||
      images.length === 0
    ) {
      alert("All fields and at least one image are required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("location", form.location);
    images.forEach((img) => formData.append("images", img));

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "admin") {
        alert("You are not authorized to add products.");
        setLoading(false);
        return;
      }

      await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Add a New Product
        </h2>

        <form className="space-y-6" onSubmit={handleAdd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Product Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <textarea
            placeholder="Product Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
          />

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-2xl shadow-md border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
