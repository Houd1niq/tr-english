import { CardValue } from "../../Pages/CreateTaskPage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";
import { firstLetterToUppercase } from "../../utils/utilsFunction";

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

const initialState: CurrentTaskType = {
  name: "",
  hash: "",
  value: [],
  cardsComplete: false,
  learningComplete: false,
  learnCorrectNumber: 0,
  testComplete: false,
  testCorrectNumber: 0,
};

const CurrentTaskSlice = createSlice({
  name: "currentTask",
  initialState,
  reducers: {
    setCurrentTask(
      state,
      action: PayloadAction<{ name: string; value: CardValue[]; hash: string }>
    ) {
      state.value = action.payload.value;
      state.name = action.payload.name;
      state.hash = action.payload.hash;
    },

    setCardsComplete(state, action: PayloadAction<boolean>) {
      state.cardsComplete = action.payload;
    },

    setLearningComplete(
      state,
      action: PayloadAction<{ complete: boolean; correctNumber: number }>
    ) {
      state.learningComplete = action.payload.complete;
      state.learnCorrectNumber = action.payload.correctNumber;
    },

    setTestComplete(
      state,
      action: PayloadAction<{ complete: boolean; correctNumber: number }>
    ) {
      state.testComplete = action.payload.complete;
      state.testCorrectNumber = action.payload.correctNumber;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.addStudentTask.matchFulfilled,
      (state, action) => {
        state.name = action.payload.name;
        state.hash = action.payload.hash;
        state.cardsComplete = action.payload.cardsComplete;
        state.learningComplete = action.payload.learningComplete;
        state.learnCorrectNumber = action.payload.learnCorrectNumber;
        state.testComplete = action.payload.testComplete;
        state.testCorrectNumber = action.payload.testCorrectNumber;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.getOneTask.matchFulfilled,
      (state, action) => {
        state.name = action.payload.name;
        state.hash = action.payload.hash;
        state.value = action.payload.value.map((card) => {
          return {
            id: card.id,
            rus: firstLetterToUppercase(card.rus),
            eng: firstLetterToUppercase(card.eng),
          };
        });
      }
    );
  },
});

export default CurrentTaskSlice.reducer;
export const {
  setCurrentTask,
  setCardsComplete,
  setLearningComplete,
  setTestComplete,
} = CurrentTaskSlice.actions;
