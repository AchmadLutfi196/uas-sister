/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { MaintenanceGateway } from './maintenance.gateway';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: MaintenanceGateway,
  ) {}

  async toggleMaintenance() {
    const status = await this.prisma.serverStatus.findFirst();
    const newStatus = !status.isMaintenance;

    // Update status server
    await this.prisma.serverStatus.update({
      where: { id: status.id },
      data: { isMaintenance: newStatus },
    });

    if (newStatus) {
      // Null-kan token semua user kecuali admin
      const users = await this.prisma.user.findMany();
      const nonAdmins = users.filter((user) => user.role !== 'ADMIN');

      for (const user of nonAdmins) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { token: null },
        });
      }

      // Kirim notifikasi real-time
      this.gateway.notifyMaintenance(users);
    }

    return {
      status: 200,
      message: `Server is now ${newStatus ? 'under maintenance' : 'active'}`,
      data: newStatus,
    };
  }

  async getServer() {
    const server = await this.prisma.serverStatus.findFirst();

    return {
      status: 200,
      message: server.isMaintenance ? 'Server is under maintenance' : 'Server is active',
      data: server,
    }
  }
}
