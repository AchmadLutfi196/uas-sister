/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

enum StatusKehadiran {
  HADIR = 'HADIR',
  ALPA = 'ALPA',
  SAKIT = 'SAKIT',
  IZIN = 'IZIN',
}

@Injectable()
export class AbsensiService {
  constructor(private readonly ValidationService: ValidationService) {}

  register(
    scheduleId: number,
    pertemuan: number,
    materi: string,
    keterangan?: string,
  ) {
    const schema = z.object({
      scheduleId: z.number().min(1),
      pertemuan: z.number().min(1),
      materi: z.string(),
      keterangan: z.string().optional(),
    });

    return this.ValidationService.validate(schema, {
      scheduleId,
      pertemuan,
      materi,
      keterangan,
    });
  }

  update(
    studentId: number,
    scheduleId: number,
    statusKehadiran: StatusKehadiran,
    pertemuan: number,
    materi?: string,
    keterangan?: string,
  ) {
    const schema = z.object({
      studentId: z.number().min(1),
      scheduleId: z.number().min(1),
      statusKehadiran: z.enum(['HADIR', 'ALPA', 'SAKIT', 'IZIN']),
      pertemuan: z.number().min(1),
      materi: z.string().optional(),
      keterangan: z.string().optional(),
    });

    return this.ValidationService.validate(schema, {
      studentId,
      scheduleId,
      statusKehadiran,
      pertemuan,
      materi,
      keterangan,
    });
  }

  delete(studentId: number, scheduleId: number) {
    const schema = z.object({
      studentId: z.number().min(1),
      scheduleId: z.number().min(1),
    });

    return this.ValidationService.validate(schema, { studentId, scheduleId });
  }
}
