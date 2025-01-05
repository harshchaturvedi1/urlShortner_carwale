import axios from "axios";

// Retrieve the base URL for the API from the environment variable.
// Default to "http://localhost:3005" for development if not specified.
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

// Create an Axios instance with a predefined base URL.
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Base path for all API requests
});

// Add a request interceptor to attach the JWT token (if available) to each request.
api.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from local storage.
    const token = localStorage.getItem("jwtToken");

    // If the token exists, add it to the Authorization header.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Pass the config to proceed with the request
  },
  (error) => {
    // Handle request errors before they are sent.
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default api;
