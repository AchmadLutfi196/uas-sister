/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorService extends HttpException {
    constructor(statusCode: number = HttpStatus.BAD_REQUEST, message: string) {
        super(message, statusCode);
    }
}