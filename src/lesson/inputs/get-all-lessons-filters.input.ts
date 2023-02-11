import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetAllLessonsFilters {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
