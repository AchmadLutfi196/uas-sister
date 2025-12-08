import { Module } from '@nestjs/common';
import { AlumniService } from './alumni/alumni.service';
import { AlumniController } from './alumni/alumni.controller';

@Module({
  providers: [AlumniService],
  controllers: [AlumniController]
})
export class AlumniModule {}
