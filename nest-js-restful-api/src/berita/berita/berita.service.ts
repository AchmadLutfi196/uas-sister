/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { BeritaResponse } from 'src/types/berita.type';
import { BeritaService as BeritaValidationService } from 'src/validation/berita/berita.service';

@Injectable()
export class BeritaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly beritaValidationService: BeritaValidationService,
  ) {}

  async create(
    judul: string,
    konten: string,
    gambar?: string,
  ): Promise<BeritaResponse> {
    const requestCreate = this.beritaValidationService.create(
      judul,
      konten,
      gambar,
    );

    const berita = await this.prismaService.berita.create({
      data: {
        judul: requestCreate.judul,
        konten: requestCreate.konten,
        gambar: requestCreate.gambar,
      },
    });

    return {
      status: 201,
      message: 'Berita created successfully',
      data: berita,
    };
  }

  async update(
    id: number,
    judul?: string,
    konten?: string,
    gambar?: string,
  ): Promise<BeritaResponse> {
    const requestUpdate = this.beritaValidationService.update(
      Number(id),
      judul,
      konten,
      gambar,
    );

    const berita = await this.prismaService.berita.findUnique({
      where: {
        id: requestUpdate.id,
      },
    });

    if (!berita) {
      throw new ErrorService(404, 'Berita not found');
    }

    if (requestUpdate.judul) {
      berita.judul = requestUpdate.judul;
    }

    if (requestUpdate.konten) {
      berita.konten = requestUpdate.konten;
    }

    if (requestUpdate.gambar) {
      berita.gambar = requestUpdate.gambar;
    }

    const updatedBerita = await this.prismaService.berita.update({
      where: {
        id: requestUpdate.id,
      },
      data: berita,
    });

    return {
      status: 201,
      message: 'Berita updated successfully',
      data: updatedBerita,
    };
  }

  async delete(id: number): Promise<BeritaResponse> {
    const berita = await this.prismaService.berita.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      status: 201,
      message: 'Berita deleted successfully',
      data: berita,
    };
  }

  async getNews(): Promise<BeritaResponse> {
    const berita = await this.prismaService.berita.findMany();

    if (!berita) {
      throw new ErrorService(404, 'Berita not found');
    }

    return {
      status: 200,
      message: 'Berita found successfully',
      data: berita,
    };
  }
}
