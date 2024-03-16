import axios from "axios";
const baseURL = "https://tame-ruby-cocoon-hose.cyclic.app/api";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
