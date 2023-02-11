import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true, // save schema in memory and re-generate it everytime we start app
      driver: ApolloDriver,
    }),
    LessonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
