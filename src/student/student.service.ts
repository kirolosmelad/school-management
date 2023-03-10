import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './inputs/create-student.input';
import { PaginationInput } from 'src/shared/inputs/pagination.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = this.studentRepository.create({
      ...createStudentInput,
      id: uuid(),
    });

    return await this.studentRepository.save(student);
  }

  async getStudents(paginationInput: PaginationInput): Promise<Student[]> {
    return await this.studentRepository.find({
      take: paginationInput.size,
      skip: (paginationInput.page - 1) * paginationInput.size,
    });
  }

  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async getAllStudentsByIds(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }
}
