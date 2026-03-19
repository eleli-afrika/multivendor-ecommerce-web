import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AdsReducer from './slices/AdsSlice';
import adReducer from './slices/adSlice';
import categoriesReducer from './slices/categoriesSlice';
import categoryReducer from './slices/categorySlice';
import subcategoryReducer from './slices/subcategorySlice';
import subcategoriesReducer from './slices/subcategories';
import { LoaderSlice } from './slices/LoaderSlice';
import { OpenerSlice } from './slices/opener';
import { useDispatch } from 'react-redux';
import vendorReducer from './slices/vendorSlice';
import ordersReducer from './slices/ordersSlice';
import notificationsReducer from './slices/notificationsSlice';
import wishlistReducer from './slices/wishlistSlice';
import chatReducer from './slices/chatSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        ad: adReducer,
        AllAds: AdsReducer,
        category: categoryReducer,
        categories: categoriesReducer,
        subcategory: subcategoryReducer,
        subcategories: subcategoriesReducer,
        loaders: LoaderSlice.reducer,
        opener: OpenerSlice.reducer,
        vendor: vendorReducer,
        orders: ordersReducer,
        notifications: notificationsReducer,
        wishlist: wishlistReducer,
        chat: chatReducer,
        products: productsReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
