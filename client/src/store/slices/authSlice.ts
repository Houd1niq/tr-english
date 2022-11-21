import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardValue } from "../../Pages/CreateTaskPage";

type CurrentTaskType = {
  name: string;
  value: CardValue[];
  cardsComplete: boolean;
  learningComplete: boolean;
  testComplete: boolean;
};

export type TUser = {
  name: string;
  login: string;
  role: "teacher" | "student";
  tasks?: { name: string; createdAt: string; hash: string }[];
  currentTask?: CurrentTaskType;
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

    setCurrentTask(
      state,
      action: PayloadAction<{ name: string; value: CardValue[] }>
    ) {
      if (state.user) {
        state.user.currentTask = {
          name: "",
          value: [],
          cardsComplete: false,
          testComplete: false,
          learningComplete: false,
        };
        state.user.currentTask.value = action.payload.value;
        state.user.currentTask.name = action.payload.name;
      }
    },

    setCardsComplete(state, action: PayloadAction<boolean>) {
      if (state.user && state.user.currentTask) {
        state.user.currentTask.cardsComplete = action.payload;
      }
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

export const {
  setAccessToken,
  setUserInfo,
  logOut,
  setCurrentTask,
  setCardsComplete,
} = AuthSlice.actions;
export default AuthSlice.reducer;
