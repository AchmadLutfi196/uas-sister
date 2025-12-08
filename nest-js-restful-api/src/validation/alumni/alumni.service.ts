/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class AlumniService {
  constructor(private readonly validation: ValidationService) {}

  create(studentId: number, tanggalLulus: Date) {
    const schema = z.object({
      studentId: z.number().min(1),
      tanggalLulus: z.date(),
    });

    return this.validation.validate(schema, { studentId, tanggalLulus });
  }
}
