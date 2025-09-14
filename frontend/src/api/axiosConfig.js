import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor to attach token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
