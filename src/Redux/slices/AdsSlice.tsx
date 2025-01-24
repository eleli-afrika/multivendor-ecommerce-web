import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ProductData } from '../../interface/common';
import {
    fetchLoggedUsersProducts,
    fetchOurProducts,
    fetchOurSponseredProducts,
    fetchOurTopsProducts,
    fetchSellersProduct,
    searchOurProducts,
} from '../hooks/Ads.actions';
import { toast } from 'react-toastify';

interface ProductsState {
    Ads: ProductData[];
    TopAds: ProductData[];
    SponseredAds: ProductData[];
    isLoading: boolean;
    SearchResults: ProductData[];
    searchStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: ProductsState = {
    Ads: [],
    TopAds: [],
    SponseredAds: [],
    isLoading: false,
    SearchResults: [],
    searchStatus: 'idle',
};

export const FetchProductsAsync = createAsyncThunk('ads/fetchproductsasync', async () => {
    try {
        const response = await fetchOurProducts();
        return response.data.Data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Re-throw the error to be caught by the rejection handler
    }
});

export const FetchTopProductsAsync = createAsyncThunk('ads/fetchtopproductsasync', async () => {
    try {
        const response = await fetchOurTopsProducts();
        return response.data.Data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Re-throw the error to be caught by the rejection handler
    }
});

export const FetchSponsoredProductsAsync = createAsyncThunk(
    'ads/fetchsponseredproductsasync',
    async () => {
        try {
            const response = await fetchOurSponseredProducts();
            return response.data.Data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Re-throw the error to be caught by the rejection handler
        }
    }
);

export const SearchingProduct = createAsyncThunk('ad/searchproduct', async (param: any) => {
    try {
        const response = await searchOurProducts(param);
        console.log(param);
        console.log(response);
        console.log(response.data.Data);
        return response.data.Data;
    } catch (error) {
        console.error('Error searching product:', error);
        throw error;
    }
});

export const FetchSellerProducts = createAsyncThunk('ads/fetchsellerproducts', async (id: any) => {
    try {
        const response = await fetchSellersProduct(id);
        return response.data.Data;
    } catch (error) {
        console.error('Error fetching seller products:', error);
        throw error; // Re-throw the error to be caught by the rejection handler
    }
});

export const FetchLoggedUsersProducts = createAsyncThunk(
    'ads/fetchloggedusersproducts',
    async (id: any) => {
        try {
            const response = await fetchLoggedUsersProducts(id);
            return response.data.Data;
        } catch (error) {
            console.error("Error fetching logged user's products:", error);
            throw error; // Re-throw the error to be caught by the rejection handler
        }
    }
);

const productsSlice = createSlice({
    name: 'products', // Renamed the slice to "products" (lowercase)
    initialState,
    reducers: {
        setAds: (state, action) => {
            state.Ads = action.payload;
        },
        setTopAds: (state, action) => {
            state.TopAds = action.payload;
        },

        setSponsoredAds: (state, action) => {
            state.SponseredAds = action.payload;
        },
        setSearchResults: (state, action) => {
            state.SearchResults = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Ads = action.payload;
            })
            .addCase(FetchProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Error fetching products:', action.error);
            });

        builder
            .addCase(FetchTopProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchTopProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.TopAds = action.payload;
            })
            .addCase(FetchTopProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Error fetching products:', action.error);
            });

        builder
            .addCase(FetchSponsoredProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchSponsoredProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.SponseredAds = action.payload;
            })
            .addCase(FetchSponsoredProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Error fetching products:', action.error);
            });
        builder
            .addCase(SearchingProduct.pending, (state) => {
                state.isLoading = true;
                state.searchStatus = 'pending';
            })
            .addCase(SearchingProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchStatus = 'fulfilled';
                state.SearchResults = action.payload;
            })
            .addCase(SearchingProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.searchStatus = 'rejected';
                console.error('Error fetching products:', action.error);
            });
        builder
            .addCase(FetchSellerProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchSellerProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Ads = action.payload;
            })
            .addCase(FetchSellerProducts.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error fetching seller products. Please try again later.');
            });
        builder
            .addCase(FetchLoggedUsersProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchLoggedUsersProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Ads = action.payload;
            })
            .addCase(FetchLoggedUsersProducts.rejected, (state) => {
                state.isLoading = false;
                toast.error("Error fetching logged user's products. Please try again later.");
            });
    },
});

export const { setAds, setSearchResults, setTopAds, setSponsoredAds } = productsSlice.actions;

export default productsSlice.reducer;
