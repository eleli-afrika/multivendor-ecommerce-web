import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLanding } from '../Redux/slices/productsSlice';
import { AppDispatch, RootState } from '../Redux/store';

const LandingPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { landingData, isLoading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchLanding());
    }, [dispatch]);

    const promoted = (landingData?.promoted_products as unknown[]) || [];
    const highlighted = (landingData?.highlighted_products as unknown[]) || [];
    const random = (landingData?.random_products as unknown[]) || [];
    const categories = (landingData?.categories as unknown[]) || [];
    const promotedVendors = (landingData?.promoted_vendors as unknown[]) || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Hero / Promoted Products */}
            {promoted.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {promoted.slice(0, 8).map((product: unknown) => {
                            const p = product as Record<string, unknown>;
                            return <ProductCard key={p.id as string} product={p} />;
                        })}
                    </div>
                </section>
            )}

            {/* Categories Grid */}
            {categories.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {categories.map((cat: unknown) => {
                            const c = cat as Record<string, unknown>;
                            return (
                                <Link
                                    key={c.id as string}
                                    to={`/search/products?category_id=${c.id}`}
                                    className="flex flex-col items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
                                >
                                    <span className="font-medium text-sm capitalize">{c.name as string}</span>
                                    <span className="text-xs text-gray-500 mt-1">{String(c.product_count || 0)} items</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Highlighted Products */}
            {highlighted.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Highlighted Deals</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {highlighted.slice(0, 8).map((product: unknown) => {
                            const p = product as Record<string, unknown>;
                            return <ProductCard key={p.id as string} product={p} />;
                        })}
                    </div>
                </section>
            )}

            {/* Main layout with sidebar */}
            <div className="flex gap-6">
                {/* Promoted Vendors Sidebar */}
                {promotedVendors.length > 0 && (
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <h3 className="font-bold text-lg mb-3">Top Shops</h3>
                        <div className="space-y-3">
                            {promotedVendors.map((vendor: unknown) => {
                                const v = vendor as Record<string, unknown>;
                                return (
                                    <Link
                                        key={v.id as string}
                                        to={`/seller/store/${v.id}`}
                                        className="block p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                                    >
                                        <p className="font-medium text-sm">{v.shop_name as string}</p>
                                        <p className="text-xs text-gray-500 mt-1 truncate">{v.shop_description as string}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </aside>
                )}

                {/* Random Products Grid */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Discover Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {random.map((product: unknown) => {
                            const p = product as Record<string, unknown>;
                            return <ProductCard key={p.id as string} product={p} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductCard: React.FC<{ product: Record<string, unknown> }> = ({ product }) => {
    const discountedPrice = (product.price as number) * (1 - ((product.discount as number) || 0) / 100);
    const images = (product.images as unknown[]) || [];
    const mainImage = images.length > 0 ? ((images[0] as Record<string, unknown>).image_url as string) : (product.main_image_url as string);

    return (
        <Link to={`/ad_info/${product.id}`} className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
            <div className="aspect-square bg-gray-100 overflow-hidden">
                {mainImage ? (
                    <img src={mainImage} alt={product.name as string} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
            </div>
            <div className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name as string}</h3>
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-sm">KES {discountedPrice.toFixed(0)}</span>
                    {(product.discount as number) > 0 && (
                        <span className="text-gray-400 line-through text-xs">KES {(product.price as number).toFixed(0)}</span>
                    )}
                </div>
                {(product.is_promoted as boolean) && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Promoted</span>
                )}
                {(product.is_highlighted as boolean) && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded ml-1">Featured</span>
                )}
            </div>
        </Link>
    );
};

export default LandingPage;
