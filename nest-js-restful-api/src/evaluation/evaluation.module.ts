import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation/evaluation.service';
import { EvaluationController } from './evaluation/evaluation.controller';

@Module({
  providers: [EvaluationService],
  controllers: [EvaluationController],
})
export class EvaluationModule {}
