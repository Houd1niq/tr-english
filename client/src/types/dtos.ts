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
