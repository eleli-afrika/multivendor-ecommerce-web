import { useDispatch, useSelector } from "react-redux";
// import { Categories } from "../data/categories";
import { setLoader } from "../Redux/slices/LoaderSlice";
import { useEffect, useState } from "react";
import { fetchCategories } from "../Redux/hooks/categories.actions";
import { setCategories } from "../Redux/slices/categoriesSlice";
import { categoryData, subcategoryData } from "../interface/common";
import { axiosService } from "../Redux/helpers/axios";
import { ChevronRightTwoTone } from "@mui/icons-material";
import { TopProducts } from "../data/topproducts";

const Sidebar = () => {
  const dispatch = useDispatch();
  // const [myCategories, setMyCategories] = useState([]);
  const categories = useSelector((state: any) => state.categories.categories);

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<subcategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const { open} = useSelector((state: any) => state.opener);

  // console.log("Hello", open);

  const tryfetchingSubcategories = async (categoryName: string) => {
    try {
      const response = await axiosService.get(
        `/subcategories/getsubcategories/${categoryName}`
      );
      return response.data.Data;
    } catch (error) {
      // console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  const handleCategoryMouseOver = async (categoryName: string) => {
    if (categoryName === hoveredCategory || loading) return;

    setLoading(true);
    setHoveredCategory(categoryName);

    const subcategoriesData = await tryfetchingSubcategories(categoryName);
    setSubcategories(subcategoriesData);

    setLoading(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    dispatch(setLoader(true));
    const response = await fetchCategories();
    dispatch(setCategories(response.data.Data));
    // console.log(response);
    dispatch(setLoader(false));
  };
  useEffect(() => {
    getCategory();
    // console.log(categories);
  }, []);

  return (
    <div className="rounded">
      <div className="px-4  h-[55vh] max-h-[55vh]  sticky top-0 bg-slate-200 shadow-custom rounded overflow-y-auto my-sidebar no-scrollbar ">
        <ul className="py-1">
          <h1 className="my-3 text-stone-600 text-sm font-bold">
            Top Categories
          </h1>
          {categories.map((Menu: categoryData, index: number) => (
            <div>
              <li
                key={index}
                className={`flex  rounded-md cursor-pointer hover:bg-white  text-sm items-center gap-x-4
              ${"mt-2"} ${index === 0 && "bg-light-white"} `}
                onMouseOver={() => {
                  handleCategoryMouseOver(Menu.categoryname);
                  setSubmenuOpen(false);
                }}
              >
                <img
                  src={Menu.categoryimage}
                  className="h-3 w-3 "
                  object-cover
                />
                <span
                  className={`${
                    !open && ""
                  } origin-left duration-200 text-xs flex-1 text-stone-500`}
                >
                  {Menu.categoryname}
                </span>

                {/* <ChevronRightTwoTone className="ml-auto" /> */}
              </li>
            </div>
          ))}
        </ul>
        <ul className="">
          <h1 className="mt-3 text-stone-600 text-sm font-bold">Top Sellers</h1>
          {categories.map((Menu: categoryData, index: number) => (
            <div>
              <li
                key={index}
                className={`flex  rounded-md cursor-pointer hover:bg-white  text-sm items-center gap-x-4
              ${"mt-2"} ${index === 0 && "bg-light-white"} `}
                onMouseOver={() => {
                  handleCategoryMouseOver(Menu.categoryname);
                  setSubmenuOpen(false);
                }}
              >
                <img
                  src={Menu.categoryimage}
                  className="h-3 w-3 "
                  object-cover
                />
                <span
                  className={`${
                    !open && ""
                  } origin-left duration-200 text-xs flex-1 text-stone-500`}
                >
                  <h1 className="font-bold">John Doe</h1>
                  <h3 className="text-xs">(273 products)</h3>
                </span>

                <ChevronRightTwoTone className="ml-auto" />
              </li>
            </div>
          ))}
        </ul>
        <ul className="flex flex-col py-2">
          <h1 className=" text-stone-600 text-sm font-bold">Top Products</h1>
          <div className="flex flex-row no-scrollbar overflow-x-scroll w-fit">
            {TopProducts.map((top_product) => (
              <div className="flex flex-col bg-slate-300 p-1 w-[50px]  rounded-[5px] mr-3">
                <img className=" " src={top_product.image} alt="" />
                <h5 className=" text-ellipsis line-clamp-1 text-stone-500 text-[10px]">
                  {top_product.name}
                </h5>
              </div>
            ))}
          </div>
        </ul>
      </div>
      {submenuOpen && (
        <div
          className="submenu"
          style={{
            left: "20vw",

            // position: "sticky",
          }}
          onMouseLeave={() => setSubmenuOpen(false)}
        >
          {loading ? (
            <div className="w-8 h-8 flex items-center justify-center animate-spin rounded-full border-t-2 border-primary-orange border-solid "></div>
          ) : (
            <ul>
              {subcategories.map(
                (subcategory: subcategoryData, index: number) => (
                  <li
                    key={index}
                    className={`flex  rounded-md p-2  cursor-pointer hover:bg-white  text-sm items-center gap-x-4 
                  ${"mt-2"} ${index === 0 && "bg-light-white"} `}
                  >
                    {subcategory.subcategoryname}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}

      {/* this is where the sidebar menu will sit when on smaller devices */}
    </div>
  );
};

export default Sidebar;
