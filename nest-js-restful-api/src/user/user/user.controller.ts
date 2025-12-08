/* eslint-disable prettier/prettier */
import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from 'src/types/user.type';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/login')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    async login(
        @Body('creadential') creadential: string,
        @Body('password') password: string,
    ): Promise<UserResponse> {
        return await this.userService.login(creadential, password);
    }
}
