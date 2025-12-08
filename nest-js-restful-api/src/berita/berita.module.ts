import { Module } from '@nestjs/common';
import { BeritaService } from './berita/berita.service';
import { BeritaController } from './berita/berita.controller';

@Module({
  providers: [BeritaService],
  controllers: [BeritaController],
})
export class BeritaModule {}
