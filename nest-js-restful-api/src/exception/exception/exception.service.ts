/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionService {
    throwBadRequest(message: string): HttpException {
        return new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    throwUnauthorized(message: string): HttpException {
        return new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    throwCustom(statusCode: number, message: string): HttpException {
        return new HttpException(message, statusCode);
    }
}
