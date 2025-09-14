import React, { useState } from "react";
import Header from "../components/Header.jsx";
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
    image: ""
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", form);
      alert("Product added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6 max-w-2xl mx-auto bg-blue-300 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Add Product</h2>
        <form className="space-y-4" onSubmit={handleAdd}>
          <input type="text" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full border px-3 py-2 rounded-lg focus:ring-primary focus:border-primary"/>
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border px-3 py-2 rounded-lg focus:ring-primary focus:border-primary"/>
          <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full border px-3 py-2 rounded-lg focus:ring-primary focus:border-primary"/>
          <input type="text" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border px-3 py-2 rounded-lg focus:ring-primary focus:border-primary"/>
          <input type="text" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="w-full border px-3 py-2 rounded-lg focus:ring-primary focus:border-primary"/>
          <button type="submit" className="bg-primary text-red-600 px-4 py-2 rounded-lg font-bold hover:opacity-90">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
