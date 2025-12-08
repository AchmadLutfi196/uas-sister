/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Admin, Student, Teacher, User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

interface UserRequest extends Request {
  user: User;
  admin: Admin;
  teacher: Teacher;
  student: Student;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) { }

  async use(req: UserRequest, res: Response, next: () => void) {
    const excludeRoutes = [
      '/api/user/login',
      '/api/student/register',
      '/api/student/login',
      '/api/teacher/register',
      '/api/teacher/login',
      '/api/admin/register',
      '/api/admin/login',
      '/api/berita',
      '/api/kritikSaran/create',
      '/api/alumni',
    ];

    // Skip OPTIONS preflight requests for CORS
    if (req.method === 'OPTIONS') {
      return next();
    }

    if (!req.path.startsWith('/api')) {
      return next();
    }

    if (excludeRoutes.includes(req.path)) {
      return next();
    }

    const token = req.get('X-API-TOKEN');

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
        include: {
          Admin: true,
          teacher: true,
          student: true,
        },
      });

      if (user && user.role === 'ADMIN') {
        req.user = user;
        req.admin = user.Admin;
        next();
        return;
      }

      if (user && user.role === 'TEACHER') {
        req.user = user;
        req.teacher = user.teacher;
        next();
        return;
      }

      if (user && user.role === 'STUDENT') {
        req.user = user;
        req.student = user.student;
        next();
        return;
      }
    }

    res
      .status(401)
      .json({
        errors: 'Unauthorized',
      })
      .end();
  }
}
