import { CardValue } from "../Pages/CreateTaskPage";

export type RegisterDto = {
  login: string;
  password: string;
  name: string;
  role: string;
};
export type LoginDto = {
  login: string;
  password: string;
};

export interface TaskDto {
  value: CardValue[];
  name: string;
  hash: string;
}

export interface UpdateStudentTaskDto {
  hash: string;
  cardsComplete?: boolean;
  learningComplete?: boolean;
  learnCorrectNumber?: number;
  testComplete?: boolean;
  testCorrectNumber?: number;
}

export interface StudentTaskDto {
  name: string;
  hash: string;
  cardsComplete: boolean;
  learningComplete: boolean;
  learnCorrectNumber: number;
  testComplete: boolean;
  testCorrectNumber: number;
}
