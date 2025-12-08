import { Test, TestingModule } from '@nestjs/testing';
import { BeasiswaController } from './beasiswa.controller';

describe('BeasiswaController', () => {
  let controller: BeasiswaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeasiswaController],
    }).compile();

    controller = module.get<BeasiswaController>(BeasiswaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
