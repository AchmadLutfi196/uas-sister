import { Test, TestingModule } from '@nestjs/testing';
import { KritikSaranController } from './kritik-saran.controller';

describe('KritikSaranController', () => {
  let controller: KritikSaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KritikSaranController],
    }).compile();

    controller = module.get<KritikSaranController>(KritikSaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
