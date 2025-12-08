import { Test, TestingModule } from '@nestjs/testing';
import { AlumniController } from './alumni.controller';

describe('AlumniController', () => {
  let controller: AlumniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumniController],
    }).compile();

    controller = module.get<AlumniController>(AlumniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
