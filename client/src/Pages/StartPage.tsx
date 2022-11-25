import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
const StartPage = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.authReducer.accessToken);
  useEffect(() => {
    if (token) {
      navigate("/profile", { replace: true });
    } else {
      navigate("auth", { replace: true });
    }
  }, [token]);
  return <></>;
};

export default StartPage;
