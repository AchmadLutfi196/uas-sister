/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { PembayaranResponse } from 'src/types/pembayaran.type';
import { GetStudent } from 'src/decorators/student.decorator';
import { Student, User } from '@prisma/client';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PembayaranRequestCreate,
  PembayaranResponseConfirm,
  PembayaranResponseCreate,
  PembayaranResponseGetStudent,
} from '../model/pembayaran.model';
import { RequestHeader } from 'src/model/x-api-token.model';
import { Semester } from 'src/types/course.type';
import { GetUser } from 'src/decorators/user.decorator';

@ApiTags('Pembayaran')
@Controller('/api/pembayaran')
export class PembayaranController {
  constructor(private readonly pembayaranService: PembayaranService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiBody(PembayaranRequestCreate)
  @ApiResponse(PembayaranResponseCreate)
  async create(
    @Body('total') total: number,
    @Body('semester') semester: Semester,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.create(total, semester);
  }

  @Patch('/confirm/:semester')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Confirm Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'semester' })
  @ApiResponse(PembayaranResponseConfirm)
  async confirm(
    @Param('semester') semester: Semester,
    @GetStudent() student: Student,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.confirm(semester, student);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Pembayaran' })
  @ApiHeader(RequestHeader)
  @ApiResponse(PembayaranResponseGetStudent)
  async getPembayaranStudent(
    @GetStudent() student: Student,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.getPembayaranStudent(student);
  }

  @Get('/admin')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getAllPaymentsSuccess(
    @GetUser() user: User,
  ): Promise<PembayaranResponse> {
    return await this.pembayaranService.getAllPaymentsSuccess(user);
  }
}
