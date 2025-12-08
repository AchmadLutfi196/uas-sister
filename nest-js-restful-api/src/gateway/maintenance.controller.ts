/* eslint-disable prettier/prettier */
import { Controller, Get, Patch } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Patch('/toggle-maintenance')
  async toggleMaintenance() {
    return await this.maintenanceService.toggleMaintenance();
  }

  @Get()
  async getServer() {
    return await this.maintenanceService.getServer();
  }
}
