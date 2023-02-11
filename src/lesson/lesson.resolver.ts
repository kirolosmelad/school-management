import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
// will treated as provider not controllers
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'koko',
      name: 'Database',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
