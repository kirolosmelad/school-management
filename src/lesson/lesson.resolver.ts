import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { PaginationInput } from 'src/shared/inputs/pagination.input';
import { AssignStudentsToLessonInput } from './inputs/assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver((of) => LessonType)
// will treated as provider not controllers
export class LessonResolver {
  constructor(
    @Inject(LessonService) private readonly lessonService: LessonService,
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @Query((returns) => LessonType, { nullable: true })
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

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }

  // method name == name of field we try to resolve
  // in lessons , when you try to resolve field called "students" then run this function
  // whatever this function returns its the result of that field
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this.studentService.getAllStudentsByIds(lesson.students);
  }
}
