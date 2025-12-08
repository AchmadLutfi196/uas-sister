import { Test, TestingModule } from '@nestjs/testing';
import { BeasiswaService } from './beasiswa.service';

describe('BeasiswaService', () => {
  let service: BeasiswaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeasiswaService],
    }).compile();

    service = module.get<BeasiswaService>(BeasiswaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
