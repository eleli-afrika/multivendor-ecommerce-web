import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { wishlistAPI } from '../../api/api';

export const fetchWishlist = createAsyncThunk('wishlist/fetchAll', async () => {
    const res = await wishlistAPI.getAll();
    return res.data.data;
});

interface WishlistState {
    items: unknown[];
    isLoading: boolean;
}

const initialState: WishlistState = {
    items: [],
    isLoading: false,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload || [];
            });
    },
});

export default wishlistSlice.reducer;
