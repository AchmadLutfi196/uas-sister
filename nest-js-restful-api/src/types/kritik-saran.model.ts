/* eslint-disable prettier/prettier */
import { KritikSaran } from "@prisma/client";

export enum KritikSaranType {
  KRITIK = 'KRITIK',
  SARAN = 'SARAN',
}

export interface KritikSaranResponse {
  status: number;
  message: string;
  data?: KritikSaran | KritikSaran[];
};