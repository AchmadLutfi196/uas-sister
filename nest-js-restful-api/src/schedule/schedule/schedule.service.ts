/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Semester } from 'src/types/course.type';
import { DayOfWeek, ScheduleResponse } from 'src/types/schedule.type';
import { ScheduleService as ScheduleValidationService } from 'src/validation/schedule/schedule.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly ScheduleValidationService: ScheduleValidationService,
  ) {}

  async create(
    courseId: number,
    day: DayOfWeek,
    time: string,
    room: string,
    teacherId: number,
  ): Promise<ScheduleResponse> {
    const requestCreate = this.ScheduleValidationService.create(
      courseId,
      day,
      time,
      room,
      teacherId,
    );

    const schedule = await this.prismaService.schedule.create({
      data: {
        courseId: requestCreate.courseId,
        teacherId: requestCreate.teacherId,
        day: requestCreate.day,
        time: requestCreate.time,
        room: requestCreate.room,
      },
    });

    // await this.prismaService.log.create({
    //   data: {
    //     userId: schedule.userId,
    //     action: 'Create Schedule By Admin',
    //   },
    // });

    return {
      status: 201,
      message: 'Schedule created successfully',
      data: schedule,
    };
  }

  async update(
    id: number,
    day?: DayOfWeek,
    time?: string,
    room?: string,
    teacherId?: number,
  ): Promise<ScheduleResponse> {
    const requestUpdate = this.ScheduleValidationService.update(
      id,
      day,
      time,
      room,
      teacherId,
    );

    const shcedule = await this.prismaService.schedule.findUnique({
      where: {
        id: requestUpdate.id,
      },
    });

    if (requestUpdate.day) {
      shcedule.day = requestUpdate.day;
    }

    if (requestUpdate.time) {
      shcedule.time = requestUpdate.time;
    }

    if (requestUpdate.room) {
      shcedule.room = requestUpdate.room;
    }

    if (requestUpdate.teacherId) {
      shcedule.teacherId = requestUpdate.teacherId;
    }

    const update = await this.prismaService.schedule.update({
      where: {
        id: requestUpdate.id,
      },
      data: shcedule,
    });

    return {
      status: 201,
      message: 'Schedule updated successfully',
      data: update,
    };
  }

  async delete(id: number): Promise<ScheduleResponse> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new ErrorService(404, 'Schedule not found');
    }

    await this.prismaService.schedule.deleteMany({
      where: {
        id: schedule.id,
      },
    });

    return {
      status: 201,
      message: 'Schedule deleted successfully',
    };
  }

  async getSchedulesBySemester(semeser: Semester): Promise<ScheduleResponse> {
    const schedles = await this.prismaService.schedule.findMany({
      where: {
        course: {
          semester: semeser,
        },
      },
      include: {
        course: {
          include: {
            schedule: true,
          },
        },
      },
    });

    if (schedles.length === 0) {
      throw new ErrorService(404, 'Schedule not found');
    }

    return {
      status: 200,
      message: 'Success get schedules by semester',
      data: schedles,
    };
  }

  async getSchedules(): Promise<ScheduleResponse> {
    const schedules = await this.prismaService.schedule.findMany({
      where: {
        course: {
          isActive: true,
        }
      },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        enrollments: true,
        course: true,
      },
    });

    if (!schedules || schedules.length === 0) {
      throw new ErrorService(404, 'Schedule not found');
    }

    return {
      status: 200,
      message: 'Success get schedules',
      data: schedules,
    };
  }

  async getSchedule(id: number): Promise<ScheduleResponse> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        enrollments: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
        course: true,
      },
    });

    if (!schedule) {
      throw new ErrorService(404, 'Schedule not found');
    }

    return {
      status: 200,
      message: 'Success get schedule',
      data: schedule,
    };
  }
}
