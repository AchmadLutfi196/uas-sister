/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class BeasiswaService {
  constructor(private readonly validation: ValidationService) {}

  register(nama: string, mulai: Date, akhir: Date, link: string, deskripsi?: string) {
    const schema = z.object({
      nama: z.string().min(1).max(100),
      mulai: z.date(),
      akhir: z.date(),
      link: z.string().min(1),
      deskripsi: z.string().optional(),
    });

    return this.validation.validate(schema, {
      nama,
      mulai,
      akhir,
      link,
      deskripsi,
    });
  }

  update(nama?: string, mulai?: Date, akhir?: Date, deskripsi?: string) {
    const schema = z.object({
      nama: z.string().min(1).max(100).optional(),
      mulai: z.date().optional(),
      akhir: z.date().optional(),
      deskripsi: z.string().optional(),
    });

    return this.validation.validate(schema, {
      nama,
      mulai,
      akhir,
      deskripsi,
    });
  }
}
