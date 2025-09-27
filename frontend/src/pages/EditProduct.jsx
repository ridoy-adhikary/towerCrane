import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("location", product.location);

    newImages.forEach((img) => formData.append("images", img));

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        await axios.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Product deleted successfully!");
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="location"
          value={product.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* Show existing images */}
        {product.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={`product-${i}`} className="w-full h-32 object-cover rounded-md" />
            ))}
          </div>
        )}

        {/* Show previews of new images */}
        {newImages.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {newImages.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt={`new-${i}`} className="w-full h-32 object-cover rounded-md" />
            ))}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
            Update Product
          </button>
          <button type="button" onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg">
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
