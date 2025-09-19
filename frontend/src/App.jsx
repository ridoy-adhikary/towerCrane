import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from "./api/axiosConfig.js";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Load user info and cart
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchCart = async () => {
      if (storedUser?.role === "buyer") {
        try {
          const res = await axios.get("/cart", {
            headers: { Authorization: `Bearer ${storedUser.token}` },
          });
          setCart(res.data.products || []);
        } catch (err) {
          console.error("Failed to load cart:", err);
        }
      }
    };

    fetchCart();
  }, []);

  // Function to add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Public layout
  const PublicLayout = () => (
    <>
      <Navbar user={user} setUser={setUser} cart={{ products: cart }} />
      <Outlet />
    </>
  );

  // Admin layout
  const AdminLayout = () => (
    <>
      <Header />
      <Outlet />
    </>
  );

  return (
    
    <Routes>


      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product"
          element={<Product user={user} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail user={user} onAddToCart={handleAddToCart} />}
        />

        {/* Buyer Routes */}
        <Route
          path="/profile"
          element={user?.role === "buyer" ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={user?.role === "buyer" ? <Cart cart={cart} /> : <Navigate to="/" />}
        />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route
          path="/dashboard"
          element={user?.role === "admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/add-product"
          element={user?.role === "admin" ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-product/:id"
          element={user?.role === "admin" ? <EditProduct /> : <Navigate to="/" />}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
