import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { logOut, setAccessToken } from "../../store/slices/authSlice";
import { refreshResponse } from "../../types";
import { setIsLoading, setNotIsLoading } from "../../store/slices/loadingSlice";

let baseUrl = window.location.origin;

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:5000";
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.authReducer.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReFetch: BaseQueryFn = async (args, api, extraOptions) => {
  api.dispatch(setIsLoading());
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === "FETCH_ERROR") {
    api.dispatch(setNotIsLoading());
  }

  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as refreshResponse;
    if (refreshResult.data && refreshResult.data.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
    } else if (refreshResult.error) {
      api.dispatch(logOut());
      api.dispatch(setNotIsLoading());
    }
    result = await baseQuery(args, api, extraOptions);
  }

  api.dispatch(setNotIsLoading());
  return result;
};

export const TrEnglishApi = createApi({
  reducerPath: "trEnglishApi",
  baseQuery: baseQueryWithReFetch,
  tagTypes: ["StudentTask", "User", "KnowledgeBase"],
  endpoints: () => ({}),
});
