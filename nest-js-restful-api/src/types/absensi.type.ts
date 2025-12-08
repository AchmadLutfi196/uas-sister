/* eslint-disable prettier/prettier */

import { Absensi } from "@prisma/client";

export interface AbsensiResponse {
  status: number;
  message: string;
  data: Absensi | Absensi[];
}

export enum StatusKehadiran {
  HADIR = 'HADIR',
  ALPA = 'ALPA',
  SAKIT = 'SAKIT',
  IZIN = 'IZIN',
}