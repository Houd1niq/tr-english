import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./Pages/Auth/layouts/LoginLayout";
import RegisterLayout from "./Pages/Auth/layouts/RegisterLayout";
import AuthPage from "./Pages/Auth/AuthPage";
import NotFound from "./Pages/NotFound";
import StartPage from "./Pages/StartPage";
import RequireAuthorization from "./Pages/AccessControlLayouts/RequireAuthorization";
import CreateTaskPage from "./Pages/CreateTaskPage";
import { RequireRole } from "./Pages/AccessControlLayouts/RequireRole";
import { CardsLayout } from "./Pages/TaskPage/StudentTaskPage/layouts/CardsLayout";
import { LearningLayout } from "./Pages/TaskPage/StudentTaskPage/layouts/LearningLayout";
import { ToastContainer } from "react-toastify";
import React from "react";
import { TestLayout } from "./Pages/TaskPage/StudentTaskPage/layouts/TestLayout";
import Progress from "./components/LoadingIndicator/Progress";
import { TaskPage } from "./Pages/TaskPage/TaskPage";
import { KnowledgeBasePage } from "./Pages/KnowledgeBasePage/KnowledgeBasePage";
import { Profile } from "./Pages/Profile/Profile";
import { KnowledgeBaseEditPage } from "./Pages/KnowledgeBasePage/layouts/KnowledgeBaseEditPage/KnowledgeBaseEditPage";
import { KnowledgeBaseCheckPage } from "./Pages/KnowledgeBasePage/layouts/KnowledgeBaseCheckPage/KnowledgeBaseCheckPage";
import { KBCards } from "./Pages/KnowledgeBasePage/layouts/KnowledgeBaseCheckPage/layouts/KBCards";
import { KBTests } from "./Pages/KnowledgeBasePage/layouts/KnowledgeBaseCheckPage/layouts/KBTests";

function App() {
  return (
    <div className="bg-bg-dark text-main-white min-h-screen h-100% flex flex-col overflow-x-hidden">
      <Progress />
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          {/*Публичные*/}
          <Route path="" element={<StartPage></StartPage>}></Route>
          <Route path="auth" element={<AuthPage></AuthPage>}>
            <Route path="login" element={<LoginLayout></LoginLayout>}></Route>
            <Route
              path="register"
              element={<RegisterLayout></RegisterLayout>}
            ></Route>
          </Route>

          {/*Требующие авторизации*/}
          <Route element={<RequireAuthorization></RequireAuthorization>}>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route path="task/:urlHash" element={<TaskPage />}>
              <Route path="cards" element={<CardsLayout></CardsLayout>}></Route>
              <Route
                path="learning"
                element={<LearningLayout></LearningLayout>}
              ></Route>
              <Route path="test" element={<TestLayout></TestLayout>}></Route>
            </Route>

            {/*Требующие роль учтеля*/}
            <Route element={<RequireRole role="teacher"></RequireRole>}>
              <Route
                path="profile/create-task"
                element={<CreateTaskPage></CreateTaskPage>}
              ></Route>
            </Route>

            {/*Требующие роль ученика*/}
            <Route element={<RequireRole role="student"></RequireRole>}>
              <Route
                element={<KnowledgeBasePage />}
                path="knowledge-base"
              ></Route>
              <Route
                path="knowledge-base/edit"
                element={<KnowledgeBaseEditPage />}
              ></Route>
              <Route
                path="knowledge-base/check"
                element={<KnowledgeBaseCheckPage />}
              >
                <Route path="cards" element={<KBCards></KBCards>}></Route>
                <Route path="test" element={<KBTests></KBTests>}></Route>
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
