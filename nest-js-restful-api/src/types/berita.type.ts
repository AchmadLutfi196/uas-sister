/* eslint-disable prettier/prettier */
import { Berita } from "@prisma/client";

export interface BeritaResponse {
    status: number;
    message: string;
    data?: Berita | Berita[];
}