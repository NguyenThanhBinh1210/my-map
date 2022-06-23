import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import MapReducer from "./features/mapSlice";
import BooleanReducer from "./features/booleanSlice";
import LocationReducer from "./features/locationSlice";
import PolylineReducer from "./features/polylineSlice";
import ModeReducer from "./features/modeSlice";

export default configureStore({
  reducer: {
    map: MapReducer,
    boolean: BooleanReducer,
    location: LocationReducer,
    polyline: PolylineReducer,
    mode: ModeReducer,
  },
  devTool: process.env.NODE_ENV === "development",
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});
