import { IsNotEmpty, IsString } from 'class-validator';

type CardValue = {
  rus: string;
  eng: string;
  id: string;
};

export class UpdateStudentTaskDto {
  @IsNotEmpty()
  @IsString()
  hash: string;

  cardsComplete?: boolean;

  learningComplete?: boolean;

  learnCorrectNumber?: number;

  testComplete?: boolean;

  testCorrectNumber?: number;
}

export class StudentTaskDto {
  @IsNotEmpty()
  @IsString()
  hash: string;
}

export class TaskDto {
  value: CardValue[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
