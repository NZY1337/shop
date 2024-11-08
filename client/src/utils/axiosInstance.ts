import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post("/auth/refresh-token");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(new Error(refreshError));
      }
    }

    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;
