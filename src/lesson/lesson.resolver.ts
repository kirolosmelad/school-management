import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { PaginationInput } from 'src/shared/inputs/pagination.input';

@Resolver((of) => LessonType)
// will treated as provider not controllers
export class LessonResolver {
  constructor(
    @Inject(LessonService) private readonly lessonService: LessonService,
  ) {}

  @Query((returns) => LessonType)
  lessonById(@Args('id', ParseUUIDPipe) id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => [LessonType])
  lessons(@Args('pagination') paginationInput: PaginationInput) {
    return this.lessonService.getAllLessons(paginationInput);
  }
}
