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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BeritaService } from './berita.service';
import { BeritaResponse } from 'src/types/berita.type';
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
  BeritaRequestCreate,
  BeritaRequestUpdate,
  BeritaResponseCreate,
  BeritaResponseDelete,
  BeritaResponseGetAll,
  BeritaResponseUpdate,
} from '../model/berita.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@ApiTags('Berita')
@Controller('/api/berita')
export class BeritaController {
  constructor(private readonly beritaService: BeritaService) {}

  @Post('/create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Berita' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeritaRequestCreate)
  @ApiResponse(BeritaResponseCreate)
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: './uploads/berita',
        filename: (req, file, callback) => {
          // Generate nama file unik
          const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Validasi tipe file: hanya menerima gambar
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body('judul') judul: string,
    @Body('konten') konten: string,
    @UploadedFile() gambar?: Express.Multer.File,
  ): Promise<BeritaResponse> {
    if (!gambar) {
      throw new Error('No file uploaded!');
    }
    return await this.beritaService.create(judul, konten, gambar.filename);
  }

  @Patch()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Update Berita' })
  @ApiHeader(RequestHeader)
  @ApiBody(BeritaRequestUpdate)
  @ApiResponse(BeritaResponseUpdate)
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: './uploads/berita',
        filename: (req, file, callback) => {
          // Generate nama file unik
          if (file) {
            const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueFilename);
          }
        },
      }),
      fileFilter: (req, file, callback) => {
        // Validasi tipe file: hanya menerima gambar
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Body('id') id: number,
    @Body('judul') judul?: string,
    @Body('konten') konten?: string,
    @UploadedFile() gambar?: Express.Multer.File,
  ): Promise<BeritaResponse> {
    return await this.beritaService.update(id, judul, konten, gambar?.filename);
  }

  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @ApiOperation({ summary: 'Delete Berita' })
  @ApiHeader(RequestHeader)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse(BeritaResponseDelete)
  async delete(@Param('id') id: number): Promise<BeritaResponse> {
    return await this.beritaService.delete(id);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Berita' })
  @ApiHeader(RequestHeader)
  @ApiResponse(BeritaResponseGetAll)
  async getNews(): Promise<BeritaResponse> {
    return await this.beritaService.getNews();
  }
}
