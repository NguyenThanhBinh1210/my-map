import { createSlice } from "@reduxjs/toolkit";

export const polylineSlice = createSlice({
  name: "polyline",
  initialState: {
    value: [],
    values: [],
  },
  reducers: {
    setPolyline: (state, action) => {
      state.value = action.payload;
    },
    setListPolyline: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { setPolyline, setListPolyline } = polylineSlice.actions;

export default polylineSlice.reducer;
