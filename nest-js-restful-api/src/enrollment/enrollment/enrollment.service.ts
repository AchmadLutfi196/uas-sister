/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Grade, Student } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { EnrollmentResponse } from 'src/types/enrollment.type';
import { EnrollmentService as EnrollmentValidationService } from 'src/validation/enrollment/enrollment.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly EnrollmentValidationService: EnrollmentValidationService,
  ) {}

  async register(
    student: Student,
    schedulesId: number[],
  ): Promise<EnrollmentResponse> {
    const requestRegister = this.EnrollmentValidationService.register(
      student.id,
      schedulesId,
    );

    const createEnrollments = await this.prismaService.enrollment.createMany({
      data: schedulesId.map((scheduleId) => ({
        studentId: requestRegister.studentId,
        scheduleId: scheduleId,
      })),
    });

    await this.prismaService.schedule.updateMany({
      where: {
        id: { in: requestRegister.schedulesId },
      },
      data: {
        kouta: {
          decrement: 1,
        },
      },
    });

    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: requestRegister.studentId,
      },
      include: {
        student: true,
        schedule: {
          include: {
            course: true,
          },
        },
      },
    });

    await this.prismaService.student.update({
      where: {
        id: requestRegister.studentId,
      },
      data: {
        sksOFSemester: enrollments
          .map((enrollment) => enrollment.schedule.course.sks)
          .reduce((a, b) => a + b, 0),
        sks: enrollments
          .map((enrollment) => enrollment.schedule.course.sks)
          .reduce((a, b) => a + b, 0),
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: student.userId,
        action: 'Add Course',
      },
    });

    return {
      status: 201,
      message: 'Success register course',
      data: enrollments,
    };
  }

  async delete(
    student: Student,
    scheduleId: number[],
  ): Promise<EnrollmentResponse> {
    const requestDelete = this.EnrollmentValidationService.delete(
      student.id,
      scheduleId,
    );

    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: requestDelete.studentId,
        scheduleId: { in: requestDelete.scheduleId },
      },
      include: {
        student: true,
        schedule: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!enrollments) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    await this.prismaService.schedule.updateMany({
      where: {
        id: { in: scheduleId },
      },
      data: {
        kouta: {
          increment: 1,
        },
      },
    });

    await this.prismaService.student.update({
      where: {
        id: student.id,
      },
      data: {
        sksOFSemester: {
          decrement: enrollments
            .map((enrollment) => enrollment.schedule.course.sks)
            .reduce((a, b) => a + b, 0),
        },
        sks: {
          decrement: enrollments
            .map((enrollment) => enrollment.schedule.course.sks)
            .reduce((a, b) => a + b, 0),
        },
      },
    });

    await this.prismaService.enrollment.deleteMany({
      where: {
        studentId: requestDelete.studentId,
        scheduleId: { in: requestDelete.scheduleId },
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: student.userId,
        action: 'Delete Course',
      },
    });

    return {
      status: 201,
      message: 'Success delete enrollments',
    };
  }

  async getEnrollments(student: Student): Promise<EnrollmentResponse> {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        schedule: {
          include: {
            teacher: {
              include: {
                user: true,
              },
            },
            course: true,
          },
        },
      },
    });

    if (!enrollments) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    return {
      status: 200,
      message: 'Success get enrollments',
      data: enrollments,
    };
  }

  async getEnrollment(
    student: Student,
    scheduleId: number,
  ): Promise<EnrollmentResponse> {
    const enrollment = await this.prismaService.enrollment.findFirst({
      where: {
        studentId: student.id,
        scheduleId: Number(scheduleId),
      },
      include: {
        schedule: {
          include: {
            enrollments: true,
            teacher: {
              include: {
                user: true,
              },
            },
            course: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    return {
      status: 200,
      message: 'Success get enrollment',
      data: enrollment,
    };
  }

  async addGrade(id: number, grade: Grade): Promise<EnrollmentResponse> {
    const enrollment = await this.prismaService.enrollment.update({
      where: {
        id: Number(id),
      },
      data: {
        grade: grade,
      },
    });

    return {
      status: 201,
      message: 'Success upadate grade',
      data: enrollment,
    };
  }

  async getEnrollmentByStudentId(
    studentId: number,
  ): Promise<EnrollmentResponse> {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId: Number(studentId),
      },
      include: {
        student: {
          include: {
            user: true
          }
        },
        schedule: {
          include: {
            teacher: {
              include: {
                user: true,
              },
            },
            course: true,
          },
        },
      },
    });

    return {
      status: 200,
      message: 'Success get enrollments',
      data: enrollments,
    };
  }

  async validation(
    studentId: number,
    scheduleId: number,
  ): Promise<EnrollmentResponse> {
    const enrollment = await this.prismaService.enrollment.findFirst({
      where: {
        studentId: Number(studentId),
        scheduleId: Number(scheduleId),
      },
    });

    if (!enrollment) {
      throw new ErrorService(404, 'Enrollment not found');
    }

    const enrollmentUpdated = await this.prismaService.enrollment.update({
      where: {
        id: Number(enrollment.id),
      },
      data: {
        isValidated: !enrollment.isValidated,
      },
    });

    return {
      status: 201,
      message: 'Success validate enrollment',
      data: enrollmentUpdated,
    };
  }
}
