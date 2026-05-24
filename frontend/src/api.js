import axios from "axios";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "[::1]"
);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isLocalhost ? "http://localhost:5001/api/v1" : "/api/v1"),
});

export default API;
