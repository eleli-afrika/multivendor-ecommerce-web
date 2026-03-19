import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productsAPI, categoriesAPI, brandsAPI, locationsAPI } from '../api/api';

interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    main_image_url: string;
    images: { image_url: string }[];
    is_active: boolean;
    vendor?: { is_deactivated_vendor_only?: boolean };
}

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
    const [brands, setBrands] = useState<Record<string, unknown>[]>([]);
    const [locations, setLocations] = useState<Record<string, unknown>[]>([]);
    const [page, setPage] = useState(1);
    const limit = 20;

    const filters = {
        keyword: searchParams.get('keyword') || '',
        category_id: searchParams.get('category_id') || '',
        subcategory_id: searchParams.get('subcategory_id') || '',
        brand_id: searchParams.get('brand_id') || '',
        location_id: searchParams.get('location_id') || '',
        min_price: searchParams.get('min_price') || '',
        max_price: searchParams.get('max_price') || '',
        sort: searchParams.get('sort') || 'newest',
    };

    useEffect(() => {
        categoriesAPI.getAll().then(res => setCategories(res.data.data || []));
        brandsAPI.getAll().then(res => setBrands(res.data.data || []));
        locationsAPI.getAll().then(res => setLocations(res.data.data || []));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [searchParams, page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: Record<string, string | number> = { page, limit };
            Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
            const res = await productsAPI.filter(params);
            setProducts((res.data.data as Product[]) || []);
            setTotal(res.data.total || 0);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const updateFilter = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
        setPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6">
                {/* Filters Sidebar */}
                <aside className="w-64 flex-shrink-0 hidden md:block">
                    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
                        <h3 className="font-bold text-lg mb-4">Filters</h3>

                        {/* Keyword */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Search</label>
                            <input
                                type="text"
                                value={filters.keyword}
                                onChange={(e) => updateFilter('keyword', e.target.value)}
                                placeholder="Keywords..."
                                className="w-full border rounded px-3 py-2 text-sm"
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                value={filters.category_id}
                                onChange={(e) => updateFilter('category_id', e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((c: Record<string, unknown>) => (
                                    <option key={c.id as string || c.categoryid as string} value={c.id as string || c.categoryid as string}>
                                        {c.name as string || c.category_name as string}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Brand</label>
                            <select
                                value={filters.brand_id}
                                onChange={(e) => updateFilter('brand_id', e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                            >
                                <option value="">All Brands</option>
                                {brands.map((b: Record<string, unknown>) => (
                                    <option key={b.id as string || b.brandid as string} value={b.id as string || b.brandid as string}>
                                        {b.name as string || b.brandname as string}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <select
                                value={filters.location_id}
                                onChange={(e) => updateFilter('location_id', e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                            >
                                <option value="">All Locations</option>
                                {locations.map((l: Record<string, unknown>) => (
                                    <option key={l.id as string} value={l.id as string}>{l.region_name as string}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Price Range (KES)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={filters.min_price}
                                    onChange={(e) => updateFilter('min_price', e.target.value)}
                                    placeholder="Min"
                                    className="w-1/2 border rounded px-2 py-1 text-sm"
                                />
                                <input
                                    type="number"
                                    value={filters.max_price}
                                    onChange={(e) => updateFilter('max_price', e.target.value)}
                                    placeholder="Max"
                                    className="w-1/2 border rounded px-2 py-1 text-sm"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Sort By</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => updateFilter('sort', e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm"
                            >
                                <option value="newest">Newest</option>
                                <option value="most_viewed">Most Viewed</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>

                        <button
                            onClick={() => setSearchParams(new URLSearchParams())}
                            className="w-full text-sm text-gray-500 hover:text-gray-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                </aside>

                {/* Results */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-600 text-sm">{total} products found</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No products found</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((product) => {
                                    const isUnavailable = !product.is_active || product.vendor?.is_deactivated_vendor_only;
                                    const price = product.price * (1 - (product.discount || 0) / 100);
                                    const imgUrl = product.images?.length > 0 ? product.images[0].image_url : product.main_image_url;
                                    return (
                                        <Link
                                            key={product.id}
                                            to={`/ad_info/${product.id}`}
                                            className={`block bg-white rounded-lg shadow hover:shadow-md overflow-hidden ${isUnavailable ? 'opacity-60' : ''}`}
                                        >
                                            <div className="aspect-square bg-gray-100 relative">
                                                {imgUrl && <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />}
                                                {isUnavailable && (
                                                    <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium bg-red-500 px-2 py-1 rounded">Unavailable</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-medium truncate">{product.name}</p>
                                                <p className="text-blue-600 font-bold text-sm mt-1">KES {price.toFixed(0)}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 gap-2">
                                {page > 1 && (
                                    <button onClick={() => setPage(page - 1)} className="px-4 py-2 border rounded hover:bg-gray-50">
                                        Previous
                                    </button>
                                )}
                                <span className="px-4 py-2 text-sm text-gray-600">Page {page}</span>
                                {products.length === limit && (
                                    <button onClick={() => setPage(page + 1)} className="px-4 py-2 border rounded hover:bg-gray-50">
                                        Next
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
