import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/dashboard" className="text-xl font-bold text-primary">Tower-Crane</Link>
        <div className="flex items-center gap-4">
          <Link className="text-gray-600 hover:text-gray-900" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-600 hover:text-gray-900" to="/add-product">Add Product</Link>
          <Link className="text-gray-600 hover:text-gray-900" to="/my-products">Edit Products</Link>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-bold">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
