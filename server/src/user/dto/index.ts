import { IsNotEmpty, IsString } from 'class-validator';

type CardValue = {
  rus: string;
  eng: string;
  id: string;
};

export class TaskDto {
  value: CardValue[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
