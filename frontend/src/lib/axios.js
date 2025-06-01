import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8005/api/v1"
      : "https://api.dsasnippets.xyz/api/v1",
  withCredentials: true,
});
