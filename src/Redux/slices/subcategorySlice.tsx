import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subcategory {
  subcategoryname: string;
  subcategoryimage: string;
  parentcategory: string;
  // ...
}

interface subcategoryState {
  subcategory: Subcategory | null;
}

const initialState: subcategoryState = {
  subcategory: null, // Set the initial state as null
};

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    setSubcategory: (state, action: PayloadAction<Subcategory>) => {
      state.subcategory = action.payload;
    },
  },
});

export const { setSubcategory } = subcategorySlice.actions;

export default subcategorySlice.reducer;
