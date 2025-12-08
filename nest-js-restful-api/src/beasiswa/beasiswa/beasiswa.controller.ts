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
import { BeasiswaService } from './beasiswa.service';
import { BeasiswaResponse } from 'src/types/beasiswa.type';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestHeader } from 'src/model/x-api-token.model';
import {
  BeasiswaRequestRegister,
  BeasiswaRequestUpdate,
  BeasiswaResponseDelete,
  BeasiswaResponseGetAll,
  BeasiswaResponseRegister,
  BeasiswaResponseUpdate,
} from '../model/beasiswa.model';

@ApiTags('Beasiswa')
@Controller('/api/beasiswa')
export class BeasiswaController {
  constructor(private readonly beasiswaService: BeasiswaService) {}

  @Post('register')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register beasiswa' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeasiswaRequestRegister)
  @ApiResponse(BeasiswaResponseRegister)
  async register(
    @Body('name') name: string,
    @Body('mulai') mulai: Date,
    @Body('akhir') akhir: Date,
    @Body('link') link: string,
    @Body('deskripsi') deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    return await this.beasiswaService.register(
      name,
      mulai,
      akhir,
      link,
      deskripsi,
    );
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update beasiswa' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeasiswaRequestUpdate)
  @ApiResponse(BeasiswaResponseUpdate)
  async update(
    @Body('id') id: number,
    @Body('name') name?: string,
    @Body('mulai') mulai?: Date,
    @Body('akhir') akhir?: Date,
    @Body('deskripsi') deskripsi?: string,
  ): Promise<BeasiswaResponse> {
    return await this.beasiswaService.update(id, name, mulai, akhir, deskripsi);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete beasiswa' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse(BeasiswaResponseDelete)
  async delete(@Param('id') id: number): Promise<BeasiswaResponse> {
    return await this.beasiswaService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All beasiswa' })
  @ApiHeader(RequestHeader)
  @ApiResponse(BeasiswaResponseGetAll)
  async getBeasiswa(): Promise<BeasiswaResponse> {
    return await this.beasiswaService.getBeasiswa();
  }
}
