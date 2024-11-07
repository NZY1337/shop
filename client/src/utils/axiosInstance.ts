import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api", // Your backend API base URL
  withCredentials: true, // Include credentials (cookies) in requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(document.cookie);
    // You can add custom headers or modify the request config here
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data here
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // For example, redirect to login page if unauthorized
      //   window.location.href = "/login";
    }
    console.log(error);
    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;
