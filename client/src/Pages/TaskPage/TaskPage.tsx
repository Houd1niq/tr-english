import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";
import { TeacherTaskPage } from "./TeacherTaskPage/TeacherTaskPage";
import { StudentTaskPage } from "./StudentTaskPage/StudentTaskPage";

export const TaskPage = () => {
  const { data: user } = userApiSlice.useGetUserInfoQuery("");

  if (user && user.role === "teacher") return <TeacherTaskPage />;
  else if (user && user.role === "student") return <StudentTaskPage />;
  return <div></div>;
};
