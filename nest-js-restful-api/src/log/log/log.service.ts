/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LogResponse } from 'src/types/log.type';

@Injectable()
export class LogService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
  ) {}

  async getLogs(user: User): Promise<LogResponse> {
    if (user.role !== 'ADMIN') {
      throw new ErrorService(401, 'You are not admin');
    }

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const logs = await this.prismaService.log.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: {
        user: true,
      },
    });

    if (logs.length === 0) {
      throw new ErrorService(404, 'Logs not found for today');
    }

    return {
      status: 200,
      message: 'Success get logs for today',
      data: logs,
    };
  }
}
