import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false, // for CORS

});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;