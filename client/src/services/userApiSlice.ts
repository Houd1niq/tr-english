import { ApiSlice } from "./ApiSlice";
import { TaskDto } from "../types";

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query({
      query: () => ({
        url: "user/info",
        method: "GET",
      }),
    }),
    createTask: build.mutation({
      query: (task: TaskDto) => ({
        url: "user/create-task",
        method: "POST",
        body: task,
      }),
    }),
  }),
});
