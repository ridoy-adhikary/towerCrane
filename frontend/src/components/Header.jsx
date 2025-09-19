import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login after logout
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Product", path: "/add-product" },
    { name: "Edit Products", path: "/my-products" },
  ];

  return (
    <header className="flex items-center bg-blue-400 justify-between py-5 px-6 font-medium relative shadow-md sticky top-0 z-50">
      {/* Logo / Title */}
      <div className="flex items-center">
        <Link to="/dashboard">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-30 h-10 object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 text-gray-700">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              <p>{item.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            src="/assets/profile_icon.png"
            alt="Profile"
            className="w-5 h-5 cursor-pointer"
          />
          <div className="absolute right-0 mt-3 w-36 hidden group-hover:flex flex-col gap-2 p-3 bg-slate-100 text-gray-500 rounded shadow-lg">
            {/* ✅ Link instead of plain <p> */}
            <Link
              to="/dashboard"
              className="cursor-pointer hover:text-black"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-left cursor-pointer hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setMenuVisible(!menuVisible)}
          src="/assets/menu_icon.png"
          alt="Menu"
          className="w-5 h-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Mobile Menu */}
      {menuVisible && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col items-start px-6 py-4 gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuVisible(false)}
              className="w-full text-gray-700 hover:text-primary"
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setMenuVisible(false);
            }}
            className="w-full text-left text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
