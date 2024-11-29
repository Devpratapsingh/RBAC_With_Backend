import { configureStore } from "@reduxjs/toolkit";
import Token from "./authSlice/token.js";
export const store = configureStore({
  reducer: {
    auth: Token,
  },
});
