import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import AuthLayout from "./Pages/Auth/AuthLayout";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="bg-bg-dark min-h-screen h-100% flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout></AuthLayout>}>
            <Route path="login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
          </Route>
          <Route path="profile"></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
