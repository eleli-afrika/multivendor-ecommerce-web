import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductData } from "../../interface/common";
import {
  fetchLoggedUsersProducts,
  fetchOurProducts,
  fetchSellersProduct,
} from "../hooks/Ads.actions";
import { toast } from "react-toastify";

interface ProductsState {
  Ads: ProductData[];
  isLoading: boolean;
}

const initialState: ProductsState = {
  Ads: [],
  isLoading: false,
};

export const FetchProductsAsync = createAsyncThunk(
  "ads/fetchproductsasync",
  async () => {
    try {
      const response = await fetchOurProducts();
      console.log(response);
      return response.data.Data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);

export const FetchSellerProducts = createAsyncThunk(
  "ads/fetchsellerproducts",
  async (id: any) => {
    try {
      const response = await fetchSellersProduct(id);
      console.log(response);
      return response.data.Data;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);

export const FetchLoggedUsersProducts = createAsyncThunk(
  "ads/fetchloggedusersproducts",
  async (id: any) => {
    try {
      const response = await fetchLoggedUsersProducts(id);
      console.log(response);
      return response.data.Data;
    } catch (error) {
      console.error("Error fetching logged user's products:", error);
      throw error; // Re-throw the error to be caught by the rejection handler
    }
  }
);

const productsSlice = createSlice({
  name: "products", // Renamed the slice to "products" (lowercase)
  initialState,
  reducers: {
    setAds: (state, action) => {
      state.Ads = action.payload;
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
        console.error("Error fetching products:", action.error);
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
        toast.error("Error fetching seller products. Please try again later.");
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
        toast.error(
          "Error fetching logged user's products. Please try again later."
        );
      });
  },
});

export const { setAds } = productsSlice.actions;

export default productsSlice.reducer;
