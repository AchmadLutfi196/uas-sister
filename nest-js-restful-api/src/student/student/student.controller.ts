/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import {
  StudentRequestDelete,
  StudentRequestLogin,
  StudentRequestRegister,
  StudentRequestUpdate,
  StudentResponseDelete,
  StudentResponseGetStudent,
  StudentResponseGetStudents,
  StudentResponseLogin,
  StudentResponseLogout,
  StudentResponseRegister,
  StudentResponseUpdate,
} from '../model/student.model';
import { RequestHeader } from 'src/model/x-api-token.model';
import { Gender } from 'src/types/user.type';

interface UserResponse {
  status: number;
  message: string;
  data?: User | User[];
}

@ApiTags('Student')
@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register student' })
  @ApiBody(StudentRequestRegister)
  @ApiResponse(StudentResponseRegister)
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nim') nim: string,
    @Body('tanggalLahir') tanggalLahir: Date,
    @Body('gender') gender: Gender,
    @Body('programStudi') programStudi: string,
    @Body('academicAdvisorId') academicAdvisorId: number,
    @Body('fakultas') fakultas?: string,
    @GetUser() user?: User
  ): Promise<UserResponse> {
    return await this.studentService.register(
      name,
      email,
      password,
      nim,
      tanggalLahir,
      gender,
      programStudi,
      academicAdvisorId,
      fakultas,
      user
    );
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login student with NIM or Email' })
  @ApiBody(StudentRequestLogin)
  @ApiResponse(StudentResponseLogin)
  async login(
    @Body('identifier') identifier: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.studentService.login(identifier, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout student' })
  @ApiHeader(RequestHeader)
  @ApiResponse(StudentResponseLogout)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.studentService.logout(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all students' })
  @ApiHeader(RequestHeader)
  @ApiResponse(StudentResponseGetStudents)
  async getStudents(): Promise<UserResponse> {
    return await this.studentService.getStudents();
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update student' })
  @ApiHeader(RequestHeader)
  @ApiBody(StudentRequestUpdate)
  @ApiResponse(StudentResponseUpdate)
  async update(
    @GetUser() user: User,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
    @Body('telephone') telephone?: string,
  ): Promise<UserResponse> {
    return await this.studentService.update(
      user,
      name,
      email,
      password,
      telephone,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete student' })
  @ApiHeader(RequestHeader)
  @ApiParam(StudentRequestDelete)
  @ApiResponse(StudentResponseDelete)
  async delete(@Param('id') id: number, @GetUser() user: User): Promise<UserResponse> {
    return this.studentService.delete(id, user);
  }

  @Get('/detail')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Student detail after login' })
  @ApiHeader(RequestHeader)
  @ApiResponse(StudentResponseGetStudent)
  async getStudent(@GetUser() user: User): Promise<UserResponse> {
    return this.studentService.getStudent(user);
  }
}
