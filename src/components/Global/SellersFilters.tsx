import { useState } from 'react';
import { useDispatch } from 'react-redux';


import { MenuItem, Select } from '@mui/material';
import { setSearchResults } from '../../Redux/slices/AdsSlice';
import { AppDispatch } from '../../Redux/store';

const Filters = ({ Ads }: any) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const FilterAgain = () => {
        let filteredAds = [...Ads];

        if (selectedCategory) {
            filteredAds = filteredAds.filter(
                (ad: any) => ad.product_data?.category === selectedCategory
            );
        }

        if (selectedBrand) {
            filteredAds = filteredAds.filter(
                (ad: any) => ad.product_data?.brand.trim().toLowerCase() === selectedBrand
            );
        }

        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange
                .split(' - ')
                .map((value) => parseInt(value.replace(/,/g, '')));
            filteredAds = filteredAds.filter(
                (ad: any) =>
                    ad.product_data?.productprice >= min && ad.product_data?.productprice <= max
            );
        }

        dispatch(setSearchResults(filteredAds));
    };

 

    const handleCustomPriceRange = () => {
        if (minPrice !== null && maxPrice !== null) {
            const filteredAds = Ads?.filter(
                (ad: any) =>
                    ad.product_data?.productprice >= minPrice &&
                    ad.product_data?.productprice <= maxPrice
            );

            dispatch(setSearchResults(filteredAds));
        }
    };

    const sortAds = (sortBy: string) => {
        let sortedAds = [...Ads];

        switch (sortBy) {
            case 'category':
                sortedAds.sort((a, b) =>
                    a.product_data.category.localeCompare(b.product_data.category)
                );
                break;
            case 'brand':
                sortedAds.sort((a, b) => a.product_data.brand.localeCompare(b.product_data.brand));
                break;
            case 'price':
                sortedAds.sort((a, b) => a.product_data.productprice - b.product_data.productprice);
                break;
            // Add more cases for sorting by other criteria if needed
            default:
                break;
        }

        dispatch(setSearchResults(sortedAds));
    };

    const categories = Array.from(new Set(Ads?.map((ad: any) => ad.product_data?.category)));
    const brands = Array.from(
        new Set(Ads?.map((ad: any) => ad.product_data?.brand.trim().toLowerCase()))
    );

    const calculatePriceRanges = () => {
        if (!Ads || Ads.length === 0) {
            return [];
        }

        const prices = Ads.map((ad: any) => ad.product_data?.productprice);

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
                <div className="flex flex-col bg-gray-light  my-other-sidebar rounded  mb-3  w-[18vw] ">
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
                                    {categories?.map((category: any, index) => (
                                        <li
                                            key={index}
                                            className={`border rounded-[16px] p-2 ${
                                                selectedCategory === category ? 'selected' : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setSelectedBrand(null);
                                                setSelectedPriceRange(null);
                                                FilterAgain();
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
                                            onClick={() => sortAds('price')}
                                            className="text-gray-700"
                                        >
                                            Min price
                                        </p>
                                    </MenuItem>
                                    <MenuItem value={3}>
                                        <p
                                            onClick={() => sortAds('price')}
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
                                            onClick={() => {
                                                setSelectedPriceRange(priceRange);
                                                setSelectedCategory(null);
                                                setSelectedBrand(null);
                                                FilterAgain();
                                            }}
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
                                                setSelectedBrand(brand);
                                                setSelectedCategory(null);
                                                setSelectedPriceRange(null);
                                                FilterAgain();
                                            }}
                                            className={selectedBrand === brand ? 'selected' : ''}
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
