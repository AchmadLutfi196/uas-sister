/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';
import { NilaiEvaluasi } from 'src/types/evaluation.type';

@Injectable()
export class EvaluationService {
  constructor(private readonly validation: ValidationService) {}

  create(enrollmentId: number, nilai: NilaiEvaluasi, komentar?: string) {
    const schema = z.object({
      enrollmentId: z.number(),
      nilai: z.enum([
        NilaiEvaluasi.S,
        NilaiEvaluasi.A,
        NilaiEvaluasi.B,
        NilaiEvaluasi.C,
        NilaiEvaluasi.D,
      ]),
      komentar: z.string().optional(),
    });

    return this.validation.validate(schema, { enrollmentId, nilai, komentar });
  }
}
