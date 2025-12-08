/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleController } from './schedule/schedule.controller';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
