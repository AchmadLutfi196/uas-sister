/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';
import { Gender } from 'src/types/user.type';

@Injectable()
export class StudentService {
  constructor(private readonly validation: ValidationService) {}

  register(
    name: string,
    email: string,
    password: string,
    nim: string,
    tanggalLahir: Date,
    gender: Gender,
    programStudi: string,
    academicAdvisorId: number,
    fakultas?: string,
  ) {
    const schema = z.object({
      name: z.string().min(1).max(100),
      email: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
      nim: z.string().min(1).max(100),
      tanggalLahir: z.date(),
      gender: z.enum(['MAN', 'WOMAN']),
      programStudi: z.string().min(1).max(100),
      academicAdvisorId: z.number().min(1),
      fakultas: z.string().min(1).max(100).optional(),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      nim,
      tanggalLahir,
      gender,
      programStudi,
      academicAdvisorId,
      fakultas,
    });
  }

  login(identifier: string, password: string) {
    const schema = z.object({
      identifier: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
    });

    return this.validation.validate(schema, { identifier, password });
  }

  update(
    name?: string,
    email?: string,
    password?: string,
    telephone?: string,
  ) {
    const schema = z.object({
      name: z.string().max(100).optional(),
      email: z.string().max(100).optional(),
      password: z.string().max(100).optional(),
      telephone: z.string().max(100).optional(),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      telephone,
    });
  }
}
