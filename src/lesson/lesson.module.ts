import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  // Resolvers are treated as providers not controllers in nestjs
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
