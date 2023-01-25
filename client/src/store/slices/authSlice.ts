import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardValue } from "../../Pages/CreateTaskPage";

type CurrentTaskType = {
  name: string;
  hash: string;
  value: CardValue[];
  cardsComplete: boolean;
  learningComplete: boolean;
  learnCorrectNumber: number;
  testComplete: boolean;
  testCorrectNumber: number;
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
      action: PayloadAction<{ name: string; value: CardValue[]; hash: string }>
    ) {
      if (state.user) {
        state.user.currentTask = {
          name: "",
          value: [],
          hash: "",
          cardsComplete: false,
          testComplete: false,
          testCorrectNumber: 0,
          learningComplete: false,
          learnCorrectNumber: 0,
        };
        state.user.currentTask.value = action.payload.value;
        state.user.currentTask.name = action.payload.name;
        state.user.currentTask.hash = action.payload.hash;
      }
    },

    setCardsComplete(state, action: PayloadAction<boolean>) {
      if (state.user && state.user.currentTask) {
        state.user.currentTask.cardsComplete = action.payload;
      }
    },

    setLearningComplete(
      state,
      action: PayloadAction<{ complete: boolean; correctNumber: number }>
    ) {
      if (state.user && state.user.currentTask) {
        state.user.currentTask.learningComplete = action.payload.complete;
        state.user.currentTask.learnCorrectNumber =
          action.payload.correctNumber;
      }
    },
    setTestComplete(
      state,
      action: PayloadAction<{ complete: boolean; correctNumber: number }>
    ) {
      if (state.user && state.user.currentTask) {
        state.user.currentTask.testComplete = action.payload.complete;
        state.user.currentTask.testCorrectNumber = action.payload.correctNumber;
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
  setLearningComplete,
  setTestComplete,
  // addTask,
} = AuthSlice.actions;
export default AuthSlice.reducer;
