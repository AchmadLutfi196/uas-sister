/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { TeacherService as TeacherValidationService } from 'src/validation/teacher/teacher.service';
import { v4 as uuid } from 'uuid';
import { Teacher, User } from '@prisma/client';
import { Gender, UserResponse } from 'src/types/user.type';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly TeacherValidationService: TeacherValidationService,
  ) { }

  async register(
    name: string,
    email: string,
    password: string,
    nip: string,
    tanggalLahir: Date,
    gender: Gender,
    fakultas?: string,
    userLogin?: User,
  ): Promise<UserResponse> {
    const requestRegister = this.TeacherValidationService.register(
      name,
      email,
      password,
      nip,
      new Date(tanggalLahir),
      gender,
      fakultas
    );

    const userCount = await this.prismaService.user.count({
      where: {
        email: requestRegister.email,
      },
    });

    if (userCount !== 0) {
      throw new ErrorService(400, 'Email already exists');
    }

    const nipCount = await this.prismaService.teacher.count({
      where: {
        nip: requestRegister.nip,
      },
    });

    if (nipCount !== 0) {
      throw new ErrorService(400, 'NIP already exists');
    }

    requestRegister.password = await this.prismaService.hashPassword(
      requestRegister.password,
    );

    const user = await this.prismaService.user.create({
      data: {
        name: requestRegister.name,
        email: requestRegister.email,
        password: requestRegister.password,
        tanggalLahir: requestRegister.tanggalLahir,
        gender: requestRegister.gender,
        role: 'TEACHER',
        teacher: {
          create: {
            nip: requestRegister.nip,
            fakultas: requestRegister.fakultas,
          },
        },
      },
    });

    if (userLogin) {
      await this.prismaService.log.create({
        data: {
          userId: userLogin.id,
          action: 'Register Teacher By Admin',
        },
      });
    } else {
      await this.prismaService.log.create({
        data: {
          userId: user.id,
          action: 'Self Register Teacher',
        },
      });
    }

    return {
      status: 201,
      message: 'User created successfully',
      data: user,
    };
  }

  async login(nip: string, password: string): Promise<UserResponse> {
    const requestLogin = this.TeacherValidationService.login(nip, password);

    let user = await this.prismaService.user.findFirst({
      where: {
        teacher: {
          nip: requestLogin.nip,
        },
      },
    });

    if (!user) {
      throw new ErrorService(400, 'NIP or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(400, 'NIP or password is wrong');
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
        action: 'Login Teacher',
      },
    });

    return {
      status: 200,
      message: 'User logged in successfully',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const teacher = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Logout Teacher',
      },
    });

    return {
      status: 200,
      message: 'Logout success',
      data: teacher,
    };
  }

  async getTeachers(): Promise<UserResponse> {
    const teachers = await this.prismaService.user.findMany({
      where: {
        role: 'TEACHER',
      },
      include: {
        teacher: true,
      },
    });

    if (!teachers) {
      throw new ErrorService(404, 'Teachers not found');
    }

    return {
      status: 200,
      message: 'Teachers retrieved successfully',
      data: teachers,
    };
  }

  async update(
    user: User,
    teacher: Teacher,
    name?: string,
    email?: string,
    password?: string,
    gelar?: string,
    keahlian?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.TeacherValidationService.update(
      name,
      email,
      password,
      gelar,
      keahlian,
    );

    if (requestUpdate.name) {
      user.name = requestUpdate.name;
    }

    if (requestUpdate.email) {
      user.email = requestUpdate.email;
    }

    if (requestUpdate.password) {
      user.password = await this.prismaService.hashPassword(
        requestUpdate.password,
      );
    }

    if (requestUpdate.gelar) {
      teacher.gelar = requestUpdate.gelar;
    }

    if (requestUpdate.keahlian) {
      teacher.keahlian = requestUpdate.keahlian;
    }

    const updatedTeacher = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        teacher: {
          update: {
            gelar: teacher.gelar,
            keahlian: teacher.keahlian,
          },
        },
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Update Teacher By Admin',
      },
    });

    return {
      status: 201,
      message: 'User updated successfully',
      data: updatedTeacher,
    };
  }

  async delete(id: number, user: User): Promise<UserResponse> {
    const teacher = await this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });

    if (!teacher) {
      throw new ErrorService(404, 'Teacher not found');
    }

    await this.prismaService.teacher.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Delete Teacher By Admin',
      },
    });

    return {
      status: 201,
      message: 'Success delete teacher',
    };
  }

  async getTeacher(user: User): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        teacher: {
          include: {
            schedules: {
              include: {
                course: true,
              }
            },
            students: {
              include: {
                enrollments: true,
                user: true
              }
            }
          }
        },
      },
    });

    if (!teacher) {
      throw new ErrorService(404, 'Teacher not found');
    }

    return {
      status: 200,
      message: 'Success get teacher',
      data: teacher,
    };
  }
}
