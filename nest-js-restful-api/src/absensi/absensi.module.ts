/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AbsensiService } from './absensi/absensi.service';
import { AbsensiController } from './absensi/absensi.controller';

@Module({
  providers: [AbsensiService],
  controllers: [AbsensiController]
})
export class AbsensiModule {}
