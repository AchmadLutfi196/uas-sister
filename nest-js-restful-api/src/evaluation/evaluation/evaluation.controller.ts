/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { NilaiEvaluasi } from 'src/types/evaluation.type';

@Controller('/api/evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('create')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(
    @Body('enrollmentId') enrollmentId: number,
    @Body('nilai') nilai: NilaiEvaluasi,
    @Body('komentar') komentar?: string,
  ) {
    return this.evaluationService.create(enrollmentId, nilai, komentar);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getEvaluations() {
    return this.evaluationService.getEvaluations();
  }

  @Get('/teacher/:scheduleId')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getEvaluationByScheduleId(@Param('scheduleId') scheduleId: number) {
    return this.evaluationService.getEvaluationByScheduleId(scheduleId);
  }

  @Get('/:enrollmentId')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async getEvaluation(
    @Param('enrollmentId') enrollmentId: number,
  ) {
    return this.evaluationService.getEvaluation(enrollmentId);
  }
}
