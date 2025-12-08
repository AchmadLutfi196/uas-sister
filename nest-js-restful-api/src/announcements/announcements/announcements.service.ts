/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AnnouncementsResponse } from 'src/types/announcements.type';
import { AnnouncementsService as AnnouncementsValidationService } from 'src/validation/announcements/announcements.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly announcementsService: AnnouncementsValidationService,
  ) {}

  async create(
    judul: string,
    konten: string,
    user: User,
  ): Promise<AnnouncementsResponse> {
    if (user.role !== Role.ADMIN) {
      throw new ErrorService(403, 'You are not admin');
    }

    const requestCreate = this.announcementsService.create(judul, konten);

    const announcements = await this.prismaService.pengumuman.create({
      data: {
        judul: requestCreate.judul,
        konten: requestCreate.konten,
      },
    });

    return {
      status: 201,
      message: 'Announcements created successfully',
      data: announcements,
    };
  }

  async update(
    id: number,
    user: User,
    judul?: string,
    konten?: string,
  ): Promise<AnnouncementsResponse> {
    if (user.role !== Role.ADMIN) {
      throw new ErrorService(403, 'You are not admin');
    }

    const requestUpdate = this.announcementsService.update(judul, konten);

    const announcements = await this.prismaService.pengumuman.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!announcements) {
      throw new ErrorService(404, 'Announcements not found');
    }

    if (requestUpdate.judul) {
      announcements.judul = requestUpdate.judul;
    }

    if (requestUpdate.konten) {
      announcements.konten = requestUpdate.konten;
    }

    const announcementsUpdated = await this.prismaService.pengumuman.update({
      where: {
        id: Number(id),
      },
      data: announcements,
    });

    return {
      status: 201,
      message: 'Announcements updated successfully',
      data: announcementsUpdated,
    };
  }

  async delete(id: number, user: User): Promise<AnnouncementsResponse> {
    if (user.role !== Role.ADMIN) {
      throw new ErrorService(403, 'You are not admin');
    }

    const announcement = await this.prismaService.pengumuman.delete({
      where: {
        id: Number(id),
      },
    });

    if (!announcement) {
      throw new ErrorService(404, 'Announcements not found');
    }

    return {
      status: 201,
      message: 'Announcements deleted successfully',
      data: announcement,
    };
  }

  async getAnnouncements(): Promise<AnnouncementsResponse> {
    const announcements = await this.prismaService.pengumuman.findMany();

    if (announcements.length === 0) {
      throw new ErrorService(404, 'Announcements not found');
    }

    return {
      status: 200,
      message: 'Announcements found successfully',
      data: announcements,
    };
  }
}
