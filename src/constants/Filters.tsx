import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchingProduct, setSearchResults } from '../Redux/slices/AdsSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../Redux/store';
import { MenuItem, Select } from '@mui/material';

const Filters = ({ Ads }: any) => {
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    // const [isApproved, setIsApproved] = useState<string | null>('all');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handlePriceRangeClick = (range: string) => {
        setSelectedPriceRange(range);

        const [min, max] = range.split(' - ').map((value) => parseInt(value.replace(/,/g, '')));

        const filteredAds = Ads?.filter(
            (ad: any) => ad.product_data.productprice >= min && ad.product_data.productprice <= max
        );

        dispatch(setSearchResults(filteredAds));
    };

    const handleCustomPriceRange = () => {
        if (minPrice !== null && maxPrice !== null) {
            const filteredAds = Ads?.filter(
                (ad: any) =>
                    ad.product_data.productprice >= minPrice &&
                    ad.product_data.productprice <= maxPrice
            );

            dispatch(setSearchResults(filteredAds));
        }
    };

    // const handleApprovalFilter = (approvalStatus: string) => {
    //     setIsApproved(approvalStatus);

    //     const filteredAds = Ads?.filter(
    //         (ad: any) =>
    //             (approvalStatus === 'all' || ad.isApproved === (approvalStatus === 'approved')) &&
    //             (selectedPriceRange === null ||
    //                 (ad.product_data.productprice >=
    //                     parseInt(selectedPriceRange.split(' - ')[0].replace(/,/g, '')) &&
    //                     ad.product_data.productprice <=
    //                         parseInt(selectedPriceRange.split(' - ')[1].replace(/,/g, ''))))
    //     );

    //     dispatch(setSearchResults(filteredAds));
    // };

    const FilterAgain = (searchparam: any) => {
        dispatch(SearchingProduct(searchparam));
        navigate('/search/products');
    };

    const sortAds = (sortBy: string) => {
        let sortedAds = [...Ads];

        switch (sortBy) {
            case 'minPrice':
                sortedAds.sort((a, b) => a.product_data.productprice - b.product_data.productprice);
                break;
            case 'maxPrice':
                sortedAds.sort((a, b) => b.product_data.productprice - a.product_data.productprice);
                break;
            case 'brand':
                sortedAds.sort((a, b) => a.product_data.brand.localeCompare(b.product_data.brand));
                break;
            // Add more cases for sorting by other criteria if needed
            default:
                break;
        }

        dispatch(setSearchResults(sortedAds));
    };

    const categories = Array.from(new Set(Ads?.map((ad: any) => ad.product_data.category)));
    const brands = Array.from(
        new Set(Ads?.map((ad: any) => ad.product_data.brand.trim().toLowerCase()))
    );

    const calculatePriceRanges = () => {
        if (Ads?.length === 0) {
            return [];
        }
        if (Ads?.length === 1) {
            const price = Ads?.map((ad: any) => ad.product_data.productprice);
            return [price];
        }

        const prices = Ads?.map((ad: any) => ad.product_data.productprice);

        if (!prices || prices.length === 0) {
            return [];
        }
        const minPrice = Math.floor(Math.min(...prices) / 1000) * 1000;
        const maxPrice = Math.ceil(Math.max(...prices) / 1000) * 1000;

        const ranges = [];
        const numberOfRanges = 5; // You can adjust this based on your preference

        const rangeSize = (maxPrice - minPrice) / numberOfRanges;

        for (let i = 0; i < numberOfRanges; i++) {
            const rangeStart = minPrice + i * rangeSize;
            const rangeEnd = minPrice + (i + 1) * rangeSize;
            const rangeLabel = `${rangeStart.toLocaleString()} - ${rangeEnd.toLocaleString()}`;
            ranges.push(rangeLabel);
        }

        return ranges;
    };

    // Extract unique price ranges
    const priceRanges = calculatePriceRanges();

    return (
        <div>
            {Ads && Ads.length > 0 && (
                <div className="flex flex-col space-y-4 bg-gray-light mt-5 my-other-sidebar rounded h-[100%] sticky top-10 overflow-auto">
                    <div>
                        {/* Filter By Category */}
                        <div className="p-4">
                            <button
                                className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2"
                                onClick={() => sortAds('category')}
                            >
                                Category
                            </button>

                            <div className="scrollable-list">
                                <ul className="flex flex-wrap gap-2 text-[16px] text-gray-500">
                                    {categories.map((category: any, index) => (
                                        <li
                                            key={index}
                                            className="border rounded-[16px] p-2"
                                            onClick={() => {
                                                FilterAgain(category);
                                            }}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Filter by Budget */}
                        <div className="p-4">
                            <button className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2">
                                Price (Kshs)
                            </button>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1">
                                    <div className="flex gap-2 items-center ">
                                        <input
                                            type="number"
                                            id="minPrice"
                                            placeholder="min"
                                            value={minPrice || ''}
                                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="number"
                                            id="maxPrice"
                                            placeholder="max"
                                            value={maxPrice || ''}
                                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="px-3 py-1 text-primary-orange"
                                    onClick={() => handleCustomPriceRange()}
                                >
                                    Apply range
                                </button>

                                <Select value={1} style={{}} className="my-[5px]">
                                    <MenuItem value={1}>
                                        <p className="text-gray-700">Sort by price</p>
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        <p
                                            onClick={() => sortAds('minPrice')}
                                            className="text-gray-700"
                                        >
                                            Min price
                                        </p>
                                    </MenuItem>
                                    <MenuItem value={3}>
                                        <p
                                            onClick={() => sortAds('maxPrice')}
                                            className="text-gray-700"
                                        >
                                            Max price
                                        </p>
                                    </MenuItem>
                                </Select>
                            </div>
                            <div className="scrollable-list">
                                <ul className="text-[16px] text-gray-500 cursor-pointer  flex flex-col gap-2 px-2 justify-center">
                                    {priceRanges.map((priceRange, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handlePriceRangeClick(priceRange)}
                                            className={
                                                selectedPriceRange === priceRange ? 'selected' : ''
                                            }
                                        >
                                            {priceRange}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Filter by Approval Status */}
                        {/* <div className="p-4 text-gray-500 cursor-pointer">
                        <button className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2">
                            Verified by eDUKA
                        </button>
                        <p onClick={() => handleApprovalFilter('all')}>Show All</p>
                        <p onClick={() => handleApprovalFilter('approved')}>verified</p>
                        <p onClick={() => handleApprovalFilter('notApproved')}>Not verified</p>
                    </div> */}

                        {/* Filter by Brand */}
                        <div className="p-4">
                            <button
                                className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2"
                                onClick={() => sortAds('brand')}
                            >
                                Sort by Brand
                            </button>
                            <div className="text-[16px] text-gray-500 cursor-pointer  flex flex-col gap-2 px-2 justify-center">
                                <ul className="space-y-2">
                                    {brands.map((brand: any, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                FilterAgain(brand);
                                            }}
                                        >
                                            {brand}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;
