import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  // Define the properties of a category here
  categoryname: string;
  categoryimage: string;
  // ...
}

interface categoryState {
  category: Category | null; // Change the type to Category | null
}

const initialState: categoryState = {
  category: null, // Set the initial state as null
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
