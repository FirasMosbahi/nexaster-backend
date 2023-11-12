import { Module } from '@nestjs/common';
import { MedicalStatusController } from './medical.status.controller';
import { MedicalStatusService } from './medical.status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../schema/patient.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [MedicalStatusController],
  providers: [MedicalStatusService],
})
export class MedicalStatusModule {}
