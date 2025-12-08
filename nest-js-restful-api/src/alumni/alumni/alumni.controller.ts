/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniResponse } from 'src/types/alumni.type';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import { AlumniRequestCreate, AlumniResponseCreate, AlumniResponseGetAll } from '../model/alumni.model';

@ApiTags('Alumni')
@Controller('/api/alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Alumni' })
  @ApiHeader(RequestHeader)
  @ApiBody(AlumniRequestCreate)
  @ApiResponse(AlumniResponseCreate)
  async create(
    @Body('studentId') studentId: number,
    @Body('tanggalLulus') tanggalLulus: Date,
  ): Promise<AlumniResponse> {
    return await this.alumniService.create(studentId, tanggalLulus);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Alumni' })
  // @ApiHeader(RequestHeader)
  // @ApiBody(AlumniRequestCreate)
  // @ApiResponse(AlumniResponseCreate)
  async update(@Body('id') id: number): Promise<AlumniResponse> {
    return await this.alumniService.update(id);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Alumni' })
  // @ApiHeader(RequestHeader)
  // @ApiBody(AlumniRequestCreate)
  // @ApiResponse(AlumniResponseCreate)
  async delete(@Param('id') id: number): Promise<AlumniResponse> {
    return await this.alumniService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Alumni' })
  @ApiHeader(RequestHeader)
  @ApiResponse(AlumniResponseGetAll)
  async getAllAlumni(): Promise<AlumniResponse> {
    return await this.alumniService.getAllAlumni();
  }
}
