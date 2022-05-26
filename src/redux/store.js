import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/mapSlice";
import MoreReducer from "./features/moreSlice";

export default configureStore({
  reducer: {
    map: MapReducer,
    more: MoreReducer,
  },
});
