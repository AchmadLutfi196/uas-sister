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
import { TeacherService } from './teacher.service';
import { Teacher, User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { Gender, UserResponse } from 'src/types/user.type';
import {
  TeacherRequestDelete,
  TeacherRequestLogin,
  TeacherRequestRegister,
  TeacherRequestUpdate,
  TeacherResponseDelete,
  TeacherResponseGetTeacher,
  TeacherResponseGetTeachers,
  TeacherResponseLogin,
  TeacherResponseLogout,
  TeacherResponseRegister,
  TeacherResponseUpdate,
} from '../model/teacher.model';
import { RequestHeader } from 'src/model/x-api-token.model';
import { GetTeacher } from 'src/decorators/teacher.decorator';

@ApiTags('Teacher')
@Controller('/api/teacher')
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register Teacher' })
  @ApiBody(TeacherRequestRegister)
  @ApiResponse(TeacherResponseRegister)
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nip') nip: string,
    @Body('tanggalLahir') tanggalLahir: Date,
    @Body('gender') gender: Gender,
    @Body('fakultas') fakultas?: string,
    @GetUser() user?: User
  ): Promise<UserResponse> {
    return await this.TeacherService.register(
      name,
      email,
      password,
      nip,
      tanggalLahir,
      gender,
      fakultas,
      user
    );
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login Teacher' })
  @ApiBody(TeacherRequestLogin)
  @ApiResponse(TeacherResponseLogin)
  async login(
    @Body('nip') nip: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.TeacherService.login(nip, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout teacher' })
  @ApiHeader(RequestHeader)
  @ApiResponse(TeacherResponseLogout)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.TeacherService.logout(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Teachers' })
  @ApiHeader(RequestHeader)
  @ApiResponse(TeacherResponseGetTeachers)
  async getTeachers(): Promise<UserResponse> {
    return await this.TeacherService.getTeachers();
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Teacher' })
  @ApiHeader(RequestHeader)
  @ApiBody(TeacherRequestUpdate)
  @ApiResponse(TeacherResponseUpdate)
  async update(
    @GetUser() user: User,
    @GetTeacher() teacher: Teacher,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
    @Body('gelar') gelar?: string,
    @Body('keahlian') keahlian?: string,
  ): Promise<UserResponse> {
    return await this.TeacherService.update(
      user,
      teacher,
      name,
      email,
      password,
      gelar,
      keahlian,
    );
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Teacher' })
  @ApiHeader(RequestHeader)
  @ApiParam(TeacherRequestDelete)
  @ApiResponse(TeacherResponseDelete)
  async delete(@Param('id') id: number, @GetUser() user: User): Promise<UserResponse> {
    return this.TeacherService.delete(id, user);
  }

  @Get('/detail')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Teacher detail after login' })
  @ApiHeader(RequestHeader)
  @ApiResponse(TeacherResponseGetTeacher)
  async getTeacher(@GetUser() user: User): Promise<UserResponse> {
    return this.TeacherService.getTeacher(user);
  }
}
