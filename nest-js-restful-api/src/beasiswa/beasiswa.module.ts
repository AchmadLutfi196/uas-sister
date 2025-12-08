/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BeasiswaService } from './beasiswa/beasiswa.service';
import { BeasiswaController } from './beasiswa/beasiswa.controller';

@Module({
  providers: [BeasiswaService],
  controllers: [BeasiswaController]
})
export class BeasiswaModule {}
