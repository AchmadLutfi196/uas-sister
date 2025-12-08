/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentResponse } from 'src/types/enrollment.type';
import { RequestHeader } from 'src/model/x-api-token.model';
import {
  EnrollmentRequestDelete,
  EnrollmentRequestRegister,
  EnrollmentResponseDelete,
  EnrollmentResponseGetStudentEnrollments,
  EnrollmentResponseRegister,
} from '../model/enrollment.model';
import { GetStudent } from 'src/decorators/student.decorator';
import { Grade, Student } from '@prisma/client';

@ApiTags('Enrollment')
@Controller('/api/enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register many course for student' })
  @ApiHeader(RequestHeader)
  @ApiBody(EnrollmentRequestRegister)
  @ApiResponse(EnrollmentResponseRegister)
  async register(
    @GetStudent() student: Student,
    @Body('scheduleId') scheduleId: number[],
  ): Promise<EnrollmentResponse> {
    return await this.enrollmentService.register(student, scheduleId);
  }

  @Delete()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete many course for student' })
  @ApiHeader(RequestHeader)
  @ApiBody(EnrollmentRequestDelete)
  @ApiResponse(EnrollmentResponseDelete)
  async delete(
    @GetStudent() student: Student,
    @Body('scheduleId') scheduleId: number[],
  ): Promise<EnrollmentResponse> {
    return await this.enrollmentService.delete(student, scheduleId);
  }

  @Get()
  @Header('content-type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get enrollment student' })
  @ApiHeader(RequestHeader)
  @ApiResponse(EnrollmentResponseGetStudentEnrollments)
  async getEnrollments(
    @GetStudent() student: Student,
  ): Promise<EnrollmentResponse> {
    return await this.enrollmentService.getEnrollments(student);
  }

  @Get('/:scheduleId')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get enrollment student' })
  @ApiHeader(RequestHeader)
  // @ApiResponse(EnrollmentResponseGetStudentEnrollments)
  async getEnrollment(
    @GetStudent() student: Student,
    @Param('scheduleId') scheduleId: number,
  ): Promise<EnrollmentResponse> {
    return await this.enrollmentService.getEnrollment(student, scheduleId);
  }

  @Post('/grade')
  @Header('Content-type', 'application/json')
  @HttpCode(201)
  async addGrade(
    @Body('id') id: number,
    @Body('grade') grade: Grade,
  ): Promise<EnrollmentResponse> {
    return await this.enrollmentService.addGrade(id, grade);
  }

  @Get('student/:studentId')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get enrollment student' })
  @ApiHeader(RequestHeader)
  @ApiResponse(EnrollmentResponseGetStudentEnrollments)
  async getEnrollmentByStudentId(@Param('studentId') studentId: number) {
    return await this.enrollmentService.getEnrollmentByStudentId(studentId);
  }

  @Post('/validation')
  @Header('content-type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Validation enrollment student' })
  @ApiHeader(RequestHeader)
  @ApiResponse(EnrollmentResponseGetStudentEnrollments)
  async validation(
    @Body('studentId') studentId: number,
    @Body('scheduleId') scheduleId: number,
  ) {
    return await this.enrollmentService.validation(studentId, scheduleId);
  }
}
