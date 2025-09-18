import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      const userData = res.data; // {_id, name, email, token, role}

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on role
      if (userData.role === "admin") navigate("/dashboard");
      else navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900">
      <div className="w-full max-w-md p-8 bg-/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/90">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">📧</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-20 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Extra link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
