/* eslint-disable prettier/prettier */

import { Course } from '@prisma/client';

export interface CourseResponse {
  status: number;
  message: string;
  data?: Course | Course[];
}

export enum Semester {
  SEMESTER_1 = 'semester_1',
  SEMESTER_2 = 'semester_2',
  SEMESTER_3 = 'semester_3',
  SEMESTER_4 = 'semester_4',
  SEMESTER_5 = 'semester_5',
  SEMESTER_6 = 'semester_6',
  SEMESTER_7 = 'semester_7',
  SEMESTER_8 = 'semester_8',
}
