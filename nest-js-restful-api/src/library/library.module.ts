import { Module } from '@nestjs/common';
import { LibraryService } from './library/library.service';
import { LibraryController } from './library/library.controller';

@Module({
  providers: [LibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
