import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // ✅ Fix: prepend server URL to product image
  const imageUrl =
    product.images && product.images.length > 0
      ? `http://localhost:5000/${product.images[0]}`
      : "https://via.placeholder.com/80";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-xl transition-shadow">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="w-20 h-20 rounded-lg object-cover"
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
