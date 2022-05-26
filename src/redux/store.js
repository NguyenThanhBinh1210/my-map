import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/mapSlice";

export default configureStore({
  reducer: {
    map: MapReducer,
  },
});
