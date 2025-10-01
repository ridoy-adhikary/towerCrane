import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const ProductPage = ({ user, onAddToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);

  // Backend base URL - adjust this to match your backend
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.response?.data || err.message);
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCartClick = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (user.role !== "buyer") {
      alert("Only buyers can add items to cart");
      return;
    }

    setAddingToCart(product._id);

    try {
      // Fix: Pass product ID instead of entire product object
      if (onAddToCart) {
        await onAddToCart(product._id);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  // Helper function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300";
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with /uploads, prepend base URL
    if (imagePath.startsWith('/uploads')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // If it's just a filename, add /uploads/ prefix
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl text-gray-300 mb-4">🏗️</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500">No products have been uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={getImageUrl(product.images?.[0])}
                alt={product.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', product.images?.[0]);
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {product.condition || "N/A"}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500">
                  {product.year || "N/A"}
                </span>
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {product.location || "Unknown"}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Details
                </button>

                {user?.role === "buyer" && (
                  <button
                    onClick={() => handleAddToCartClick(product)}
                    disabled={addingToCart === product._id}
                    className={`flex-1 text-center py-2 rounded-lg font-medium transition-colors ${
                      addingToCart === product._id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {addingToCart === product._id ? "Adding..." : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;