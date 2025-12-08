/* eslint-disable prettier/prettier */
import { Pengumuman } from "@prisma/client";

export interface AnnouncementsResponse {
    status: number;
    message: string;
    data: Pengumuman | Pengumuman[];
}
