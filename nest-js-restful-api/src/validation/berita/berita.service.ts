/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class BeritaService {
  constructor(private readonly validationService: ValidationService) {}

  create(judul: string, konten: string, gambar?: string) {
    const schema = z.object({
      judul: z.string().min(1).max(100),
      konten: z.string().min(1).max(1000),
      gambar: z.string().optional(),
    });
    return this.validationService.validate(schema, { judul, konten, gambar });
  }

  update(
    id: number,
    judul?: string,
    konten?: string,
    gambar?: string,
  ) {
    const schema = z.object({
      id: z.number(),
      judul: z.string().min(1).max(100).optional(),
      konten: z.string().min(1).max(1000).optional(),
      gambar: z.string().optional(),
    });
    return this.validationService.validate(schema, { id, judul, konten, gambar });
  }
}
