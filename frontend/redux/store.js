import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice/index";

const store = configureStore({
  reducer: {
    appstate: appReducer,
  },
});

export default store;
