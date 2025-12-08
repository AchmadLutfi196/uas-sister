/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';

export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

export enum Gender {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}
