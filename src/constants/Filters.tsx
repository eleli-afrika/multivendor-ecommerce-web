const Filters = ({ Ads }: any) => {
    // Extract unique categories
    const categories = Array.from(new Set(Ads.map((ad: any) => ad.product_data.category)));

    // Extract unique brands
    const brands = Array.from(new Set(Ads.map((ad: any) => ad.product_data.brand)));

    // Calculate price ranges dynamically
    const calculatePriceRanges = () => {
        if (Ads.length === 0) {
            // Return some default ranges or an empty array based on your requirements
            return [];
        }
        if (Ads.length === 1) {
            const price = Ads.map((ad: any) => ad.product_data.productprice);
            return [price];
        }

        const prices = Ads.map((ad: any) => ad.product_data.productprice);
        const minPrice = Math.floor(Math.min(...prices) / 1000) * 1000; // Round down to the nearest thousand
        const maxPrice = Math.ceil(Math.max(...prices) / 1000) * 1000; // Round up to the nearest thousand

        const ranges = [];
        const numberOfRanges = 10; // You can adjust this based on your preference

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
        <div className="flex flex-col space-y-4 bg-gray-light mt-5 my-other-sidebar rounded  h-[100%] sticky top-10">
            {/* Filter By Category */}
            <div className="p-4">
                <button className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2">
                    Categories
                </button>
                <div className="scrollable-list">
                    <ul className="flex flex-wrap gap-2 text-[16px] text-gray-500">
                        {categories.map((category: any, index) => (
                            <li key={index} className="border rounded-[16px] p-2">
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Filter by Budget */}
            <div className="p-4">
                <button className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2">
                    Price range
                </button>
                <div className="scrollable-list">
                    <ul className="space-y-2 text-[16px] text-gray-500">
                        {priceRanges.map((priceRange, index) => (
                            <li key={index}>{priceRange}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Filter by Brand */}
            <div className="p-4">
                <button className="px-3 py-1 bg-primary-orange text-white cursor-pointer rounded mb-2">
                    Brands
                </button>
                <div className="scrollable-list text-[16px] text-gray-500">
                    <ul className="space-y-2">
                        {brands.map((brand: any, index) => (
                            <li key={index}>{brand}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Filters;
