/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AbsensiResponse, StatusKehadiran } from 'src/types/absensi.type';
import { AbsensiService as AbsensiValidationService } from 'src/validation/absensi/absensi.service';

@Injectable()
export class AbsensiService {
  constructor(
    private readonly absensiService: AbsensiValidationService,
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
  ) {}

  async register(
    scheduleId: number,
    pertemuan: number,
    materi: string,
    keterangan?: string,
  ): Promise<AbsensiResponse> {
    const requestRegister = this.absensiService.register(
      scheduleId,
      pertemuan,
      materi,
      keterangan,
    );

    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        scheduleId: scheduleId,
      },
    });

    const pertemuanCheck = await this.prismaService.absensi.findMany({
      where: {
        pertemuan: requestRegister.pertemuan,
        scheduleId: requestRegister.scheduleId,
      },
    });

    if (pertemuanCheck.length > 0) {
      throw new ErrorService(400, 'Absensi already exists');
    }

    const studentsId = enrollments.map((enrollment) => enrollment.studentId);

    const absensiData = studentsId.map((studentId) => ({
      studentId,
      scheduleId: requestRegister.scheduleId,
      statusKehadiran: StatusKehadiran.ALPA,
      pertemuan: requestRegister.pertemuan,
      materi: requestRegister.materi,
      keterangan: requestRegister.keterangan,
    }));

    await this.prismaService.absensi.createMany({
      data: absensiData,
    });

    const createdAbsensi = await this.prismaService.absensi.findMany({
      where: {
        scheduleId: requestRegister.scheduleId,
        pertemuan: requestRegister.pertemuan,
      },
    });

    return {
      status: 201,
      message: 'Absensi created successfully',
      data: createdAbsensi,
    };
  }

  async update(
    studentId: number,
    scheduleId: number,
    statusKehadiran: StatusKehadiran,
    pertemuan: number,
    materi?: string,
    keterangan?: string,
  ): Promise<AbsensiResponse> {
    const requestUpdate = this.absensiService.update(
      studentId,
      scheduleId,
      statusKehadiran,
      pertemuan,
      materi,
      keterangan,
    );

    const absensiId = await this.prismaService.absensi.findFirst({
      where: {
        studentId: requestUpdate.studentId,
        scheduleId: requestUpdate.scheduleId,
        pertemuan: requestUpdate.pertemuan,
      },
      select: {
        id: true,
      },
    });

    if (!absensiId) {
      throw new ErrorService(404, 'Absensi not found');
    }

    let absensi;
    if (requestUpdate.statusKehadiran) {
      absensi = await this.prismaService.absensi.update({
        where: {
          id: absensiId.id,
        },
        data: {
          statusKehadiran: requestUpdate.statusKehadiran,
        },
      });
    }

    if (requestUpdate.materi) {
      absensi = await this.prismaService.absensi.update({
        where: {
          id: absensiId.id,
        },
        data: {
          materi: requestUpdate.materi,
        },
      });
    }

    if (requestUpdate.keterangan) {
      absensi = await this.prismaService.absensi.update({
        where: {
          id: absensiId.id,
        },
        data: {
          keterangan: requestUpdate.keterangan,
        },
      });
    }

    return {
      status: 201,
      message: 'Absensi updated successfully',
      data: absensi,
    };
  }

  async getAbseensiByPertemuan(
    pertemuan: number,
    scheduleId: number,
  ): Promise<AbsensiResponse> {
    const absensi = await this.prismaService.absensi.findMany({
      where: {
        pertemuan: Number(pertemuan),
        scheduleId: Number(scheduleId),
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        schedule: {
          include: {
            course: true,
          },
        },
      },
    });

    if (absensi.length === 0) {
      throw new ErrorService(404, 'No absensi found');
    }

    return {
      status: 200,
      message: 'Get absensi by pertemuan successfully',
      data: absensi,
    };
  }

  async getAbsensiByScheduleId(scheduleId: number): Promise<AbsensiResponse> {
    const groupedAbsensi = await this.prismaService.absensi.groupBy({
      by: ['pertemuan', 'statusKehadiran'],
      where: {
        scheduleId: Number(scheduleId),
      },
      _count: {
        _all: true,
      },
      _min: {
        materi: true,
        createAt: true,
      },
    });

    if (groupedAbsensi.length === 0) {
      throw new ErrorService(404, 'No absensi found');
    }

    // Mengelompokkan kembali hasil berdasarkan pertemuan
    const formattedData = groupedAbsensi.reduce((acc, group) => {
      const { pertemuan, statusKehadiran, _count } = group;
      const existingPertemuan = acc.find(
        (item) => item.pertemuan === pertemuan,
      );

      if (existingPertemuan) {
        existingPertemuan.statusCounts.push({
          statusKehadiran,
          count: _count._all,
          materi: group._min.materi,
          createAt: group._min.createAt,
        });
      } else {
        acc.push({
          pertemuan,
          statusCounts: [
            {
              statusKehadiran,
              count: _count._all,
              materi: group._min.materi,
              createAt: group._min.createAt,
            },
          ],
        });
      }

      return acc;
    }, []);

    return {
      status: 200,
      message:
        'Get absensi grouped by pertemuan and statusKehadiran successfully',
      data: formattedData,
    };
  }

  async getStudentAbsensi(
    student: Student,
    scheduleId: number,
  ): Promise<AbsensiResponse> {
    const absensi = await this.prismaService.absensi.findMany({
      where: {
        studentId: student.id,
        scheduleId: Number(scheduleId),
      },
    });

    if (absensi.length === 0) {
      throw new ErrorService(404, 'No absensi found');
    }

    return {
      status: 200,
      message: 'Get absensi by student id and schedule id successfully',
      data: absensi,
    };
  }

  async updateByTeacher(
    studentId: number,
    scheduleId: number,
    pertemuan: number,
    statusKehadiran: StatusKehadiran,
  ): Promise<AbsensiResponse> {
    const absensi = await this.prismaService.absensi.findFirst({
      where: {
        AND: [
          { studentId: Number(studentId) },
          { scheduleId: Number(scheduleId) },
          { pertemuan: Number(pertemuan) },
        ],
      },
    });

    if (!absensi) {
      throw new ErrorService(404, 'Absensi not found');
    }

    await this.prismaService.absensi.update({
      where: {
        id: absensi.id,
      },
      data: {
        statusKehadiran: statusKehadiran,
      },
    });

    return {
      status: 201,
      message: 'Absensi updated successfully',
      data: absensi,
    };
  }
}
