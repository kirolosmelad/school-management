import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsString()
  @MinLength(3)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(3)
  lastName: string;
}
