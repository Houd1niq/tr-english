import { ApiSlice } from "./ApiSlice";
import { LoginDto, RegisterDto } from "../types";

export const authApiSlice = ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    login: build.mutation<{ accessToken: string }, LoginDto>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
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
