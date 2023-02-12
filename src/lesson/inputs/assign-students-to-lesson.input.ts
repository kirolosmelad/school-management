import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @Field((type) => ID)
  @IsUUID('4')
  lessonId: string;

  @Field((type) => [ID])
  @IsUUID('4', { each: true })
  studentIds: string[];
}
