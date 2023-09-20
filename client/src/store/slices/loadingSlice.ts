import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setNotIsLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, setNotIsLoading } = loadingSlice.actions;
export const { reducer: loadingSliceReducer } = loadingSlice;
