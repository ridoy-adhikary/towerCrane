import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-blue-500 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"/>
          <button type="submit" className="w-full bg-primary text-red py-3 rounded-lg font-bold hover:opacity-90">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
