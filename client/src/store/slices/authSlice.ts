import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUser = {
  name: string;
  login: string;
  role: string;
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

    setUserInfo(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
