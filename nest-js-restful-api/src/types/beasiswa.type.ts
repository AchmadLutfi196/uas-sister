/* eslint-disable prettier/prettier */
import { Beasiswa } from "@prisma/client";

export interface BeasiswaResponse {
    status: number;
    message: string;
    data?: Beasiswa | Beasiswa[];
}