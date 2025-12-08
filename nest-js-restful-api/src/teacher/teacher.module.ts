/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
