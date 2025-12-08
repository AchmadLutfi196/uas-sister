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
import { ScheduleService } from './schedule.service';
import { DayOfWeek, ScheduleResponse } from 'src/types/schedule.type';
import { RequestHeader } from 'src/model/x-api-token.model';
import {
  ScheduleRequestCreate,
  ScheduleRequestDelete,
  ScheduleRequestUpdate,
  ScheduleResponseCreate,
  ScheduleResponseDelete,
  ScheduleResponseGetAll,
  ScheduleResponseGetBySemester,
  ScheduleResponseUpdate,
} from '../model/schedule.model';
import { Semester } from 'src/types/course.type';

@ApiTags('Schedule')
@Controller('/api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Schedule' })
  @ApiHeader(RequestHeader)
  @ApiBody(ScheduleRequestCreate)
  @ApiResponse(ScheduleResponseCreate)
  async create(
    @Body('courseId') courseId: number,
    @Body('day') day: DayOfWeek,
    @Body('time') time: string,
    @Body('room') room: string,
    @Body('teacherId') teacherId: number,
  ): Promise<ScheduleResponse> {
    return await this.scheduleService.create(courseId, day, time, room, teacherId);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Schedule' })
  @ApiHeader(RequestHeader)
  @ApiBody(ScheduleRequestUpdate)
  @ApiResponse(ScheduleResponseUpdate)
  async update(
    @Body('id') id: number,
    @Body('day') day?: DayOfWeek,
    @Body('time') time?: string,
    @Body('room') room?: string,
    @Body('teacherId') teacherId?: number,
  ): Promise<ScheduleResponse> {
    return await this.scheduleService.update(id, day, time, room, teacherId);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete schedule' })
  @ApiHeader(RequestHeader)
  @ApiParam(ScheduleRequestDelete)
  @ApiResponse(ScheduleResponseDelete)
  async delete(@Param('id') id: number): Promise<ScheduleResponse> {
    return await this.scheduleService.delete(id);
  }

  @Get('/semester/:semester')
  @Header('Content-Type', 'application/json') 
  @HttpCode(200)
  @ApiOperation({ summary: 'Get schedules by semester' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'semester', enum: Semester })
  @ApiResponse(ScheduleResponseGetBySemester)
  async getSchedulesBySemester(
    @Param('semester') semester: Semester,
  ): Promise<ScheduleResponse> {
    return await this.scheduleService.getSchedulesBySemester(semester);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiHeader(RequestHeader)
  @ApiResponse(ScheduleResponseGetAll)
  async getSchedules(): Promise<ScheduleResponse> {
    return await this.scheduleService.getSchedules();
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get schedule by id' })
  @ApiHeader(RequestHeader)
  @ApiParam(ScheduleRequestDelete)
  @ApiResponse(ScheduleResponseGetAll)
  async getSchedule(@Param('id') id: number): Promise<ScheduleResponse> {
    return await this.scheduleService.getSchedule(id);
  }
}
