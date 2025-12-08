/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof ZodError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: `Validation Error: ${JSON.stringify(exception.issues)}`,
      });
    } else if (exception instanceof ErrorService) {
      response.status(exception.getStatus()).json({
        status: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: exception.message,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: `Internal server error: ${exception}`,
      });
    }
  }
}
