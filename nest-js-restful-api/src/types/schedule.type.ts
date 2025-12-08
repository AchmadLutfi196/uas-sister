/* eslint-disable prettier/prettier */
import { Schedule } from "@prisma/client";

export interface ScheduleResponse {
  status: number;
  message: string;
  data?: Schedule | Schedule[];
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}
