import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/mapSlice";
import MoreReducer from "./features/moreSlice";
import ToggleReducer from "./features/toggleSlice";
import SuggestReducer from "./features/suggestSlice";

export default configureStore({
  reducer: {
    map: MapReducer,
    more: MoreReducer,
    toggle: ToggleReducer,
    suggest: SuggestReducer,
  },
});
