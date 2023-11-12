import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { MedicalStatusService } from './medical.status.service';
import { Types } from 'mongoose';
import {
  HeartRateDto,
  SleepDto,
  StressDto,
  WeightDto,
} from '../dto/medical.status.dto';
import { RolesEnum } from '../enums/roles.enum';
import { Roles } from '../decorators/role.decorator';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('medicalStatus')
export class MedicalStatusController {
  constructor(private readonly medicalStatusService: MedicalStatusService) {}
  @Patch('/weight')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async updateWeight(
    @Req() { user }: { user: Types.ObjectId },
    @Body() weightDto: WeightDto,
  ) {
    await this.medicalStatusService.updateWeight(user, weightDto);
    return { message: 'WEIGHT_UPDATED_SUCCESSFULLY' };
  }
  @Patch('/heartRate')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async addHeartRateStatus(
    @Req() { user }: { user: Types.ObjectId },
    @Body() heartRateDto: HeartRateDto,
  ) {
    await this.medicalStatusService.addHeartRateStats(user, heartRateDto);
    return { message: 'HEART_RATE_STATS_UPDATED_SUCCESSFULLY' };
  }
  @Patch('/stress')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async addStressStatus(
    @Req() { user }: { user: Types.ObjectId },
    @Body() stressDto: StressDto,
  ) {
    await this.medicalStatusService.addStressStats(user, stressDto);
    return { message: 'STRESS_STATS_UPDATED_SUCCESSFULLY' };
  }
  @Patch('/sleepRate')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async addSleepRateStatus(
    @Req() { user }: { user: Types.ObjectId },
    @Body() sleepRateDto: SleepDto,
  ) {
    await this.medicalStatusService.addSleepRateStats(user, sleepRateDto);
    return { message: 'SLEEP_RATE_STATS_UPDATED_SUCCESSFULLY' };
  }
}
