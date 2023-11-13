import { Controller, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @Get()
  async getDoctors() {
    const data = await this.doctorService.find({});
    return {
      message: 'DOCTORS RETRIEVED SUCCESSFULLY',
      data,
    };
  }
}
