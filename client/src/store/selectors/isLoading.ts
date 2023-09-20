import { RootState } from "../store";

export const isLoadingSelector = (state: RootState) =>
  state.loadingSliceReducer.isLoading;
