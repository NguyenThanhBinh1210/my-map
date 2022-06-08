import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./features/mapSlice";
import MoreReducer from "./features/moreSlice";
import ToggleReducer from "./features/toggleSlice";
import SuggestReducer from "./features/suggestSlice";
import LocationReducer from "./features/locationSlice";
import PolylineReducer from "./features/polylineSlice";
import InputReducer from "./features/inputSlice";

export default configureStore({
  reducer: {
    map: MapReducer,
    more: MoreReducer,
    toggle: ToggleReducer,
    suggest: SuggestReducer,
    location: LocationReducer,
    polyline: PolylineReducer,
    input: InputReducer,
  },
});
