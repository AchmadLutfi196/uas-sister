/* eslint-disable prettier/prettier */
import { Log } from "@prisma/client";

export interface LogResponse {
    status: number;
    message: string;
    data?: Log | Log[];
}