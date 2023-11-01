import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  // Define the properties of a category here
  categoryname: string;
  categoryimage: string;
  // ...
}

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
