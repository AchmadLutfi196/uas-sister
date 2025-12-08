/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
