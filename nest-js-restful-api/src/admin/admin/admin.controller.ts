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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { UserResponse, Role } from 'src/types/user.type';
import {
  AdminRequestDeleteUser,
  AdminRequestGetStudentId,
  AdminRequestGetStudentName,
  AdminRequestGetTeacherId,
  AdminRequestGetTeacherName,
  AdminRequestLogin,
  AdminRequestRegister,
  AdminRequestUpdate,
  AdminRequestUpdateUser,
  AdminResponseDeleteUser,
  AdminResponseDetail,
  AdminResponseGetStudentId,
  AdminResponseGetStudentName,
  AdminResponseGetTeacherId,
  AdminResponseGetTeacherName,
  AdminResponseLogin,
  AdminResponseLogout,
  AdminResponseRegister,
  AdminResponseUpdate,
  AdminResponseUpdateUser,
  AdminResponseUsers,
} from '../model/admin.model';
import { RequestHeader } from 'src/model/x-api-token.model';

@ApiTags('Admin')
@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiHeader(RequestHeader)
  @ApiBody(AdminRequestRegister)
  @ApiResponse(AdminResponseRegister)
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @GetUser() user?: User,
  ): Promise<UserResponse> {
    return await this.adminService.register(name, email, password, user);
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody(AdminRequestLogin)
  @ApiResponse(AdminResponseLogin)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserResponse> {
    return await this.adminService.login(email, password);
  }

  @Patch('/logout')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout a user' })
  @ApiHeader(RequestHeader)
  @ApiResponse(AdminResponseLogout)
  async logout(@GetUser() user: User): Promise<UserResponse> {
    return await this.adminService.logout(user);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiHeader(RequestHeader)
  @ApiBody(AdminRequestUpdate)
  @ApiResponse(AdminResponseUpdate)
  async update(
    @GetUser() user: User,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
  ): Promise<UserResponse> {
    return await this.adminService.update(user, name, email, password);
  }

  @Patch('/user')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update another user by admin' })
  @ApiHeader(RequestHeader)
  @ApiBody(AdminRequestUpdateUser)
  @ApiResponse(AdminResponseUpdateUser)
  async updateUser(
    @Body('id') id: number,
    @Body('role') role: Role,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('password') password?: string,
    @GetUser() user?: User,
  ): Promise<UserResponse> {
    return await this.adminService.updateUser(
      id,
      role,
      name,
      email,
      password,
      user,
    );
  }

  @Delete('/user')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete a user by admin' })
  @ApiHeader(RequestHeader)
  @ApiBody(AdminRequestDeleteUser)
  @ApiResponse(AdminResponseDeleteUser)
  async deleteUser(
    @Body('id') id: number,
    @Body('role') role: Role,
    @GetUser() user: User,
  ): Promise<UserResponse> {
    return await this.adminService.deleteUser(id, role, user);
  }

  @Get('/students')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get students by name' })
  @ApiHeader(RequestHeader)
  @ApiQuery(AdminRequestGetStudentName)
  @ApiResponse(AdminResponseGetStudentName)
  async getStudentByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getStudentByName(name);
  }

  @Get('/teachers')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get teachers by name' })
  @ApiHeader(RequestHeader)
  @ApiQuery(AdminRequestGetTeacherName)
  @ApiResponse(AdminResponseGetTeacherName)
  async getTeacherByName(@Query('name') name: string): Promise<UserResponse> {
    return await this.adminService.getTeacherByName(name);
  }

  @Get('/students/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiHeader(RequestHeader)
  @ApiParam(AdminRequestGetStudentId)
  @ApiResponse(AdminResponseGetStudentId)
  async getStudent(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getStudent(id);
  }

  @Get('/teachers/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get teacher by ID' })
  @ApiHeader(RequestHeader)
  @ApiParam(AdminRequestGetTeacherId)
  @ApiResponse(AdminResponseGetTeacherId)
  async getTeacher(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getTeacher(id);
  }

  @Get('/users')
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader(RequestHeader)
  @ApiResponse(AdminResponseUsers)
  async getUsers(): Promise<UserResponse> {
    return await this.adminService.getUsers();
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiHeader(RequestHeader)
  @ApiResponse(AdminResponseDetail)
  async getAdminDetail(@GetUser() user: User): Promise<UserResponse> {
    return await this.adminService.getAdminDetail(user);
  }

  @Get('user/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiHeader(RequestHeader)
  async getUserById(@Param('id') id: number): Promise<UserResponse> {
    return await this.adminService.getUserById(id);
  }
}
