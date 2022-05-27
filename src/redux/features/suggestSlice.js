import { createSlice } from "@reduxjs/toolkit";

export const suggestSlice = createSlice({
  name: "suggest",
  initialState: {
    value: null,
    error: "",
    loading: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSuccess } = suggestSlice.actions;

export default suggestSlice.reducer;
