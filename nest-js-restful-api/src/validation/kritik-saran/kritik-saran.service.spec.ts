import { Test, TestingModule } from '@nestjs/testing';
import { KritikSaranService } from './kritik-saran.service';

describe('KritikSaranService', () => {
  let service: KritikSaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KritikSaranService],
    }).compile();

    service = module.get<KritikSaranService>(KritikSaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
