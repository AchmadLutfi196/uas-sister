/* eslint-disable prettier/prettier */
import { Alumni } from "@prisma/client";

export interface AlumniResponse {
    status: number;
    message: string;
    data?: Alumni | Alumni[];
}