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
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsResponse } from 'src/types/announcements.type';
import { GetUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('/api/announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(
    @Body('judul') judul: string,
    @Body('konten') konten: string,
    @GetUser() user: User,
  ): Promise<AnnouncementsResponse> {
    return await this.announcementsService.create(judul, konten, user);
  }

  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async update(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body('judul') judul?: string,
    @Body('konten') konten?: string,
  ): Promise<AnnouncementsResponse> {
    return await this.announcementsService.update(id, user, judul, konten);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async delete(@Param('id') id: number, @GetUser() user: User): Promise<AnnouncementsResponse> {
    return await this.announcementsService.delete(id, user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getAnnouncements(): Promise<AnnouncementsResponse> {
    return await this.announcementsService.getAnnouncements();
  }
}
