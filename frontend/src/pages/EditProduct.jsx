import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "../api/axiosConfig.js"; // ✅ now points to existing file
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    image: "",
  });

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, form);
      alert("✅ Product updated!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div
      className="bg-gray-50 min-h-screen"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">EquipX</h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold"
            >
              <span className="material-symbols-outlined">directions_car</span>
              <span>My Products</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">
                add_circle_outline
              </span>
              <span>Add Product</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Account Settings</span>
            </a>
          </nav>

          <div className="p-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">My Products</h2>
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700 transition-colors"
            >
              <span className="material-symbols-outlined">save</span>
              <span>Save Changes</span>
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <img
                      src={form.image || "https://via.placeholder.com/100"}
                      alt="Product"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {form.title || "No title"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button className="text-gray-500 hover:text-gray-700">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProduct;
