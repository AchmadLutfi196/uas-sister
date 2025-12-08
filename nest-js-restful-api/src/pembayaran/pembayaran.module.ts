import { Module } from '@nestjs/common';
import { PembayaranService } from './pembayaran/pembayaran.service';
import { PembayaranController } from './pembayaran/pembayaran.controller';

@Module({
  providers: [PembayaranService],
  controllers: [PembayaranController],
})
export class PembayaranModule {}
