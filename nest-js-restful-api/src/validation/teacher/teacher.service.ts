/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';
import { Gender } from 'src/types/user.type';

@Injectable()
export class TeacherService {
  constructor(private readonly validation: ValidationService) {}

  register(
    name: string,
    email: string,
    password: string,
    nip: string,
    tanggalLahir: Date,
    gender: Gender,
    fakultas?: string
  ) {
    const schema = z.object({
      name: z.string().min(1).max(100),
      email: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
      nip: z.string().min(1).max(100),
      gelar: z.string().min(1).max(100).optional(),
      keahlian: z.string().min(1).max(100).optional(),
      tanggalLahir: z.date(),
      gender: z.enum(["MAN", "WOMAN"]),
      fakultas: z.string().min(1).max(100).optional(),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      nip,
      tanggalLahir,
      gender,
      fakultas
    });
  }

  login(nip: string, password: string) {
    const schema = z.object({
      nip: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
    });

    return this.validation.validate(schema, { nip, password });
  }

  update(
    name?: string,
    email?: string,
    password?: string,
    gelar?: string,
    keahlian?: string,
  ) {
    const schema = z.object({
      name: z.string().max(100).optional(),
      email: z.string().max(100).optional(),
      password: z.string().max(100).optional(),
      gelar: z.string().max(100).optional(),
      keahlian: z.string().max(100).optional(),
    });

    return this.validation.validate(schema, {
      name,
      email,
      password,
      gelar,
      keahlian,
    });
  }
}
