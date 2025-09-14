import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig.js";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-blue-500 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"/>
          <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"/>
          <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-primary focus:border-primary"/>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
