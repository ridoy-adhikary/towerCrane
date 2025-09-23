import React, { useState } from "react";
import axios from "../api/axiosConfig.js";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send contact form data to backend
      await axios.post("/contact", form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center p-6">
      <div className="bg-amber-100 shadow-md rounded-lg p-8 max-w-2xl w-full">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center text-purple-700">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We’d love to hear from you! Fill out the form below or connect with us through social media.
        </p>

        {/* Success Message */}
        {success && (
          <p className="text-green-600 mb-4 text-center">{success}</p>
        )}

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300"></div>

        {/* Contact Info */}
        <div className="text-center space-y-3 text-gray-700">
          <p className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-purple-600" /> contact@example.com
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaPhone className="text-purple-600" /> +123 456 7890
          </p>
          <p className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-purple-600" /> Chengdu, Sichuan, China
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-blue-600 hover:scale-110 transition-transform" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-blue-400 hover:scale-110 transition-transform" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-blue-700 hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl text-gray-800 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
