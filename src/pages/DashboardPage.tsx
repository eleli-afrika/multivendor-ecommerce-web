import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchVendorProfile, fetchVendorProducts, fetchVendorOrders, fetchVendorSubscription } from '../Redux/slices/vendorSlice';
import { fetchUserOrders } from '../Redux/slices/ordersSlice';
import { fetchNotifications } from '../Redux/slices/notificationsSlice';
import { userAPI, vendorAPI, notificationsAPI } from '../api/api';
import { toast } from 'react-toastify';

type TabType = 'profile' | 'settings' | 'purchases' | 'bookmarks' | 'favoriteShops' | 'notifications' | 'shop' | 'vendorApply';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);

    const { orders } = useSelector((state: RootState) => state.orders);
    const { notifications } = useSelector((state: RootState) => state.notifications);
    const { products: vendorProducts, orders: vendorOrders, subscription } = useSelector((state: RootState) => state.vendor);

    const authState = useSelector((state: RootState) => state.auth as unknown as Record<string, unknown>);
    const userToken = authState.userToken as string | null;

    useEffect(() => {
        if (userToken) {
            userAPI.getProfile().then(res => {
                setProfile(res.data.data);
                setLoading(false);
            }).catch(() => setLoading(false));
            dispatch(fetchUserOrders());
            dispatch(fetchNotifications());
        }
    }, [dispatch, userToken]);

    useEffect(() => {
        // Parse token to check is_vendor
        if (userToken) {
            try {
                const payload = JSON.parse(atob(userToken.split('.')[1]));
                if (payload.is_vendor) {
                    dispatch(fetchVendorProfile());
                    dispatch(fetchVendorProducts());
                    dispatch(fetchVendorOrders());
                    dispatch(fetchVendorSubscription());
                }
            } catch { /* silent */ }
        }
    }, [userToken, dispatch]);

    const isVendor = userToken ? (() => {
        try {
            return JSON.parse(atob(userToken.split('.')[1])).is_vendor;
        } catch { return false; }
    })() : false;

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    // Check if user is deactivated
    if (profile?.is_deactivated) {
        return (
            <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
                <div className="text-center text-white p-8">
                    <h1 className="text-3xl font-bold mb-4">Account Deactivated</h1>
                    <p className="text-gray-300">Your account has been deactivated. Please contact support.</p>
                    <a href="mailto:support@marketplace.com" className="mt-4 inline-block text-blue-400 underline">support@marketplace.com</a>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' },
        { id: 'purchases', label: 'Purchases' },
        { id: 'bookmarks', label: 'Bookmarks' },
        { id: 'favoriteShops', label: 'Favorite Shops' },
        { id: 'notifications', label: `Notifications ${(notifications as unknown[]).length > 0 ? `(${(notifications as unknown[]).length})` : ''}` },
        ...(isVendor ? [{ id: 'shop', label: 'My Shop' }] : [{ id: 'vendorApply', label: 'Become a Vendor' }]),
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6">
                {/* Sidebar */}
                <aside className="w-56 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto">
                                {String(profile?.first_name || 'U')[0].toUpperCase()}
                            </div>
                            <p className="font-medium mt-2">{profile?.first_name as string} {profile?.last_name as string}</p>
                            <p className="text-xs text-gray-500">{profile?.email as string}</p>
                        </div>
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabType)}
                                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 bg-white rounded-lg shadow p-6">
                    {activeTab === 'profile' && <ProfileTab profile={profile} />}
                    {activeTab === 'settings' && <ProfileTab profile={profile} />}
                    {activeTab === 'purchases' && <PurchasesTab orders={orders as unknown[]} />}
                    {activeTab === 'bookmarks' && <BookmarksTab />}
                    {activeTab === 'favoriteShops' && <FavoriteShopsTab />}
                    {activeTab === 'notifications' && <NotificationsTab notifications={notifications as unknown[]} />}
                    {activeTab === 'shop' && <ShopTab products={vendorProducts} orders={vendorOrders} subscription={subscription} />}
                    {activeTab === 'vendorApply' && <VendorApplyTab />}
                </div>
            </div>
        </div>
    );
};

