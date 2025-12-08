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
import { AbsensiService } from './absensi.service';
import { AbsensiResponse, StatusKehadiran } from 'src/types/absensi.type';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import {
  AbsensiRequestRegister,
  AbsensiRequestUpdate,
  AbsensiResponseRegister,
  AbsensiResponseUpdate,
} from '../model/absensi.model';
import { GetStudent } from 'src/decorators/student.decorator';
import { Student } from '@prisma/client';

@ApiTags('Absensi')
@Controller('/api/absensi')
export class AbsensiController {
  constructor(private readonly absensiService: AbsensiService) {}

  @Post('/register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register absensi' })
  @ApiHeader(RequestHeader)
  @ApiBody(AbsensiRequestRegister)
  @ApiResponse(AbsensiResponseRegister)
  async register(
    @Body('scheduleId') scheduleId: number,
    @Body('pertemuan') pertemuan: number,
    @Body('materi') materi: string,
    @Body('keterangan') keterangan?: string,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.register(
      scheduleId,
      pertemuan,
      materi,
      keterangan,
    );
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update absensi' })
  @ApiHeader(RequestHeader)
  @ApiBody(AbsensiRequestUpdate)
  @ApiResponse(AbsensiResponseUpdate)
  async update(
    @Body('studentId') studentId: number,
    @Body('scheduleId') scheduleId: number,
    @Body('statusKehadiran') statusKehadiran: StatusKehadiran,
    @Body('pertemuan') pertemuan: number,
    @Body('materi') materi?: string,
    @Body('keterangan') keterangan?: string,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.update(
      studentId,
      scheduleId,
      statusKehadiran,
      pertemuan,
      materi,
      keterangan,
    );
  }

  @Post('/pertemuan/detail')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get absensi by pertemuan' })
  @ApiHeader(RequestHeader)
  async getAbseensiByPertemuan(
    @Body('pertemuan') pertemuan: number,
    @Body('scheduleId') scheduleId: number,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.getAbseensiByPertemuan(pertemuan, scheduleId);
  }

  @Get('/:scheduleId')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get absensi by scheduleId' })
  @ApiHeader(RequestHeader)
  async getAbsensiByScheduleId(
    @Param('scheduleId') scheduleId: number,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.getAbsensiByScheduleId(scheduleId);
  }

  @Get('/student/:scheduleId')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get absensi by studentId and scheduleId' })
  @ApiHeader(RequestHeader)
  async getStudentAbsensi(
    @GetStudent() student: Student,
    @Param('scheduleId') scheduleId: number,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.getStudentAbsensi(student, scheduleId);
  }

  @Patch('/teacher')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update absensi by teacher' })
  @ApiHeader(RequestHeader)
  async updateByTeacher(
    @Body('studentId') studentId: number,
    @Body('scheduleId') scheduleId: number,
    @Body('pertemuan') pertemuan: number,
    @Body('statusKehadiran') statusKehadiran: StatusKehadiran,
  ): Promise<AbsensiResponse> {
    return await this.absensiService.updateByTeacher(
      studentId,
      scheduleId,
      pertemuan,
      statusKehadiran,
    );
  }
}
