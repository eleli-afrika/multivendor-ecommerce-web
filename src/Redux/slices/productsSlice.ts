import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsAPI } from '../../api/api';

export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async ({ page = 1, limit = 20 }: { page?: number; limit?: number }) => {
        const res = await productsAPI.getAll(page, limit);
        return res.data;
    }
);

export const fetchSingleProduct = createAsyncThunk(
    'products/fetchSingle',
    async (id: string) => {
        const res = await productsAPI.getSingle(id);
        return res.data.data;
    }
);

export const fetchLanding = createAsyncThunk('products/fetchLanding', async () => {
    const res = await productsAPI.getLanding();
    return res.data.data;
});

export const searchProducts = createAsyncThunk(
    'products/search',
    async (keyword: string) => {
        const res = await productsAPI.search(keyword);
        return res.data.data;
    }
);

export const filterProducts = createAsyncThunk(
    'products/filter',
    async (params: Record<string, string | number>) => {
        const res = await productsAPI.filter(params);
        return res.data.data;
    }
);

interface ProductsState {
    products: unknown[];
    currentProduct: Record<string, unknown> | null;
    landingData: Record<string, unknown> | null;
    searchResults: unknown[];
    total: number;
    page: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    currentProduct: null,
    landingData: null,
    searchResults: [],
    total: 0,
    page: 1,
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action) => { state.page = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data || [];
                state.total = action.payload.total || 0;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
            })
            .addCase(fetchLanding.fulfilled, (state, action) => {
                state.landingData = action.payload;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchResults = action.payload || [];
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.products = action.payload || [];
            });
    },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
