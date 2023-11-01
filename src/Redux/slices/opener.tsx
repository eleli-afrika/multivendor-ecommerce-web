import { createSlice } from "@reduxjs/toolkit";

export const OpenerSlice = createSlice({
  name: "opener",
  initialState: {
    open: false,
    profileOpener:false
  },
  reducers: {
    setOpener: (state, action) => {
      state.open = action.payload;
    },
    setProfileOpener: (state, action) => {
      state.profileOpener = action.payload;
    },
  },
});

export const { setOpener, setProfileOpener } = OpenerSlice.actions;
