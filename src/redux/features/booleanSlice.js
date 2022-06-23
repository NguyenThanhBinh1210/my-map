import { createSlice } from "@reduxjs/toolkit";

export const booleanSlice = createSlice({
  name: "booleanValue",
  initialState: {
    valueToggle: false,
    valueSuggest: false,
    valueMore: false,
  },
  reducers: {
    setToggle: (state, action) => {
      state.valueToggle = action.payload;
    },
    setSuggest: (state, action) => {
      state.valueSuggest = action.payload;
    },
    setMore: (state, action) => {
      state.valueMore = action.payload;
    },
  },
});

export const { setToggle, setSuggest, setMore } = booleanSlice.actions;

export default booleanSlice.reducer;
