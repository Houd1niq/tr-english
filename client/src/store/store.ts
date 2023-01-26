import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { TrEnglishApi } from "../services/trEnglishApi/TREnglishApi";
import { translationApi } from "../services/transilationApi/translationApi";
import currentTaskReducer from "./slices/currentTaskSlice";

const store = configureStore({
  reducer: {
    authReducer,
    currentTaskReducer,
    [TrEnglishApi.reducerPath]: TrEnglishApi.reducer,
    [translationApi.reducerPath]: translationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      TrEnglishApi.middleware,
      translationApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
