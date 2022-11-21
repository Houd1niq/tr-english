import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import AuthLayout from "./Pages/Auth/AuthLayout";
import NotFound from "./Pages/NotFound";
import { Profile } from "./Pages/Profile/Profile";
import StartPage from "./Pages/StartPage";
import RequireAuthorization from "./Pages/Auth/RequireAuthorization";
import CreateTaskPage from "./Pages/CreateTaskPage";
import { RequireRole } from "./Pages/Auth/RequireRole";
import { TaskInfoPage } from "./Pages/TaskInfoPage";
import { TaskPage } from "./Pages/TaskPage/TaskPage";
import { CardsLayout } from "./Pages/TaskPage/CardsLayout";

function App() {
  return (
    <div className="bg-bg-dark text-main-white min-h-screen h-100% flex flex-col">
      <BrowserRouter>
        <Routes>
          {/*Публичные*/}
          <Route path="" element={<StartPage></StartPage>}></Route>
          <Route path="auth" element={<AuthLayout></AuthLayout>}>
            <Route path="login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
          </Route>

          {/*Требующие авторизации*/}
          <Route element={<RequireAuthorization></RequireAuthorization>}>
            <Route path="profile" element={<Profile></Profile>}></Route>

            {/*Требующие роль учтеля*/}
            <Route element={<RequireRole role="teacher"></RequireRole>}>
              <Route
                path="profile/create-task"
                element={<CreateTaskPage></CreateTaskPage>}
              ></Route>
              <Route
                path="task-info/:urlHash"
                element={<TaskInfoPage></TaskInfoPage>}
              ></Route>
            </Route>

            {/*Требующие роль ученика*/}
            <Route element={<RequireRole role="student"></RequireRole>}>
              <Route path="task/:urlHash" element={<TaskPage></TaskPage>}>
                <Route
                  path="cards"
                  element={<CardsLayout></CardsLayout>}
                ></Route>
                <Route path="test" element={<div>Test</div>}></Route>
                <Route path="learning" element={<div>Learning</div>}></Route>
              </Route>
            </Route>
          </Route>

          {/*404*/}
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
