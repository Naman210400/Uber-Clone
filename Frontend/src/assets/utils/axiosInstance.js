import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const userToken = localStorage.getItem("UC_USER_TOKEN");

const apiInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: userToken ?? null,
    timeout: 1000,
    "Content-Type": "application/json",
  },
});

export default apiInstance;
