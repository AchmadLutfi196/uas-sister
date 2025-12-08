/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UserResponse } from 'src/types/user.type';
import { UserService as UserServiceValidationService } from 'src/validation/user/user.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly userServiceValidationService: UserServiceValidationService,
  ) {}

  async login(creadential: string, password: string): Promise<UserResponse> {
    const requestLogin = this.userServiceValidationService.login(
      creadential,
      password,
    );

    const server = await this.prismaService.serverStatus.findFirst();

    let user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: requestLogin.creadential },
          { student: { nim: requestLogin.creadential } },
          { teacher: { nip: requestLogin.creadential } },
        ],
      } as any,
    });

    if (user.role !== 'ADMIN' && server.isMaintenance) {
      throw new ErrorService(403, 'Server is under maintenance');
    }

    if (!user) {
      throw new ErrorService(404, 'Not valid creadential');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(404, 'Not valid creadential');
    }

    user = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Login',
      },
    });

    return {
      status: 200,
      message: 'Success login',
      data: user,
    };
  }
}
