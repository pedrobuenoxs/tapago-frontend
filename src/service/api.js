import axios from "axios";
import { parseCookies } from "nookies";

const { "token-tapago": token } = parseCookies();

export const api = axios.create({
  baseURL: "https://tapago-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api_up = axios.create({
  baseURL: "https://tapago-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
