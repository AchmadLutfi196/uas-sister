/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class UserService {
    constructor(private readonly validation: ValidationService) {}

    login(creadential: string, password: string) {
        const schema = z.object({
            creadential: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        return this.validation.validate(schema, { creadential, password });
    }
}
