/* eslint-disable prettier/prettier */

import { Enrollment } from '@prisma/client';

export interface EnrollmentResponse {
  status: number;
  message: string;
  data?: Enrollment | Enrollment[];
}
