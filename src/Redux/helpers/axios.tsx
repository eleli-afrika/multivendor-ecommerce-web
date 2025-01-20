import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://ecommerce.eleliafrika.cloud",
  // baseURL: 'http://localhost:8000',
  // baseURL: 'https://137.184.189.199:8000',
});

axiosService.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    req.headers["x-access-token"] = token;
  }
  return req;
});
