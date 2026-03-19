import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to inject auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token && token !== 'undefined' && token !== 'null') {
            config.headers['x-access-token'] = token;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ===================== AUTH =====================
export const authAPI = {
    register: (data: {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        password: string;
        phone?: string;
        location_id?: string;
    }) => apiClient.post('/auth/register', data),

    login: (data: { email: string; password: string }) =>
        apiClient.post('/auth/login', data),

    forgotPassword: (email: string) =>
        apiClient.post('/auth/forgot-password', { email }),
};

// ===================== USER PROFILE =====================
export const userAPI = {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: { first_name?: string; last_name?: string; phone?: string; location_id?: string }) =>
        apiClient.put('/users/profile', data),
    getSettings: () => apiClient.get('/users/settings'),
    getPurchaseHistory: () => apiClient.get('/users/purchase-history'),
    getBookmarks: () => apiClient.get('/users/bookmarks'),
    getFavoriteShops: () => apiClient.get('/users/favorite-shops'),
    getNotifications: () => apiClient.get('/users/notifications'),
    getOrders: () => apiClient.get('/users/orders'),
    getSingleUser: (userId: string) => apiClient.get(`/users/single/${userId}`),
};

// ===================== VENDORS =====================
export const vendorAPI = {
    applyAsVendor: (data: { shop_name: string; shop_description?: string; location_id?: string }) =>
        apiClient.post('/vendors/apply', data),
    getProfile: () => apiClient.get('/vendors/profile'),
    getLocations: () => apiClient.get('/vendors/locations'),
    getSubscription: () => apiClient.get('/vendors/subscription'),
    subscribe: (data: { package_id: string; billing_cycle: string }) =>
        apiClient.post('/vendors/subscribe', data),
    getProductMetrics: () => apiClient.get('/vendors/products/metrics'),
    getVendorOrders: () => apiClient.get('/vendors/orders'),

    // Vendor products
    createProduct: (formData: FormData) =>
        apiClient.post('/vendors/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    getVendorProducts: () => apiClient.get('/vendors/products'),
    updateProduct: (id: string, data: Record<string, unknown>) =>
        apiClient.put(`/vendors/products/${id}`, data),
    deleteProduct: (id: string) => apiClient.delete(`/vendors/products/${id}`),
};

// ===================== PACKAGES =====================
export const packagesAPI = {
    getAll: () => apiClient.get('/packages'),
};

// ===================== PRODUCTS =====================
export const productsAPI = {
    getAll: (page = 1, limit = 20) =>
        apiClient.get(`/products?page=${page}&limit=${limit}`),
    getSingle: (id: string) => apiClient.get(`/products/${id}`),
    search: (keyword: string) => apiClient.post('/products/search', { keyword }),
    filter: (params: Record<string, string | number>) =>
        apiClient.get('/products/filter', { params }),
    getBySubcategory: (subcatId: string) =>
        apiClient.get(`/subcategories/${subcatId}/products`),
    getByBrand: (brandId: string) => apiClient.get(`/brands/${brandId}/products`),
    getLanding: () => apiClient.get('/landing'),
};

// ===================== ORDERS =====================
export const ordersAPI = {
    create: (data: { vendor_id: string; items: { product_id: string; quantity: number }[] }) =>
        apiClient.post('/orders', data),
    getOrder: (id: string) => apiClient.get(`/orders/${id}`),
    updateStatus: (id: string, status: string) =>
        apiClient.put(`/orders/${id}/status`, { status }),
    cancel: (id: string) => apiClient.post(`/orders/${id}/cancel`),
};

// ===================== PAYMENTS =====================
export const paymentsAPI = {
    initiateMpesa: (data: { order_id: string; phone_number: string }) =>
        apiClient.post('/payments/mpesa/initiate', data),
    initiatePaystack: (data: { order_id: string; email: string; amount: number }) =>
        apiClient.post('/payments/paystack/initiate', data),
    verifyPaystack: (reference: string) =>
        apiClient.post('/payments/paystack/verify', { reference }),
};

// ===================== CHAT =====================
export const chatAPI = {
    createConversation: (participantTwoId: string) =>
        apiClient.post('/chat/conversations', { participant_two_id: participantTwoId }),
    getConversations: () => apiClient.get('/chat/conversations'),
    getMessages: (convId: string) => apiClient.get(`/chat/conversations/${convId}/messages`),
};

// ===================== REVIEWS =====================
export const reviewsAPI = {
    create: (data: { vendor_id: string; product_id?: string; rating: number; comment?: string }) =>
        apiClient.post('/reviews', data),
    getVendorReviews: (vendorId: string) => apiClient.get(`/reviews/vendor/${vendorId}`),
    getProductReviews: (productId: string) => apiClient.get(`/reviews/product/${productId}`),
};

// ===================== WISHLIST =====================
export const wishlistAPI = {
    addProduct: (productId: string) => apiClient.post(`/wishlist/products/${productId}`),
    removeProduct: (productId: string) => apiClient.delete(`/wishlist/products/${productId}`),
    addVendor: (vendorId: string) => apiClient.post(`/wishlist/vendors/${vendorId}`),
    removeVendor: (vendorId: string) => apiClient.delete(`/wishlist/vendors/${vendorId}`),
    getAll: () => apiClient.get('/wishlist'),
};

// ===================== NOTIFICATIONS =====================
export const notificationsAPI = {
    getAll: () => apiClient.get('/notifications'),
    markRead: (id: string) => apiClient.put(`/notifications/${id}/read`),
    markAllRead: () => apiClient.put('/notifications/read-all'),
};

// ===================== CATEGORIES & BRANDS =====================
export const categoriesAPI = {
    getAll: () => apiClient.get('/categories'),
    getSubcategories: (categoryId: string) =>
        apiClient.get(`/categories/${categoryId}/subcategories`),
};

export const brandsAPI = {
    getAll: () => apiClient.get('/brands'),
};

export const locationsAPI = {
    getAll: () => apiClient.get('/vendors/locations'),
};

export const sellerAPI = {
    getStore: (vendorId: string) => apiClient.get(`/seller/store/${vendorId}`),
};
