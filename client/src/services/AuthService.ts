import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { isRegisterSuccess, RegisterDto } from "../types";
import { setAccessToken } from "../store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.authReducer.accessToken;
    console.log(token, state);
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReFetch: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (isRegisterSuccess(refreshResult)) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const ApiSlice = createApi({
  baseQuery: baseQueryWithReFetch,
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    register: build.mutation<{ accessToken: string }, RegisterDto>({
      query: (registerDto) => ({
        url: "auth/signup",
        method: "POST",
        body: registerDto,
      }),
    }),
  }),
});
