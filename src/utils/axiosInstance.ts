import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "SERVER_URL",
  withCredentials: true,
});

export default axiosInstance;
