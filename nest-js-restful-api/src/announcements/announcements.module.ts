import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements/announcements.service';
import { AnnouncementsController } from './announcements/announcements.controller';

@Module({
  providers: [AnnouncementsService],
  controllers: [AnnouncementsController],
})
export class AnnouncementsModule {}
