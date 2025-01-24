import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://ecommerce.eleliafrika.cloud",
  
});

axiosService.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    req.headers["x-access-token"] = token;
  }
  return req;
});
