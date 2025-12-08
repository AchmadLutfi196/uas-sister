/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidationService } from '../validation/validation.service';
import { Semester } from 'src/types/course.type';

@Injectable()
export class PembayaranService {
  constructor(private readonly validation: ValidationService) {}

  create(
    total: number,
    semester: Semester,
  ) {
    const schema = z.object({
      total: z.number().min(1),
      semester: z.enum([
        Semester.SEMESTER_1,
        Semester.SEMESTER_2,
        Semester.SEMESTER_3,
        Semester.SEMESTER_4,
        Semester.SEMESTER_5,
        Semester.SEMESTER_6,
        Semester.SEMESTER_7,
        Semester.SEMESTER_8
      ])
    });

    return this.validation.validate(schema, {
      total,
      semester
    });
  }
}
