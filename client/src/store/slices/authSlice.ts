import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  name: string;
  login: string;
  role: "teacher" | "student";
  tasks?: { name: string; createdAt: string; hash: string }[];
};

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
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
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setAccessToken, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
