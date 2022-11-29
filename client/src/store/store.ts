import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { ApiSlice } from "../services/ApiSlice";
import { translationApiSlice } from "../services/translationApiSlice";

const store = configureStore({
  reducer: {
    authReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [translationApiSlice.reducerPath]: translationApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ApiSlice.middleware,
      translationApiSlice.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
