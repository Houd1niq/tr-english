import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { isAuthSuccess } from "../types";
import { logOut, setAccessToken } from "../store/slices/authSlice";

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
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === "FETCH_ERROR")
    api.dispatch(logOut());
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (isAuthSuccess(refreshResult)) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
    } else {
      api.dispatch(logOut());
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const ApiSlice = createApi({
  reducerPath: "trEnglishApi",
  baseQuery: baseQueryWithReFetch,
  endpoints: () => ({}),
});
