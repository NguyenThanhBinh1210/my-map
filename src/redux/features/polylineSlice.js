import { createSlice } from "@reduxjs/toolkit";

export const polylineSlice = createSlice({
  name: "polyline",
  initialState: {
    value: [],
  },
  reducers: {
    setPolyline: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPolyline } = polylineSlice.actions;

export default polylineSlice.reducer;
