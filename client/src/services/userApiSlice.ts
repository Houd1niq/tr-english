import { ApiSlice } from "./ApiSlice";
import { TaskDto } from "../types";
import { TUser } from "../store/slices/authSlice";

export const userApiSlice = ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<TUser, any>({
      query: () => ({
        url: "user/info",
        method: "GET",
      }),
    }),
    getOneTask: build.query<TaskDto & { createdAt: string }, string>({
      query: (hashUrl) => ({
        url: `user/task-info/${hashUrl}`,
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
