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

        // ✅ Our backend always returns { products: [...] }
        if (Array.isArray(res.data.products)) {
          setCartItems(res.data.products);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load cart items");
        setCartItems([]); // prevent crashes
      }
    };
    fetchCart();
  }, [navigate]);

  if (!user) return null; // Wait until user is loaded

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Favourite Products
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <img
                src={item.product?.image || "https://via.placeholder.com/150"}
                alt={item.product?.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">
                {item.product?.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {item.product?.description}
              </p>
              <p className="font-bold mb-2">${item.product?.price}</p>
              <p className="text-gray-500 mb-2">
                Quantity: {item.quantity}
              </p>
              <p className="text-gray-500 mb-2">
                Seller: {item.product?.user?.name || "Unknown"}
              </p>
              {item.product?.user?.email && (
                <a
                  href={`mailto:${item.product.user.email}`}
                  className="mt-auto bg-purple-600 text-white py-2 rounded-lg text-center hover:bg-purple-700 transition"
                >
                  Contact Seller
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
