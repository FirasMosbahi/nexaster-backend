import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStatusController } from './medical.status.controller';

describe('MedicalStatusController', () => {
  let controller: MedicalStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalStatusController],
    }).compile();

    controller = module.get<MedicalStatusController>(MedicalStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
