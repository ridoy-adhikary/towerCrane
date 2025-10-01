import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // ✅ Robust image URL helper + fallback
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300";

    // If it's already an absolute URL, return as-is
    if (/^https?:\/\//i.test(imagePath) || imagePath.startsWith("//")) {    
      return imagePath;
    }

    // Normalize leading slashes and encode
    const clean = imagePath.replace(/^\/+/, "");
    // Vite exposes env vars on import.meta.env and VITE_ prefix is recommended
    const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
    return `${apiBase}/${encodeURI(clean)}`;
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? getImageUrl(product.images[0])
      : "https://via.placeholder.com/300";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-xl transition-shadow">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={imageUrl}
          alt={product.title || "Product image"}
          className="w-20 h-20 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/300";
          }}
        />
        <div>
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-gray-700">${product.price}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product._id)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
