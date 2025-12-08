/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { z } from 'zod';

enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}

@Injectable()
export class AdminService {
    constructor(
        private readonly validation: ValidationService,
    ) {}

    register(name: string, email: string, password: string) {
        const schema = z.object({
            name: z.string().min(1).max(100),
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        return this.validation.validate(schema, { name, email, password });
    }

    login(email: string, password: string) {
        const schema = z.object({
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        return this.validation.validate(schema, { email, password });
    }

    update(name?: string, email?: string, password?: string) {
        const schema = z.object({
            name: z.string().max(100).optional(),
            email: z.string().max(100).optional(),
            password: z.string().max(100).optional(),
        });

        return this.validation.validate(schema, { name, email, password });
    }

    updateUser(id: number, role: Role, name?: string, email?: string, password?: string) {
        const schema = z.object({
            id: z.number().min(1),
            role: z.enum([Role.ADMIN, Role.TEACHER, Role.STUDENT]),
            name: z.string().max(100).optional(),
            email: z.string().max(100).optional(),
            password: z.string().max(100).optional(),
        });

        return this.validation.validate(schema, { id, role, name, email, password });
    }

}
