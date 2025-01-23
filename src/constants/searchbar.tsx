import React, { useState, useEffect } from 'react';
import { axiosService } from '../Redux/helpers/axios';
import { fetchCategories } from '../Redux/hooks/categories.actions';
import { useDispatch } from 'react-redux';
import { SearchingProduct } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [category, setCategory] = useState<string>('all');
    const [, setSubcategory] = useState<string>('all');
    const [, setCategories] = useState<any[]>([]);
    const [, setSubcategories] = useState<any[]>([]);
    const [, setIsLoading] = useState<boolean>(false);

    const [searchParam, setSearchParam] = useState<string>('');


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === 'all') {
            // Handle the case when "all" is selected, clear subcategories.
            setSubcategory('all');
            setSubcategories([]);
        } else {
            // Fetch subcategories based on the selected category
            setIsLoading(true);
            axiosService
                .get(`/subcategories/getsubcategories/${selectedCategory}`)
                .then((response) => {
                    const subcategories = response.data.Data;
                    setSubcategories(subcategories);
                    setSubcategory('all');
                })
                .catch((error) => {
                    console.error('Error fetching subcategories:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        // Fetch categories when the component mounts
        setIsLoading(true);
        fetchCategories()
            .then((response) => {
                setCategories(response.data.Data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSearch = () => {
        console.log('Search button clicked');
        dispatch(SearchingProduct(searchParam));
        navigate('/search/products');
        setSearchParam('');
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevents the form from submitting and triggering a full-page reload
                    handleSearch();
                }}
                className=" hidden  md:flex items-center w-screen  px-40 bg-[white] mb-7"
            >
                <div className="flex w-full border-2 border-secondary-orange rounded-[20px] justify-between px-0">
                    <select
                        id="categorySelect"
                        value={category}
                        onChange={handleCategoryChange}
                        className="px-5  border-r-2 border-secondary-orange  w-[200px]  bg-white outline-none rounded-l-[20px] py:5 text-sm text-stone-400"
                    >
                        <option value="all">Search for products</option>
                       
                    </select>

                    <div className="relative w-[70%]  ">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className=" h-[45px] py-3 text-sm  "
                            value={searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary-orange capitalize text-white  hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none rounded-r-[15px] text-[20px] h-[50px]"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* for smaller devices */}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
                className="search flex items-center justify-center my-2 px-1"
            >
                <div className="flex w-full max-w-screen-md border-2 border-secondary-orange rounded-[20px]">
                    <select
                        id="categorySelect"
                        value={category}
                        onChange={handleCategoryChange}
                        className="p-3 border border-r-0 rounded-l-[20px] bg-white outline-none w-[10%]"
                    >
                        
                    </select>

                    <div className="relative flex-1 border py-1">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="h-full w-full px-2 py-1"
                            value={searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary-orange text-white  hover:bg-secondary-orange transition-colors delay-300 outline-none shadow-custom rounded-r-[15px] p-3"
                    >
                        Search
                    </button>
                </div>
            </form>
        </>
    );
};

export default SearchBar;
