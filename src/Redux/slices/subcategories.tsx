import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subcategory {
  // Define the properties of a subcategory here
  subcategoryname: string;
  subcategoryimage: string;
  parentcategory: string;
  // ...
}

interface SubcategoriesState {
  subcategories: Subcategory[];
}

const initialState: SubcategoriesState = {
  subcategories: [],
};

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    setSubcategories: (state, action: PayloadAction<Subcategory[]>) => {
      state.subcategories = action.payload;
    },
  },
});

export const { setSubcategories } = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;
