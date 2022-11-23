import { ApiSlice } from "./ApiSlice";
import { StudentTaskDto, TaskDto, UpdateStudentTaskDto } from "../types";
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

    updateStudentTask: build.mutation<
      UpdateStudentTaskDto,
      UpdateStudentTaskDto
    >({
      query: (updateTaskInfo) => ({
        url: `user/student-task`,
        method: "PUT",
        body: updateTaskInfo,
      }),
    }),

    addStudentTask: build.mutation<
      StudentTaskDto,
      { name: string; hash: string }
    >({
      query: (task) => ({
        url: `user/student-task`,
        method: "POST",
        body: task,
      }),
    }),

    getStudentTask: build.query<StudentTaskDto, string>({
      query: (hash) => ({
        url: `user/student-task/${hash}`,
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
