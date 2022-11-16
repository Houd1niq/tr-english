import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  login: string;
  role: "teacher" | "student";
  tasks?: { name: string; createdAt: string; hash: string }[];
};

interface AuthState {
  user: TUser | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    logOut(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },

    setUserInfo(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUserInfo, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
