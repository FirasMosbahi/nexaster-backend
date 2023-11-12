import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStatusService } from './medical.status.service';

describe('MedicalStatusService', () => {
  let service: MedicalStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalStatusService],
    }).compile();

    service = module.get<MedicalStatusService>(MedicalStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
