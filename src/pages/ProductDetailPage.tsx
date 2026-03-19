import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../Redux/slices/productsSlice';
import { AppDispatch, RootState } from '../Redux/store';
import { wishlistAPI, reviewsAPI } from '../api/api';
import { toast } from 'react-toastify';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProduct, isLoading } = useSelector((state: RootState) => state.products);
    const { userToken } = useSelector((state: RootState) => (state.auth as unknown as Record<string, unknown>)) as { userToken: string | null };
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        if (id) dispatch(fetchSingleProduct(id));
    }, [id, dispatch]);

    if (isLoading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    if (!currentProduct) return <div className="text-center py-20 text-gray-500">Product not found</div>;

    const product = currentProduct.product as Record<string, unknown>;
    const avgRating = currentProduct.avg_rating as number;
    const relatedProducts = (currentProduct.related_products as unknown[]) || [];

    if (!product) return null;

    const images = (product.images as unknown[]) || [];
    const mainImg = selectedImage || product.main_image_url as string;
    const vendor = product.vendor as Record<string, unknown> | null;
    const discountedPrice = (product.price as number) * (1 - ((product.discount as number) || 0) / 100);

    const handleAddToWishlist = async () => {
        if (!userToken) {
            toast.error('Please login to add to wishlist');
            return;
        }
        try {
            await wishlistAPI.addProduct(id!);
            toast.success('Added to wishlist!');
        } catch {
            toast.error('Failed to add to wishlist');
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userToken) {
            toast.error('Please login to submit a review');
            return;
        }
        try {
            await reviewsAPI.create({
                vendor_id: product.vendor_id as string,
                product_id: id,
                rating: reviewData.rating,
                comment: reviewData.comment,
            });
            toast.success('Review submitted!');
            setShowReviewForm(false);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error?.response?.data?.message || 'Failed to submit review');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Image Gallery */}
                <div>
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                        {mainImg ? (
                            <img src={mainImg} alt={product.name as string} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {(product.main_image_url as string) && (
                            <button
                                onClick={() => setSelectedImage(product.main_image_url as string)}
                                className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500"
                            >
                                <img src={product.main_image_url as string} alt="main" className="w-full h-full object-cover" />
                            </button>
                        )}
                        {images.map((img: unknown, idx: number) => {
                            const i = img as Record<string, unknown>;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(i.image_url as string)}
                                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500"
                                >
                                    <img src={i.image_url as string} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name as string}</h1>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s}>{s <= Math.round(avgRating) ? '★' : '☆'}</span>
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({avgRating.toFixed(1)})</span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-bold text-blue-600">KES {discountedPrice.toFixed(0)}</span>
                        {(product.discount as number) > 0 && (
                            <>
                                <span className="text-gray-400 line-through">KES {(product.price as number).toFixed(0)}</span>
                                <span className="text-green-500 text-sm font-medium">{product.discount as number}% off</span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-600 mb-4">{product.description as string}</p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <span>Stock: {String(product.quantity)} available</span>
                        <span>•</span>
                        <span>{String(product.views_count)} views</span>
                        <span>•</span>
                        <span>{String(product.purchases_count)} purchases</span>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <Link
                            to={`/checkout?product_id=${id}&vendor_id=${product.vendor_id}`}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 text-center"
                        >
                            Buy Now
                        </Link>
                        <button
                            onClick={handleAddToWishlist}
                            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            ♡ Wishlist
                        </button>
                    </div>

                    {/* Vendor Card */}
                    {vendor && (
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Sold by</h3>
                            <Link to={`/seller/store/${vendor.id}`} className="text-blue-600 hover:underline font-medium">
                                {vendor.shop_name as string}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{vendor.shop_description as string}</p>
                            <button
                                onClick={async () => {
                                    if (!userToken) { toast.error('Login to bookmark'); return; }
                                    await wishlistAPI.addVendor(vendor.id as string);
                                    toast.success('Shop bookmarked!');
                                }}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                ♥ Bookmark Shop
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Reviews</h2>
                    {userToken && (
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Write Review
                        </button>
                    )}
                </div>

                {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Rating</label>
                            <select
                                value={reviewData.rating}
                                onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}
                                className="border rounded px-3 py-2"
                            >
                                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Comment</label>
                            <textarea
                                value={reviewData.comment}
                                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                rows={3}
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                            Submit Review
                        </button>
                    </form>
                )}
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map((p: unknown) => {
                            const prod = p as Record<string, unknown>;
                            const relImages = (prod.images as unknown[]) || [];
                            const relMainImg = relImages.length > 0 ? ((relImages[0] as Record<string, unknown>).image_url as string) : (prod.main_image_url as string);
                            const relPrice = (prod.price as number) * (1 - ((prod.discount as number) || 0) / 100);
                            return (
                                <Link key={prod.id as string} to={`/ad_info/${prod.id}`} className="block bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
                                    <div className="aspect-square bg-gray-100">
                                        {relMainImg && <img src={relMainImg} alt={prod.name as string} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium truncate">{prod.name as string}</p>
                                        <p className="text-blue-600 font-bold text-sm mt-1">KES {relPrice.toFixed(0)}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetailPage;
