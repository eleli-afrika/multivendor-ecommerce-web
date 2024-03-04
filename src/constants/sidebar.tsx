import { useDispatch, useSelector } from 'react-redux';
// import { Categories } from "../data/categories";
import { setLoader } from '../Redux/slices/LoaderSlice';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../Redux/hooks/categories.actions';
import { setCategories } from '../Redux/slices/categoriesSlice';
import { categoryData, subcategoryData } from '../interface/common';
// import { axiosService } from '../Redux/helpers/axios';
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
    // const sellers = useSelector((state: any) => state.auth.sellers);
    // console.log(sellers);

    const { open } = useSelector((state: any) => state.opener);

    const handleCategoryMouseOver = async (categoryName: string) => {
        if (categoryName === hoveredCategory || loading) return;
        setLoading(true);
        setHoveredCategory(categoryName);
        const hoveredCategoryData = categories?.find(
            (category: any) => category.categoryname === categoryName
        );
        if (hoveredCategoryData) {
            setSubcategories(hoveredCategoryData.subCategories);
        }
        setLoading(false);
    };

    const getCategory = async () => {
        // dispatch(setLoader(true));
        setLoading(true);
        const response = await fetchCategories();
        dispatch(setCategories(response.data.Data));
        setLoading(false);
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

    return (
        <div
            className="rounded flex relative"
            onMouseLeave={() => {
                setHoveredCategory(''), setSubmenuOpen(false);
            }}
        >
            <div
                className="px-4  h-[55vh] max-h-[55vh]  sticky top-0 bg-gray-light shadow-custom rounded overflow-y-auto my-sidebar  py-2"
                // onMouseLeave={() =>}
            >
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-orange transition-all duration-300"></div>
                    </div>
                ) : (
                    <ul className="py-1">
                        {/* <h1 className="my-3 text-stone-600 text-sm font-bold"> Categories</h1> */}
                        {categories?.map((Menu: categoryData, index: number) => (
                            <div>
                                <li
                                    key={Menu.categoryname}
                                    className={`flex  rounded-md cursor-pointer hover:bg-white  text-sm items-center gap-x-4 px-2 py-2
                              ${hoveredCategory === Menu.categoryname ? 'bg-white' : ''} ${
                                        index === 0 && 'bg-light-white'
                                    } `}
                                    onMouseOver={() => {
                                        handleCategoryMouseOver(Menu.categoryname);
                                        setSubmenuOpen(true);
                                    }}
                                    onClick={() => {
                                        handleSearch(Menu.categoryname);
                                    }}
                                >
                                    {/* <img src={Menu?.categoryimage} className="h-3 w-3 object-cover  " /> */}
                                    <span
                                        className={`${
                                            !open && ''
                                        } origin-left duration-200 text-xs flex-1 text-gray-600`}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p> {Menu?.categoryname}</p>
                                            <p> {Menu?.totalproducts} ads</p>
                                        </div>
                                    </span>

                                    <ChevronRightTwoTone className="ml-auto text-black-main" />
                                </li>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                {submenuOpen && (
                    <div
                        className=" absolute bg-gray-light  z-10 h-[55vh] w-[18vw] border-l-2 border-primary-orange px-5 shadow-custom overflow-y-auto text-sm pt-5"
                        style={{
                            left: '18vw',
                        }}
                        onMouseLeave={() => setSubmenuOpen(false)}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-orange transition-all duration-300"></div>
                            </div>
                        ) : (
                            <ul>
                                {subcategories?.map(
                                    (subcategory: subcategoryData, index: number) => (
                                        <li
                                            key={index}
                                            className={`cursor-pointer text-sm gap-x-4 px-3 py-1 hover:bg-white text-stone-500 
                  ${''} ${index === 0 && 'bg-light-white'} `}
                                            onClick={() => {
                                                handleSearch(subcategory?.subcategoryname);
                                            }}
                                        >
                                            <div className="flex flex-col">
                                                <p> {subcategory?.subcategoryname}</p>
                                                <p> {subcategory?.totalproducts} ads</p>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
