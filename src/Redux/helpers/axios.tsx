import axios from "axios";

export const axiosService = axios.create({
  baseURL: import.meta.env.API_URL
});

axiosService.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    req.headers["x-access-token"] = token;
  }
  return req;
});
