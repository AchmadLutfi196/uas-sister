/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly validation: ValidationService) {}

  create(judul: string, konten: string) {
    const schema = z.object({
      judul: z.string().min(1).max(100),
      konten: z.string().min(1).max(1000),
    });
    return this.validation.validate(schema, { judul, konten });
  }

  update(judul?: string, konten?: string) {
    const schema = z.object({
      judul: z.string().max(100).optional(),
      konten: z.string().max(1000).optional(),
    });
    return this.validation.validate(schema, { judul, konten });
  }

  delete(id: number) {
    const schema = z.object({
      id: z.number(),
    });
    return this.validation.validate(schema, { id });
  }
}
