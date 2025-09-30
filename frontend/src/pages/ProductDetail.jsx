import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const ProductDetail = ({ user, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error.response?.data || error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (user.role !== "buyer") {
      alert("Only buyers can add items to cart");
      return;
    }

    setAddingToCart(true);

    try {
      await axios.post("/cart", { productId: product._id, quantity: 1 });
      if (onAddToCart) onAddToCart(product);
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/product")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // ✅ Build image URLs properly
  const images = product.images?.map((img) =>
    img.startsWith("http") ? img : `http://localhost:5000${img}`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Product Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={images?.[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === idx ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <img src={img} alt={product.title} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="text-2xl text-green-600 font-bold mb-2">{formatPrice(product.price)}</div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-4">Category: {product.category}</p>
            <p className="text-gray-500 mb-6">Location: {product.location}</p>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`px-6 py-3 rounded-lg text-white font-semibold ${
                addingToCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
