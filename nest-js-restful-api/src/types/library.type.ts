/* eslint-disable prettier/prettier */
import { Library } from "@prisma/client";

export interface LibraryResponse {
    status: number;
    message: string;
    data?: Library | Library[];
}