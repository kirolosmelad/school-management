import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { PaginationInput } from 'src/shared/inputs/pagination.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...createLessonInput,
      id: uuid(),
    });

    return await this.lessonRepository.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ where: { id } });
  }

  async getAllLessons(paginationInput: PaginationInput): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      take: paginationInput.size,
      skip: (paginationInput.page - 1) * paginationInput.size,
    });
  }
}
