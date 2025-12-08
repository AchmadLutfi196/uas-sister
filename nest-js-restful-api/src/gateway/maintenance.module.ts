/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceGateway } from './maintenance.gateway';

@Module({
  providers: [MaintenanceService, MaintenanceGateway],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
