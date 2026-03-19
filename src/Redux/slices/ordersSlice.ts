import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ordersAPI, userAPI } from '../../api/api';

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async () => {
    const res = await userAPI.getPurchaseHistory();
    return res.data.data;
});

export const fetchSingleOrder = createAsyncThunk('orders/fetchSingle', async (id: string) => {
    const res = await ordersAPI.getOrder(id);
    return res.data.data;
});

interface OrdersState {
    orders: unknown[];
    currentOrder: Record<string, unknown> | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => { state.currentOrder = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => { state.isLoading = true; })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload || [];
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            })
            .addCase(fetchSingleOrder.fulfilled, (state, action) => {
                state.currentOrder = action.payload;
            });
    },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
