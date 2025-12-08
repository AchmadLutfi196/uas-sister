/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AlumniResponse } from 'src/types/alumni.type';
import { AlumniService as AlumniValidationService } from 'src/validation/alumni/alumni.service';

@Injectable()
export class AlumniService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly alumniValidationService: AlumniValidationService,
  ) {}

  async create(studentId: number, tanggalLulus: Date): Promise<AlumniResponse> {
    const requestCreate = this.alumniValidationService.create(
      studentId,
      new Date(tanggalLulus),
    );

    const alumniCount = await this.prismaService.alumni.count({
      where: {
        studentId: requestCreate.studentId,
      },
    });

    if (alumniCount > 0) {
      throw new ErrorService(400, 'Alumni already exists');
    }

    const alumni = await this.prismaService.alumni.create({
      data: {
        studentId: requestCreate.studentId,
        tanggalLulus: requestCreate.tanggalLulus,
      },
    });

    return {
      status: 201,
      message: 'Alumni created successfully',
      data: alumni,
    };
  }

  async update(
    id: number,
    studentId?: number,
    tanggalLulus?: Date,
  ): Promise<AlumniResponse> {
    const alumni = await this.prismaService.alumni.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!alumni) {
      throw new ErrorService(404, 'Alumni not found');
    }

    const alumniUpdated = await this.prismaService.alumni.update({
      where: {
        id: alumni.id,
      },
      data: {
        studentId: studentId || alumni.studentId,
        tanggalLulus: new Date(tanggalLulus) || alumni.tanggalLulus,
      },
    });

    return {
      status: 201,
      message: 'Alumni updated successfully',
      data: alumniUpdated,
    };
  }

  async delete(id: number): Promise<AlumniResponse> {
    const alumni = await this.prismaService.alumni.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      status: 201,
      message: 'Alumni deleted successfully',
      data: alumni,
    };
  }

  async getAllAlumni(): Promise<AlumniResponse> {
    const alumni = await this.prismaService.alumni.findMany();

    return {
      status: 200,
      message: 'Get all alumni successfully',
      data: alumni,
    };
  }
}
