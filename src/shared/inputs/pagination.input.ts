import { Field, InputType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field()
  @IsInt()
  @Min(1)
  page: number;

  @Field()
  @IsInt()
  @Min(1)
  size: number;
}
