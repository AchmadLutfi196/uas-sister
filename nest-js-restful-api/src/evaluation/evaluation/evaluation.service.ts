/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EvaluationResponse, NilaiEvaluasi } from 'src/types/evaluation.type';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { EvaluationService as EvaluationValidationService } from 'src/validation/evaluation/evaluation.service';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly evaluationValidationService: EvaluationValidationService,
  ) {}

  async create(
    enrollmentId: number,
    nilai: NilaiEvaluasi,
    komentar?: string,
  ): Promise<EvaluationResponse> {
    const requestCreate = this.evaluationValidationService.create(
      enrollmentId,
      nilai,
      komentar,
    );

    const evaluation = await this.prismaService.evaluasiDosen.create({
      data: {
        enrollmentId: requestCreate.enrollmentId,
        nilai: requestCreate.nilai,
        komentar: requestCreate.komentar,
      },
    });

    return {
      status: 201,
      message: 'Evaluation created successfully',
      data: evaluation,
    };
  }

  async getEvaluations(): Promise<EvaluationResponse> {
    const evaluations = await this.prismaService.evaluasiDosen.findMany({
      include: {
        enrollment: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
            schedule: {
              include: {
                absensi: true,
                course: true,
                teacher: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      status: 200,
      message: 'Evaluations fetched successfully',
      data: evaluations,
    };
  }

  async getEvaluationByScheduleId(
    scheduleId: number,
  ): Promise<EvaluationResponse> {
    const evaluation = await this.prismaService.evaluasiDosen.findMany({
      where: {
        enrollment: {
          scheduleId: Number(scheduleId),
        },
      },
      include: {
        enrollment: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
            schedule: {
              include: {
                absensi: true,
                course: true,
                teacher: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  
    if (evaluation.length === 0) {
      throw new ErrorService(404, 'Evaluation not found');
    }

    return {
      status: 200,
      message: 'Evaluation fetched successfully',
      data: evaluation,
    };
  }

  async getEvaluation(enrollmentId: number): Promise<EvaluationResponse> {
    const evaluation = await this.prismaService.evaluasiDosen.findMany({
      where: {
        enrollmentId: Number(enrollmentId),
      },
      include: {
        enrollment: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
            schedule: {
              include: {
                absensi: true,
                course: true,
                teacher: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (evaluation.length === 0) {
      throw new ErrorService(404, 'Evaluation not found');
    }
    return {
      status: 200,
      message: 'Evaluation fetched successfully',
      data: evaluation,
    };
  }
}
