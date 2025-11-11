import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 8000
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || err.message || "Erro desconhecido";
    return Promise.reject(new Error(msg));
  }
);
