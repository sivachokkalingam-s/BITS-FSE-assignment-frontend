import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  withCredentials: true // if you use cookies
});

// attach JWT header if stored in localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// global error handling
api.interceptors.response.use(
  r => r,
  error => {
    if (error.response && error.response.status === 401) {
      // simple redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
