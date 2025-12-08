/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { KritikSaranService } from './kritik-saran/kritik-saran.service';
import { KritikSaranController } from './kritik-saran/kritik-saran.controller';

@Module({
  providers: [KritikSaranService],
  controllers: [KritikSaranController],
})
export class KritikSaranModule {}
