/* eslint-disable prettier/prettier */
import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import { LogService } from './log.service';
import { LogResponse } from 'src/types/log.type';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('/api/log')
export class LogController {
    constructor(private readonly logService: LogService) {}

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async getLogs(@GetUser() user: User): Promise<LogResponse> {
        return await this.logService.getLogs(user);
    }
}
