import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sellerAPI } from '../api/api';
import { wishlistAPI } from '../api/api';
import { toast } from 'react-toastify';
import { RootState } from '../Redux/store';

const VendorStorePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [storeData, setStoreData] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const { userToken } = useSelector((state: RootState) => (state.auth as unknown as Record<string, unknown>)) as { userToken: string | null };

    useEffect(() => {
        if (id) {
            setLoading(true);
            sellerAPI.getStore(id)
                .then((res) => setStoreData(res.data.data))
                .catch(() => toast.error('Failed to load store'))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (!storeData) return <div className="text-center py-20">Store not found</div>;

    const vendor = storeData.vendor as Record<string, unknown>;
    const products = (storeData.products as unknown[]) || [];
    const avgRating = storeData.avg_rating as number;

    const handleBookmark = async () => {
        if (!userToken) { toast.error('Please login'); return; }
        await wishlistAPI.addVendor(id!);
        toast.success('Shop bookmarked!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Vendor Header */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{vendor.shop_name as string}</h1>
                        <p className="text-gray-600 mt-1">{vendor.shop_description as string}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s}>{s <= Math.round(avgRating || 0) ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({(avgRating || 0).toFixed(1)} rating)</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBookmark}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        ♥ Bookmark Shop
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <h2 className="text-xl font-bold mb-4">Products ({products.length})</h2>
            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No products available</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product: unknown) => {
                        const p = product as Record<string, unknown>;
                        const imgs = (p.images as unknown[]) || [];
                        const imgUrl = imgs.length > 0 ? ((imgs[0] as Record<string, unknown>).image_url as string) : (p.main_image_url as string);
                        const price = (p.price as number) * (1 - ((p.discount as number) || 0) / 100);
                        return (
                            <Link
                                key={p.id as string}
                                to={`/ad_info/${p.id}`}
                                className="block bg-white rounded-lg shadow hover:shadow-md overflow-hidden"
                            >
                                <div className="aspect-square bg-gray-100">
                                    {imgUrl && <img src={imgUrl} alt={p.name as string} className="w-full h-full object-cover" />}
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-medium truncate">{p.name as string}</p>
                                    <p className="text-blue-600 font-bold text-sm mt-1">KES {price.toFixed(0)}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VendorStorePage;
