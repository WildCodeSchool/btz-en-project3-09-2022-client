/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/dot-notation */
import axios from "axios";

export type AxiosRequestHeaders = Record<string, string>;

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "SERVER_URL",
    withCredentials: true,
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    config.headers = {};
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = token ? `${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
