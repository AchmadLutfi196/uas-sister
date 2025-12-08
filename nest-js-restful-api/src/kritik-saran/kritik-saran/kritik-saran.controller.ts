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
import { KritikSaranService } from './kritik-saran.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
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
  KritikSaranRequestCreate,
  KritikSaranRequestUpdate,
  KritikSaranResponseCreate,
  KritikSaranResponseDelete,
  KritikSaranResponseGetAll,
  KritikSaranResponseUpdate,
} from '../model/kritik-saran.model';

@ApiTags('Kritik Saran')
@Controller('/api/kritikSaran')
export class KritikSaranController {
  constructor(private readonly kritikSaranService: KritikSaranService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiBody(KritikSaranRequestCreate)
  @ApiResponse(KritikSaranResponseCreate)
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('pesan') pesan: string,
  ) {
    return this.kritikSaranService.create(name, email, pesan);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiBody(KritikSaranRequestUpdate)
  @ApiResponse(KritikSaranResponseUpdate)
  async update(
    @Body('id') id: number,
    @Body('pesan') pesan: string,
  ) {
    return this.kritikSaranService.update(id, pesan);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse(KritikSaranResponseDelete)
  async delete(@Param('id') id: number) {
    return this.kritikSaranService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Kritik Saran' })
  @ApiHeader(RequestHeader)
  @ApiResponse(KritikSaranResponseGetAll)
  async getKritikSaran(@GetUser() user: User) {
    return this.kritikSaranService.getKritikSaran(user);
  }
}
