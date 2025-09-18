import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }

    if (storedUser.role !== "buyer") {
      navigate("/"); // Only buyers can access
      return;
    }

    setUser(storedUser);

    // Fetch cart items
    const fetchCart = async () => {
      try {
        const res = await axios.get("/cart", {
          headers: { Authorization: `Bearer ${storedUser.token}` },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load cart items");
      }
    };
    fetchCart();
  }, [navigate]);

  if (!user) return null; // Wait until user is loaded

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Favourite Products</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="font-bold mb-2">${item.price}</p>
              <p className="text-gray-500 mb-2">Seller: {item.user?.name || "Unknown"}</p>
              <a
                href={`mailto:${item.user?.email}`}
                className="mt-auto bg-purple-600 text-white py-2 rounded-lg text-center hover:bg-purple-700 transition"
              >
                Contact Seller
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
