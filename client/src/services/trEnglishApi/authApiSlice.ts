import { TrEnglishApi } from "./TREnglishApi";
import { LoginDto, RegisterDto } from "../../types";

export const authApiSlice = TrEnglishApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    login: build.mutation<{ accessToken: string }, LoginDto>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    register: build.mutation<{ accessToken: string }, RegisterDto>({
      query: (registerDto) => ({
        url: "auth/signup",
        method: "POST",
        body: registerDto,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
