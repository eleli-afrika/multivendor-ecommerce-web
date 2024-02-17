import { useDispatch, useSelector } from 'react-redux';
// import { Categories } from "../data/categories";
import { setLoader } from '../Redux/slices/LoaderSlice';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../Redux/hooks/categories.actions';
import { setCategories } from '../Redux/slices/categoriesSlice';
import { categoryData, subcategoryData } from '../interface/common';
import { axiosService } from '../Redux/helpers/axios';
import { ChevronRightTwoTone } from '@mui/icons-material';
import { SearchingProduct } from '../Redux/slices/AdsSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../Redux/store';
import { GettingSellers } from '../Redux/slices/AuthSlice';
// import UserSidebar from '../components/Dashboard/Sidebar';
// import { TopProducts } from '../data/topproducts';

const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const [myCategories, setMyCategories] = useState([]);
    const categories = useSelector((state: any) => state.categories.categories);

    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<subcategoryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const navigate = useNavigate();
    const sellers = useSelector((state: any) => state.auth.sellers);
    // console.log(sellers);

    const { open } = useSelector((state: any) => state.opener);

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
        setLoading(false);
        const subcategoriesData = await tryfetchingSubcategories(categoryName);
        setSubcategories(subcategoriesData);
    };

    const getCategory = async () => {
        dispatch(setLoader(true));
        const response = await fetchCategories();
        dispatch(setCategories(response.data.Data));
        // console.log(response);
        dispatch(setLoader(false));
    };
    useEffect(() => {
        getCategory();
    }, []);

    const handleSearch = (categoryname: string) => {
        handleCategoryMouseOver(categoryname);
        dispatch(SearchingProduct(categoryname));
        navigate('/search/products');
        setHoveredCategory('');
    };

    useEffect(() => {
        dispatch(GettingSellers());
    }, []);

    console.log(subcategories);

    return (
        <div className="rounded" onMouseLeave={() => setSubmenuOpen(false)}>
            <div
                className="px-4  h-[55vh] max-h-[55vh]  sticky top-0 bg-gray-light shadow-custom rounded overflow-y-auto my-sidebar no-scrollbar "
                // onMouseLeave={() => setSubmenuOpen(false)}
            >
                <ul className="py-1">
                    <h1 className="my-3 text-stone-600 text-sm font-bold"> Categories</h1>
                    {categories?.map((Menu: categoryData, index: number) => (
                        <div>
                            <li
                                key={Menu.categoryname}
                                className={`flex  rounded-md cursor-pointer hover:bg-white  text-sm items-center gap-x-4 capitalize
              ${'mt-2'} ${index === 0 && 'bg-light-white'} `}
                                onMouseOver={() => {
                                    handleCategoryMouseOver(Menu.categoryname);
                                    setSubmenuOpen(true);
                                }}
                                // onMouseLeave={() => setSubmenuOpen(false)}
                                onClick={() => {
                                    handleSearch(Menu.categoryname);
                                }}
                            >
                                <img src={Menu?.categoryimage} className="h-3 w-3 object-cover  " />
                                <span
                                    className={`${
                                        !open && ''
                                    } origin-left duration-200 text-xs flex-1 text-stone-500`}
                                >
                                    {Menu?.categoryname}
                                </span>

                                {/* <ChevronRightTwoTone className="ml-auto" /> */}
                            </li>
                        </div>
                    ))}
                </ul>
                <ul className="hidden">
                    <h1 className="mt-3 text-stone-600 text-sm font-bold">Top Sellers</h1>
                    {sellers?.map((seller: any, index: number) => (
                        <div>
                            <li
                                key={seller?.ID}
                                className={`flex  rounded-md cursor-pointer hover:bg-white  text-[10px] items-center gap-x-4 capitalize text-gray-700
              ${'mt-2'} ${index === 0 && 'bg-light-white'} `}
                                onMouseOver={() => {
                                    // handleCategoryMouseOver(Menu.categoryname);
                                    setSubmenuOpen(false);
                                }}
                            >
                                {/* <img src={Menu.categoryimage} className="h-3 w-3 object-cover " /> */}
                                <span
                                    className={`${
                                        !open && ''
                                    } origin-left duration-200 text-xs flex-1 text-stone-500`}
                                >
                                    <h1 className="font-bold">{`${seller?.firstname} ${seller?.lastname}`}</h1>
                                    <h3 className="text-xs">{seller?.noofproducts} products</h3>
                                </span>

                                <ChevronRightTwoTone className="ml-auto" />
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            {submenuOpen && (
                <div
                    className="submenu bg-gray-light"
                    style={{
                        left: '18.4vw',
                    }}
                    onMouseLeave={() => setSubmenuOpen(false)}
                >
                    {loading ? (
                        <div className="w-8 h-8 flex items-center justify-center animate-spin rounded-full border-t-2 border-primary-orange border-solid "></div>
                    ) : (
                        <ul>
                            {subcategories.map((subcategory: subcategoryData, index: number) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer text-sm text-gray-500 
                  ${'mt-2'} ${index === 0 && 'bg-light-white'} `}
                                >
                                    {subcategory.subcategoryname}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* this is where the sidebar menu will sit when on smaller devices */}
        </div>
    );
};

export default Sidebar;
