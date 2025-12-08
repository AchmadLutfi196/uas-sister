/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Injectable()
export class ScheduleService {
  constructor(private readonly validation: ValidationService) {}

  create(
    courseId: number,
    day: DayOfWeek,
    time: string,
    room: string,
    teacherId: number,
  ) {
    const schema = z.object({
      courseId: z.number().min(1),
      day: z.enum([
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY,
      ]),
      time: z.string().min(1).max(100),
      room: z.string().min(1).max(100),
      teacherId: z.number().min(1),
    });

    return this.validation.validate(schema, { courseId, day, time, room, teacherId });
  }

  update(
    id: number,
    day: DayOfWeek,
    time: string,
    room: string,
    teacherId: number,
  ) {
    const schema = z.object({
      id: z.number().min(1).optional(),
      day: z.enum([
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
        DayOfWeek.SUNDAY,
      ]).optional(),
      time: z.string().min(1).max(100).optional(),
      room: z.string().min(1).max(100).optional(),
      teacherId: z.number().min(1).optional(),
    });

    return this.validation.validate(schema, { id, day, time, room, teacherId });
  }
}
