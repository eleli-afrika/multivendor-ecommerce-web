import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../interface/common';
import { fetchOurSingleProduct } from '../hooks/Ads.actions';

interface AdState {
    ad: ProductData | null;
    adImages: [];
    seller: [];
    isLoading: boolean;
}

const initialState: AdState = {
    ad: null, // Set the initial state as null
    adImages: [],
    seller: [],
    isLoading: false,
};

export const FetchProduct = createAsyncThunk('ad/fetchproduct', async (id: any, { dispatch }) => {
    try {
        const response = await fetchOurSingleProduct(id);
        const productData = response.data.Data.product_data;

        // Dispatch the setAd action to immediately update the state
        dispatch(setAd(productData));

        return productData;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
});

// Update for FetchProductImages thunk
export const FetchProductImages = createAsyncThunk(
    'ad/fetchproductimages',
    async (id: any, { dispatch }) => {
        try {
            const response = await fetchOurSingleProduct(id);
            const productImages = response.data.Data.product_images;
            // Dispatch the setAdImages action to immediately update the state
            dispatch(setAdImages(productImages));

            return productImages;
        } catch (error) {
            console.error('Error fetching product images:', error);
            throw error;
        }
    }
);

// Update for FetchProductSeller thunk
export const FetchProductSeller = createAsyncThunk(
    'ad/fetchproductseller',
    async (id: any, { dispatch }) => {
        try {
            const response = await fetchOurSingleProduct(id);
            const sellerDetails = response.data.Data.seller_details;

            // Dispatch the setSeller action to immediately update the state
            dispatch(setSeller(sellerDetails));

            return sellerDetails;
        } catch (error) {
            console.error('Error fetching product seller:', error);
            throw error;
        }
    }
);

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
            .addCase(FetchProductImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchProductSeller.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchProduct.fulfilled, (state, action) => {
                // console.log(action);
                state.ad = action.payload;
                state.isLoading = false;
            })
            .addCase(FetchProductImages.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.adImages = action.payload;
            })
            .addCase(FetchProductSeller.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.seller = action.payload;
            })
            .addCase(FetchProduct.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(FetchProductImages.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(FetchProductSeller.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export const { setAd, setAdImages, setSeller } = AdSlice.actions;

export default AdSlice.reducer;
