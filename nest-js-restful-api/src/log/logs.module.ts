import { Module } from '@nestjs/common';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';

@Module({
  providers: [LogService],
  controllers: [LogController]
})
export class LogsModule {}
