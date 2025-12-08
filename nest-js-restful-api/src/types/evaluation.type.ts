/* eslint-disable prettier/prettier */
import { EvaluasiDosen } from '@prisma/client';
export interface EvaluationResponse {
  status: number;
  message: string;
  data?: EvaluasiDosen | EvaluasiDosen[];
}

export enum NilaiEvaluasi {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
