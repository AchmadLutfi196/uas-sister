/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExceptionService } from './exception/exception.service';

@Module({
  providers: [ExceptionService]
})
export class ExceptionModule {}
