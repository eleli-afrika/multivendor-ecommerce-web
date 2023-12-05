import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../interface/common';
import { fetchOurSingleProduct, fetchSingle } from '../hooks/Ads.actions';

interface AdState {
    ad: ProductData | null;
    adImages: [];
    seller: [];
    isLoading: boolean;
    sellerad: ProductData | null;
    sellerAdImages: [];
    similarAds: ProductData[];
}

const initialState: AdState = {
    ad: null, // Set the initial state as null
    adImages: [],
    seller: [],
    isLoading: false,
    sellerad: null,
    sellerAdImages: [],
    similarAds: [],
};

export const FetchProduct = createAsyncThunk('ad/fetchproduct', async (id: any) => {
    try {
        const response = await fetchOurSingleProduct(id);
        console.log(response);
        const productData = response.data.Data;
        return productData;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
});

export const FetchMyProduct = createAsyncThunk('ad/fetchmyproduct', async (id: any, {}) => {
    try {
        const response = await fetchSingle(id);
        console.log(response.data);
        return response.data.Data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
});

const AdSlice = createSlice({
    name: 'Ad',
    initialState,
    reducers: {
        setAd: (state, action: PayloadAction<ProductData>) => {
            state.ad = action.payload;
        },
        setAdImages: (state, action: PayloadAction<[]>) => {
            state.adImages = action.payload;
        },
        setSeller: (state, action: PayloadAction<[]>) => {
            state.seller = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(FetchProduct.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(FetchProduct.fulfilled, (state, action) => {
                // console.log(action);
                state.ad = action.payload.product_data;
                state.adImages = action.payload.product_images;
                state.seller = action.payload.seller_details;
                state.similarAds = action.payload.similar_products;

                state.isLoading = false;
            })

            .addCase(FetchProduct.rejected, (state, _action) => {
                // console.log(action);
                state.isLoading = false;
            });

        builder
            .addCase(FetchMyProduct.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(FetchMyProduct.fulfilled, (state, action) => {
                // console.log(action);
                state.sellerad = action.payload.productdata;
                state.sellerAdImages = action.payload.images;
                state.isLoading = false;
            })

            .addCase(FetchMyProduct.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export const { setAd, setAdImages, setSeller } = AdSlice.actions;

export default AdSlice.reducer;
