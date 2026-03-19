import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { vendorAPI } from '../../api/api';

export const fetchVendorProfile = createAsyncThunk('vendor/fetchProfile', async () => {
    const res = await vendorAPI.getProfile();
    return res.data.data;
});

export const fetchVendorSubscription = createAsyncThunk('vendor/fetchSubscription', async () => {
    const res = await vendorAPI.getSubscription();
    return res.data.data;
});

export const fetchVendorOrders = createAsyncThunk('vendor/fetchOrders', async () => {
    const res = await vendorAPI.getVendorOrders();
    return res.data.data;
});

export const fetchVendorProducts = createAsyncThunk('vendor/fetchProducts', async () => {
    const res = await vendorAPI.getVendorProducts();
    return res.data.data;
});

interface VendorState {
    profile: Record<string, unknown> | null;
    subscription: Record<string, unknown> | null;
    orders: unknown[];
    products: unknown[];
    isLoading: boolean;
    error: string | null;
}

const initialState: VendorState = {
    profile: null,
    subscription: null,
    orders: [],
    products: [],
    isLoading: false,
    error: null,
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendorProfile.pending, (state) => { state.isLoading = true; })
            .addCase(fetchVendorProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchVendorProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            })
            .addCase(fetchVendorSubscription.fulfilled, (state, action) => {
                state.subscription = action.payload;
            })
            .addCase(fetchVendorOrders.fulfilled, (state, action) => {
                state.orders = action.payload || [];
            })
            .addCase(fetchVendorProducts.fulfilled, (state, action) => {
                state.products = action.payload || [];
            });
    },
});

export default vendorSlice.reducer;
