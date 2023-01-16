import axios from "axios";

const token = typeof window !== "undefined" && localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "SERVER_URL",
  withCredentials: true,
  headers: {
    Authorization: token,
  },
});

export default axiosInstance;
