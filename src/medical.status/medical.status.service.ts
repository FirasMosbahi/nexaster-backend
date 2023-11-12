import { Injectable } from '@nestjs/common';
import { Patient } from '../schema/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonRepository } from '../common/common.repository';
import {
  HeartRateDto,
  SleepDto,
  StressDto,
  WeightDto,
} from '../dto/medical.status.dto';
import { Weight } from '../types/medical.folder';

@Injectable()
export class MedicalStatusService extends CommonRepository<Patient> {
  protected readonly modelName: string = Patient.name;

  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,
  ) {
    super(patientModel);
  }

  async updateWeight(
    patientId: Types.ObjectId,
    weight: WeightDto,
  ): Promise<Weight> {
    await this.findByIdAndUpdate(patientId, {
      $set: {
        weight,
      },
    });
    return weight;
  }
  async addHeartRateStats(patientId: Types.ObjectId, heartRate: HeartRateDto) {
    await this.findByIdAndUpdate(patientId, {
      $push: {
        'medicalStats.heartRate': heartRate,
      },
    });
  }
  async addSleepRateStats(patientId: Types.ObjectId, sleepRate: SleepDto) {
    await this.findByIdAndUpdate(patientId, {
      $push: {
        'medicalStats.sleep': sleepRate,
      },
    });
  }
  async addStressStats(patientId: Types.ObjectId, stress: StressDto) {
    await this.findByIdAndUpdate(patientId, {
      $push: {
        'medicalStats.stress': stress,
      },
    });
  }
}
