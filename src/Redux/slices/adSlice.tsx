import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../../interface/common";
import { fetchOurSingleProduct } from "../hooks/Ads.actions";

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

export const FetchProduct = createAsyncThunk(
  "ad/fetchproduct",
  async (id: any) => {
    try {
      const response = await fetchOurSingleProduct(id);
      return response.data.Data.productdata;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);

export const FetchProductImages = createAsyncThunk(
  "ad/fetchproductimages",
  async (id: any) => {
    try {
      const response = await fetchOurSingleProduct(id);
      return response.data.Data.images;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);

export const FetchProductSeller = createAsyncThunk(
  "ad/fetchproductseller",
  async (id: any) => {
    try {
      const response = await fetchOurSingleProduct(id);
      return response.data.Data.seller_details;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);
const AdSlice = createSlice({
  name: "Ad",
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
        state.isLoading = false;
        state.ad = action.payload;
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
