import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';

@Module({
  // Resolvers are treated as providers not controllers in nestjs
  providers: [LessonResolver],
})
export class LessonModule {}
