/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { AdminService as AdminValidationService } from 'src/validation/admin/admin.service';
import { Role, UserResponse } from 'src/types/user.type';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly AdminValidationService: AdminValidationService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    userLogin?: User,
  ): Promise<UserResponse> {
    const requestRegister = this.AdminValidationService.register(
      name,
      email,
      password,
    );

    const userCount = await this.prismaService.user.count({
      where: {
        email: requestRegister.email,
      },
    });

    if (userCount !== 0) {
      throw new ErrorService(400, 'Email already exists');
    }

    requestRegister.password = await this.prismaService.hashPassword(
      requestRegister.password,
    );

    const user = await this.prismaService.user.create({
      data: {
        name: requestRegister.name,
        email: requestRegister.email,
        password: requestRegister.password,
        role: 'ADMIN',
        Admin: {
          create: {},
        },
      },
    });

    await this.prismaService.log.create({
      data: {
        userId: userLogin.id,
        action: 'Register New Admin By Admin',
      },
    });

    return {
      status: 201,
      message: 'Register success',
      data: user,
    };
  }

  async login(email: string, password: string): Promise<UserResponse> {
    const requestLogin = this.AdminValidationService.login(email, password);

    let user = await this.prismaService.user.findUnique({
      where: {
        email: requestLogin.email,
      },
    });

    if (!user) {
      throw new ErrorService(404, 'Email or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(404, 'Email or password is wrong');
    }

    user = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      status: 200,
      message: 'Login success',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const admin = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    return {
      status: 200,
      message: 'Logout success',
      data: admin,
    };
  }

  async update(
    user: User,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.AdminValidationService.update(
      name,
      email,
      password,
    );

    const admin = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (requestUpdate.name) {
      admin.name = requestUpdate.name;
    }

    if (requestUpdate.email) {
      admin.email = requestUpdate.email;
    }

    if (requestUpdate.password) {
      admin.password = await this.prismaService.hashPassword(
        requestUpdate.password,
      );
    }

    const adminUpdated = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: admin,
    });

    return {
      status: 201,
      message: 'Update success',
      data: adminUpdated,
    };
  }

  async updateUser(
    id: number,
    role: Role,
    name?: string,
    email?: string,
    password?: string,
    userLogin?: User,
  ): Promise<UserResponse> {
    const requestUpdate = this.AdminValidationService.updateUser(
      id,
      role,
      name,
      email,
      password,
    );

    if (requestUpdate.role === Role.TEACHER) {
      const teacher = await this.prismaService.user.findUnique({
        where: {
          id: requestUpdate.id,
        },
      });

      if (!teacher) {
        throw new ErrorService(404, 'Teacher not found');
      }

      let teacherUpdated: User;

      if (requestUpdate.name) {
        teacherUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            name: requestUpdate.name,
          },
        });
      }

      if (requestUpdate.email) {
        teacherUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            email: requestUpdate.email,
          },
        });
      }

      if (requestUpdate.password) {
        teacherUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            password: await this.prismaService.hashPassword(
              requestUpdate.password,
            ),
          },
        });
      }

      await this.prismaService.log.create({
        data: {
          userId: userLogin.id,
          action: 'Update Teacher By Admin',
        },
      });

      return {
        status: 201,
        message: 'Success update teacher',
        data: teacherUpdated,
      };
    } else if (requestUpdate.role === Role.STUDENT) {
      const student = await this.prismaService.user.findUnique({
        where: {
          id: requestUpdate.id,
        },
      });

      if (!student) {
        throw new ErrorService(404, 'Student not found');
      }

      let studentUpdated: User;

      if (requestUpdate.name) {
        studentUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            name: requestUpdate.name,
          },
        });
      }

      if (requestUpdate.email) {
        studentUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            email: requestUpdate.email,
          },
        });
      }

      if (requestUpdate.password) {
        studentUpdated = await this.prismaService.user.update({
          where: {
            id: requestUpdate.id,
          },
          data: {
            password: await this.prismaService.hashPassword(
              requestUpdate.password,
            ),
          },
        });
      }

      await this.prismaService.log.create({
        data: {
          userId: userLogin.id,
          action: 'Update Student By Admin',
        },
      });

      return {
        status: 201,
        message: 'Success update student',
        data: studentUpdated,
      };
    }
  }

  async deleteUser(
    id: number,
    role: Role,
    userLogin?: User,
  ): Promise<UserResponse> {
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
        role: role,
      },
    });

    if (!user) {
      throw new ErrorService(404, 'User not found');
    }

    await this.prismaService.log.create({
      data: {
        userId: userLogin.id,
        action: 'Delete User By Admin',
      },
    });

    return {
      status: 201,
      message: 'Success delete user',
      data: user,
    };
  }

  async getStudentByName(name: string): Promise<UserResponse> {
    const student = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
        role: 'STUDENT',
      },
    });

    if (student.length === 0) {
      throw new ErrorService(404, 'Student not found');
    }

    return {
      status: 200,
      message: 'Success get student',
      data: student,
    };
  }

  async getTeacherByName(name: string): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
        role: 'TEACHER',
      },
    });

    if (teacher.length === 0) {
      throw new ErrorService(404, 'Teacher not found');
    }

    return {
      status: 200,
      message: 'Success get teacher',
      data: teacher,
    };
  }

  async getStudent(id: number): Promise<UserResponse> {
    const student = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
        role: 'STUDENT',
      },
      include: {
        student: true,
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

  async getTeacher(id: number): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
        role: 'TEACHER',
      },
      include: {
        teacher: true,
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

  async getUsers(): Promise<UserResponse> {
    const user = await this.prismaService.user.findMany({
      where: {
        NOT: {
          role: 'ADMIN',
        },
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (user.length === 0) {
      throw new ErrorService(404, 'User not found');
    }

    return {
      status: 200,
      message: 'Success to get user',
      data: user,
    };
  }

  async getAdminDetail(user: User): Promise<UserResponse> {
    const admin = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        Admin: true,
      },
    });

    if (!admin) {
      throw new ErrorService(404, 'Admin not found');
    }

    return {
      status: 200,
      message: 'Success get admin',
      data: admin,
    };
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new ErrorService(404, 'User not found');
    }

    return {
      status: 200,
      message: 'Success get user',
      data: user,
    };
  }
}
