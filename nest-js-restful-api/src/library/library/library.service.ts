/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LibraryResponse } from 'src/types/library.type';

@Injectable()
export class LibraryService {
  constructor(private prismaService: PrismaService) {}

  async create(
    title: string,
    description: string,
    page: number,
    author: string,
    cover: string,
    overview: string,
  ): Promise<LibraryResponse> {
    const library = await this.prismaService.library.create({
      data: {
        title,
        description,
        page: Number(page),
        author,
        cover,
        overview,
      },
    });

    return {
      status: 200,
      message: 'Library created successfully!',
      data: library,
    };
  }

  async update(
    id: number,
    title?: string,
    description?: string,
    page?: number,
    author?: string,
    cover?: string,
    overview?: string,
  ): Promise<LibraryResponse> {
    const library = await this.prismaService.library.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!library) {
      throw new ErrorService(404, 'Library not found');
    }

    const updatedLibrary = await this.prismaService.library.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title || library.title,
        description: description || library.description,
        page: Number(page) || library.page,
        author: author || library.author,
        cover: cover || library.cover,
        overview: overview || library.overview,
      },
    });
    return {
      status: 201,
      message: 'Library updated successfully!',
      data: updatedLibrary,
    };
  }

  async delete(id: number): Promise<LibraryResponse> {
    const library = await this.prismaService.library.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!library) {
      throw new ErrorService(404, 'Library not found');
    }

    await this.prismaService.library.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      status: 201,
      message: 'Library deleted successfully!',
      data: library,
    };
  }

  async getLibraries(): Promise<LibraryResponse> {
    const libraries = await this.prismaService.library.findMany();

    if (libraries.length === 0) {
      throw new ErrorService(404, 'Libraries not found');
    }

    return {
      status: 200,
      message: 'Libraries found successfully!',
      data: libraries,
    };
  }
}
