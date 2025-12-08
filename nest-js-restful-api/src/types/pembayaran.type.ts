/* eslint-disable prettier/prettier */
import { Pembayaran } from '@prisma/client';

export interface PembayaranResponse {
  status: number;
  message: string;
  data?: Pembayaran | Pembayaran[];
}

export enum JenisPembayaran {
  BANK = 'BANK',
  EWALLET = 'EWALLET',
}

export enum StatusPembayaran {
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}
