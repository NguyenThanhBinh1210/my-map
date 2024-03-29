import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    value: null,
  },
  reducers: {
    setMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
