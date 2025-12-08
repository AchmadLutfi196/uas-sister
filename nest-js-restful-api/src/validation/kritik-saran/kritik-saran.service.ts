/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

@Injectable()
export class KritikSaranService {
  constructor(private readonly validation: ValidationService) {}

  create(name: string, email: string, pesan: string) {
    const schema = z.object({
      name: z.string().min(1).max(100),
      email: z.string().min(1).max(100),
      pesan: z.string().min(1).max(1000),
    });
    return this.validation.validate(schema, { name, email, pesan });
  }

  update(id: number, pesan?: string) {
    const schema = z.object({
      id: z.number(),
      pesan: z.string().min(1).max(1000).optional(),
    });
    return this.validation.validate(schema, { id, pesan });
  }
}
