import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // make sure backend URL is correct
  headers: { "Content-Type": "application/json" },
});

// Interceptor to add Authorization token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
