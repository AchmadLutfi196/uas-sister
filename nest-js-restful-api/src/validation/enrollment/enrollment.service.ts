/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class EnrollmentService {
  constructor(private readonly validation: ValidationService) {}

  register(studentId: number, schedulesId: number[]) {
    const schema = z.object({
      studentId: z.number().min(1),
      schedulesId: z.array(z.number().min(1)),
    });

    return this.validation.validate(schema, { studentId, schedulesId });
  }

  delete(studentId: number, scheduleId: number[]) {
    const schema = z.object({
      studentId: z.number().min(1),
      scheduleId: z.array(z.number().min(1)),
    });

    return this.validation.validate(schema, { studentId, scheduleId });
  }
}
