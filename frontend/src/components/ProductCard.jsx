import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  // If product.images is an array (multiple images), show the first image
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/80";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
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
