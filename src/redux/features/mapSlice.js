import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    value: null,
    error: "",
    loading: false,
  },
  reducers: {
    setMap: (state, action) => {
      state.value = action.payload;
    },
    clear: (state, action) => {
      state.value = null;
    },
  },
});

export const { setMap, clear } = mapSlice.actions;

export default mapSlice.reducer;
