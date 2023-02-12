import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './inputs/create-student.input';
import { Inject, ParseUUIDPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { PaginationInput } from 'src/shared/inputs/pagination.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => [StudentType])
  students(@Args('pagination') paginationInput: PaginationInput) {
    return this.studentService.getStudents(paginationInput);
  }

  @Query((returns) => StudentType, { nullable: true }) // nullable will return null if student is not exist
  studentById(@Args('id', ParseUUIDPipe) id: string) {
    return this.studentService.getStudentById(id);
  }
}
