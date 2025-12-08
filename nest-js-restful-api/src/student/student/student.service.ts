/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { StudentService as StudentValidationService } from 'src/validation/student/student.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { Gender, UserResponse } from 'src/types/user.type';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly StudentValidationService: StudentValidationService,
  ) { }

  async register(
    name: string,
    email: string,
    password: string,
    nim: string,
    tanggalLahir: Date,
    gender: Gender,
    programStudi: string,
    academicAdvisorId: number,
    fakultas?: string,
    userLogin?: User,
  ): Promise<UserResponse> {
    const requestRegister = this.StudentValidationService.register(
      name,
      email,
      password,
      nim,
      new Date(tanggalLahir),
      gender,
      programStudi,
      academicAdvisorId,
      fakultas,
    );

    const userCount = await this.prismaService.user.count({
      where: {
        email: requestRegister.email,
      },
    });

    if (userCount !== 0) {
      throw new ErrorService(400, 'Email already exists');
    }

    const nimCount = await this.prismaService.student.count({
      where: {
        nim: requestRegister.nim,
      },
    });

    if (nimCount !== 0) {
      throw new ErrorService(400, 'NIM already exists');
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
        role: 'STUDENT',
        student: {
          create: {
            nim: requestRegister.nim,
            programStudi: requestRegister.programStudi,
            statusStudent: 'ACTIVE',
            academicAdvisorId: requestRegister.academicAdvisorId,
            fakultas: requestRegister.fakultas,
          },
        },
      },
    });

    if (userLogin) {
      await this.prismaService.log.create({
        data: {
          userId: userLogin.id,
          action: 'Register Student By Admin',
        },
      });
    } else {
      await this.prismaService.log.create({
        data: {
          userId: user.id,
          action: 'Self Register Student',
        },
      });
    }

    return {
      status: 201,
      message: 'Student registered successfully',
      data: user,
    };
  }

  async login(identifier: string, password: string): Promise<UserResponse> {
    const requestLogin = this.StudentValidationService.login(identifier, password);

    // Try to find user by NIM first, then by email
    let user = await this.prismaService.user.findFirst({
      where: {
        student: {
          nim: requestLogin.identifier,
        },
      },
    });

    // If not found by NIM, try to find by email
    if (!user) {
      user = await this.prismaService.user.findFirst({
        where: {
          email: requestLogin.identifier,
          role: 'STUDENT',
        },
      });
    }

    if (!user) {
      throw new ErrorService(400, 'NIM/Email or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(400, 'NIM or password is wrong');
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
        action: 'Login Student',
      },
    });

    return {
      status: 200,
      message: 'Student logged in successfully',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const student = await this.prismaService.user.update({
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
        action: 'Logout Student',
      },
    });

    return {
      status: 200,
      message: 'Logout success',
      data: student,
    };
  }

  async getStudents(): Promise<UserResponse> {
    const students = await this.prismaService.user.findMany({
      where: {
        role: 'STUDENT',
      },
      include: {
        student: true,
      },
    });

    if (students.length === 0) {
      throw new ErrorService(404, 'Students not found');
    }

    return {
      status: 200,
      message: 'Students retrieved successfully',
      data: students,
    };
  }

  async update(
    user: User,
    name?: string,
    email?: string,
    password?: string,
    telephone?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.StudentValidationService.update(
      name,
      email,
      password,
      telephone,
    );

    const student = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (requestUpdate.name) {
      student.name = requestUpdate.name;
    }

    if (requestUpdate.email) {
      student.email = requestUpdate.email;
    }

    if (requestUpdate.password) {
      student.password = await this.prismaService.hashPassword(
        requestUpdate.password,
      );
    }

    if (requestUpdate.telephone) {
      student.telephone = requestUpdate.telephone;
    }

    const studentUpdated = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: student,
    });

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Update Student By Admin',
      },
    });

    return {
      status: 201,
      message: 'Student updated successfully',
      data: studentUpdated,
    };
  }

  async delete(id: number, user: User): Promise<UserResponse> {
    const { count } = await this.prismaService.user.deleteMany({
      where: {
        id: id,
      },
    });

    if (count === 0) {
      throw new ErrorService(404, 'Student not found');
    }

    await this.prismaService.log.create({
      data: {
        userId: user.id,
        action: 'Delete Student By Admin',
      },
    });

    return {
      status: 201,
      message: 'Success delete student',
    };
  }

  async getStudent(user: User): Promise<UserResponse> {
    const student = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        student: {
          include: {
            advisor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new ErrorService(404, 'Student not found');
    }

    return {
      status: 200,
      message: 'Success get student',
      data: student,
    };
  }
}
