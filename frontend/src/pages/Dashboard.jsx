import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig.js";
import ProductCard from "../components/ProductCard.jsx";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products/my"); // fetch admin's products
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to fetch your products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Failed to delete product:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-6 text-xl">Loading your products...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-bold">My Products</h2>
      {products.length ? (
        products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={handleDelete}
            onEdit={() => {}}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Dashboard;