const ProfileTab: React.FC<{ profile: Record<string, unknown> | null }> = ({ profile }) => {
    const [formData, setFormData] = useState({
        first_name: profile?.first_name as string || '',
        last_name: profile?.last_name as string || '',
        phone: profile?.phone as string || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userAPI.updateProfile(formData);
            toast.success('Profile updated!');
        } catch {
            toast.error('Update failed');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        value={formData.first_name}
                        onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        value={formData.last_name}
                        onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
            </form>
        </div>
    );
};

const PurchasesTab: React.FC<{ orders: unknown[] }> = ({ orders }) => {
    const statusColors: Record<string, string> = {
        order_made: 'bg-blue-100 text-blue-800',
        order_received: 'bg-yellow-100 text-yellow-800',
        delivery_in_progress: 'bg-orange-100 text-orange-800',
        delivery_made: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Purchase History</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order: unknown) => {
                        const o = order as Record<string, unknown>;
                        const statusColor = statusColors[o.order_status as string] || 'bg-gray-100 text-gray-800';
                        return (
                            <div key={o.id as string} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-sm">Order #{(o.id as string).slice(0, 8)}...</p>
                                        <p className="text-gray-500 text-xs mt-1">{new Date(o.created_at as string).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
                                        {(o.order_status as string).replace(/_/g, ' ').toUpperCase()}
                                    </span>
                                </div>
                                <p className="mt-2 font-bold">KES {(o.total_amount as number).toFixed(0)}</p>
                                <Link to={`/orders/${o.id}`} className="text-blue-600 text-sm hover:underline mt-1 inline-block">View Details</Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const BookmarksTab: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<unknown[]>([]);

    useEffect(() => {
        userAPI.getBookmarks().then(res => setBookmarks(res.data.data || []));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Bookmarked Products</h2>
            {bookmarks.length === 0 ? (
                <p className="text-gray-500">No bookmarks yet</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {bookmarks.map((b: unknown) => {
                        const item = b as Record<string, unknown>;
                        const product = item.product as Record<string, unknown>;
                        if (!product) return null;
                        return (
                            <Link key={item.id as string} to={`/ad_info/${product.id}`} className="block bg-gray-50 rounded-lg p-3 hover:shadow-md">
                                <p className="font-medium text-sm">{product.name as string}</p>
                                <p className="text-blue-600 text-sm">KES {(product.price as number).toFixed(0)}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const FavoriteShopsTab: React.FC = () => {
    const [shops, setShops] = useState<unknown[]>([]);

    useEffect(() => {
        userAPI.getFavoriteShops().then(res => setShops(res.data.data || []));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Favorite Shops</h2>
            {shops.length === 0 ? (
                <p className="text-gray-500">No favorite shops yet</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {shops.map((s: unknown) => {
                        const item = s as Record<string, unknown>;
                        const vendor = item.vendor as Record<string, unknown>;
                        if (!vendor) return null;
                        return (
                            <Link key={item.id as string} to={`/seller/store/${vendor.id}`} className="block bg-gray-50 rounded-lg p-3 hover:shadow-md">
                                <p className="font-medium">{vendor.shop_name as string}</p>
                                <p className="text-gray-500 text-sm truncate">{vendor.shop_description as string}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const NotificationsTab: React.FC<{ notifications: unknown[] }> = ({ notifications }) => {
    const handleMarkAllRead = async () => {
        await notificationsAPI.markAllRead();
        toast.success('All marked as read');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notifications</h2>
                <button onClick={handleMarkAllRead} className="text-sm text-blue-600 hover:underline">Mark all read</button>
            </div>
            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications</p>
            ) : (
                <div className="space-y-3">
                    {notifications.map((n: unknown) => {
                        const notif = n as Record<string, unknown>;
                        return (
                            <div key={notif.id as string} className={`p-3 rounded-lg border ${notif.is_read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
                                <p className="text-sm">{notif.message as string}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at as string).toLocaleString()}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const ShopTab: React.FC<{ products: unknown; orders: unknown; subscription: unknown }> = ({ products, orders, subscription }) => {
    const productList = (products as unknown[]) || [];
    const orderList = (orders as unknown[]) || [];
    const sub = subscription as Record<string, unknown> | null;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Shop</h2>

            {/* Subscription Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Current Subscription</h3>
                {sub ? (
                    <div>
                        <p className="text-sm">Plan: <strong>{(sub.package as Record<string, unknown>)?.name as string || 'Basic'}</strong></p>
                        <p className="text-sm">Expires: {sub.end_date ? new Date(sub.end_date as string).toLocaleDateString() : 'N/A'}</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No active subscription</p>
                )}
                <Link to="/pricing" className="mt-2 inline-block text-sm text-blue-600 hover:underline">View Plans</Link>
            </div>

            {/* Products */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">My Products ({productList.length})</h3>
                    <Link to="/vendor/products/new" className="text-sm bg-blue-600 text-white px-3 py-1 rounded">+ Add Product</Link>
                </div>
                {productList.length === 0 ? (
                    <p className="text-gray-500 text-sm">No products yet</p>
                ) : (
                    <div className="space-y-2">
                        {productList.slice(0, 5).map((p: unknown) => {
                            const prod = p as Record<string, unknown>;
                            return (
                                <div key={prod.id as string} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium text-sm">{prod.name as string}</p>
                                        <p className="text-xs text-gray-500">KES {(prod.price as number).toFixed(0)} • {prod.views_count as number} views</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${prod.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {prod.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Orders */}
            <div>
                <h3 className="font-semibold mb-3">Incoming Orders ({orderList.length})</h3>
                {orderList.length === 0 ? (
                    <p className="text-gray-500 text-sm">No orders yet</p>
                ) : (
                    <div className="space-y-2">
                        {orderList.slice(0, 5).map((o: unknown) => {
                            const order = o as Record<string, unknown>;
                            return (
                                <div key={order.id as string} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium text-sm">Order #{(order.id as string).slice(0, 8)}...</p>
                                        <p className="text-xs text-gray-500">KES {(order.total_amount as number).toFixed(0)}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                                        {(order.order_status as string).replace(/_/g, ' ')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const VendorApplyTab: React.FC = () => {
    const [formData, setFormData] = useState({ shop_name: '', shop_description: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await vendorAPI.applyAsVendor(formData);
            toast.success('Application submitted! We will review and notify you.');
            setSubmitted(true);
        } catch {
            toast.error('Application failed. You may have already applied.');
        }
    };

    if (submitted) return <p className="text-green-600">Your vendor application has been submitted successfully!</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Become a Vendor</h2>
            <p className="text-gray-600 mb-6">Set up your shop and start selling to thousands of customers.</p>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Shop Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.shop_name}
                        onChange={e => setFormData({ ...formData, shop_name: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="My Amazing Shop"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Shop Description</label>
                    <textarea
                        value={formData.shop_description}
                        onChange={e => setFormData({ ...formData, shop_description: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        placeholder="Tell customers about your shop..."
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Submit Application</button>
            </form>
        </div>
    );
};

export default DashboardPage;
