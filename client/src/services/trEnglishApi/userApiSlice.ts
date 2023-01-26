import { TrEnglishApi } from "./TREnglishApi";
import { StudentTaskDto, TaskDto, UpdateStudentTaskDto } from "../../types";
import { TUser } from "../../store/slices/authSlice";

type statisticForTask = {
  createdAt: string;
  studentStatistic: {
    cardsComplete: boolean;
    learnComplete: boolean;
    testComplete: boolean;
    learnCorrectNumber: number;
    testCorrectNumber: number;
    studentName: string;
  }[];
};

export const userApiSlice = TrEnglishApi.injectEndpoints({
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

    getTaskStatistic: build.query<TaskDto & statisticForTask, string>({
      query: (hashUrl) => ({
        url: `user/task-statistic/${hashUrl}`,
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
