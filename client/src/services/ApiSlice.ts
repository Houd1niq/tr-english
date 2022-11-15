import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { isAuthSuccess, LoginDto, RegisterDto } from "../types";
import { logOut, setAccessToken } from "../store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
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
  baseQuery: baseQueryWithReFetch,
  endpoints: (build) => ({}),
});
