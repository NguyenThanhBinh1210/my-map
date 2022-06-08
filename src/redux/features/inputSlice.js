import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: [],
  },
  reducers: {
    setInput: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setInput } = inputSlice.actions;

export default inputSlice.reducer;
