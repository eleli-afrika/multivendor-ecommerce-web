import { axiosService } from "../helpers/axios";

export const fetchCategories = async () => {
  try {
    const response = await axiosService.get("/categories/getcategories");
    return response;
  } catch (error: any) {
    console.log(error, "someError");
    throw new Error(error.message);
  }
};
