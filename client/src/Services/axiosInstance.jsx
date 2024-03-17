import axios from "axios";
const baseURL = "https://powerful-seal-knickers.cyclic.app/api";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
