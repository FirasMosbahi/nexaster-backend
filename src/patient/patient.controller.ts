import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Types } from 'mongoose';
import { UpdatePatientDto } from '../dto/patient.dto';
import {
  GetPatientsByDoctorResponse,
  UpdatePatientResponse,
} from '../types/patient.response';
import { Patient } from '../schema/patient.schema';
import { MedicalFolderDto } from '../dto/auth.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesEnum } from '../enums/roles.enum';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Patch()
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async updatePatient(
    @Req() { user }: { user: Types.ObjectId },
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<UpdatePatientResponse> {
    const data: Patient = await this.patientService.updatePatient(
      user,
      updatePatientDto,
    );
    return new UpdatePatientResponse(data);
  }

  @Patch('assign/:doctorId/:userId')
  async assignToDoctor(
    @Param('userId') user: Types.ObjectId,
    @Param('doctorId') doctorId: Types.ObjectId,
  ) {
    await this.patientService.assignToDoctor(user, doctorId);
    return { message: `ASSIGNED TO DOCTOR ${doctorId} successfully` };
  }

  @Get()
  @Roles(RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async getPatientsByDoctor(
    @Req() { user }: { user: Types.ObjectId },
  ): Promise<GetPatientsByDoctorResponse> {
    const data: Patient[] = await this.patientService.getPatientsByDoctor(user);
    return new GetPatientsByDoctorResponse(data);
  }

  @Patch()
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async updateMedicalFolder(
    @Req() { user }: { user: Types.ObjectId },
    @Body() medicalFolderDto: MedicalFolderDto,
  ) {
    await this.patientService.updateMedicalFolder(user, medicalFolderDto);
    return { message: 'MEDICAL_FOLDER_UPDATED_SUCCESSFULLY' };
  }
  @Get('/:patientId')
  async getPatient(@Param('patientId') patient: Types.ObjectId) {
    const data = await this.patientService.findById(patient);
    return {
      message: 'PATIENT FETCHED SUCCESSFULLY',
      data,
    };
  }
}
