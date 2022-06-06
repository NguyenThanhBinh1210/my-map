import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
  },
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const { setLocations } = locationSlice.actions;

export default locationSlice.reducer;
