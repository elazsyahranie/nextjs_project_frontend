import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: "http://localhost:3003/api/v1/",
});

export default axiosApiIntances;
