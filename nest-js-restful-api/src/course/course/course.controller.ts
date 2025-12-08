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
import { CourseService } from './course.service';
import { CourseResponse, Semester } from 'src/types/course.type';
import {
  CourseRequestCreate,
  CourseRequestDelete,
  CourseRequestGetCourse,
  CourseRequestGetCoursesByName,
  CourseRequestUpdate,
  CourseResponseCreate,
  CourseResponseDelete,
  CourseResponseGetCourse,
  CourseResponseGetCourses,
  CourseResponseGetCoursesByName,
  CourseResponseUpdate,
} from '../model/course.model';
import { RequestHeader } from 'src/model/x-api-token.model';

@ApiTags('Course')
@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiHeader(RequestHeader)
  @ApiBody(CourseRequestCreate)
  @ApiResponse(CourseResponseCreate)
  async create(
    @Body('name') name: string,
    @Body('code') code: string,
    @Body('sks') sks: number,
    @Body('semester') semester: Semester,
    @Body('programStudi') programStudi: string,
    @Body('fakultas') fakultas?: string,
  ): Promise<CourseResponse> {
    return await this.courseService.create(
      name,
      code,
      sks,
      semester,
      programStudi,
      fakultas
    );
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update course' })
  @ApiHeader(RequestHeader)
  @ApiBody(CourseRequestUpdate)
  @ApiResponse(CourseResponseUpdate)
  async update(
    @Body('code') code: string,
    @Body('name') name?: string,
    @Body('sks') sks?: number,
    @Body('semester') semester?: Semester,
    @Body('programStudi') programStudi?: string,
    @Body('isActive') isActive?: boolean,
  ): Promise<CourseResponse> {
    return this.courseService.update(
      code,
      name,
      sks,
      semester,
      programStudi,
      isActive
    );
  }

  @Delete('/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete course' })
  @ApiHeader(RequestHeader)
  @ApiParam(CourseRequestDelete)
  @ApiResponse(CourseResponseDelete)
  async delete(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.delete(code);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all courses' })
  @ApiHeader(RequestHeader)
  @ApiResponse(CourseResponseGetCourses)
  async getCourses(): Promise<CourseResponse> {
    return await this.courseService.getCourses();
  }

  @Get('/detail/:code')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get course by code' })
  @ApiHeader(RequestHeader)
  @ApiParam(CourseRequestGetCourse)
  @ApiResponse(CourseResponseGetCourse)
  async getCourse(@Param('code') code: string): Promise<CourseResponse> {
    return await this.courseService.getCourse(code);
  }

  @Get('/search')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get course by name' })
  @ApiHeader(RequestHeader)
  @ApiQuery(CourseRequestGetCoursesByName)
  @ApiResponse(CourseResponseGetCoursesByName)
  async getCourseByName(@Query('name') name: string): Promise<CourseResponse> {
    return await this.courseService.getCourseByName(name);
  }
}
