import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig.js";
import ProductCard from "../components/ProductCard.jsx";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/my");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
