import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddToKnowledgeBaseItemDto {
  @IsString()
  @IsNotEmpty()
  rusWord: string;

  @IsString()
  @IsNotEmpty()
  engWord: string;
}

export class ChangeKnowledgeBaseItemDto {
  @IsString()
  @IsNotEmpty()
  rusWord: string;

  @IsString()
  @IsNotEmpty()
  engWord: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CheckKnowledgeBaseItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['correct', 'wrong'])
  isRight: 'correct' | 'wrong';
}
