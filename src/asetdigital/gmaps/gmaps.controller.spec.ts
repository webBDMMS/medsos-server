import { Test, TestingModule } from '@nestjs/testing';
import { GmapsController } from './gmaps.controller';
import { GmapsService } from './gmaps.service';

describe('GmapsController', () => {
  let controller: GmapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GmapsController],
      providers: [GmapsService],
    }).compile();

    controller = module.get<GmapsController>(GmapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
