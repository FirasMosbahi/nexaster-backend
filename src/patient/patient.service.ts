import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { Patient } from '../schema/patient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicalFolderDto, SignUpPatientDto } from '../dto/auth.dto';
import { UpdatePatientDto } from '../dto/patient.dto';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class PatientService extends CommonRepository<Patient> {
  protected readonly modelName: string = Patient.name;

  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    private readonly doctorService: DoctorService,
  ) {
    super(patientModel);
  }

  async getPatient(patientId: Types.ObjectId): Promise<any> {
    const patient = await this.findById(patientId);
    return {
      ...patient,
      status: {
        heartRate: patient.medicalStats.heartRate.at(
          patient.medicalStats.heartRate.length - 1,
        ),
        stress: patient.medicalStats.stress.at(
          patient.medicalStats.stress.length - 1,
        ),
        sleep: patient.medicalStats.sleep.at(
          patient.medicalStats.sleep.length - 1,
        ),
      },
    };
  }

  async createPatient(
    signUpPatientDto: SignUpPatientDto,
  ): Promise<Types.ObjectId> {
    return (await this.create({ ...signUpPatientDto }))._id;
  }

  async updatePatient(
    patientId: Types.ObjectId,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return await this.findByIdAndUpdate(patientId, updatePatientDto, {
      new: true,
    });
  }
  async assignToDoctor(patientId: Types.ObjectId, doctorId: Types.ObjectId) {
    const doctor = await this.doctorService.findById(doctorId);
    if (!doctor) {
      throw new BadRequestException('No doctor with this id');
    }
    await this.findByIdAndUpdate(patientId, {
      $addToSet: {
        doctors: doctorId,
      },
    });
  }
  async getPatientsByDoctor(doctorId: Types.ObjectId): Promise<Patient[]> {
    return await this.find({ doctors: { $elemMatch: { $eq: doctorId } } });
  }
  async updateMedicalFolder(
    patientId: Types.ObjectId,
    medicalFolder: MedicalFolderDto,
  ) {
    let updateQueryBody: any = {};
    if (medicalFolder.MRI) {
      updateQueryBody = {
        ...updateQueryBody,
        'medicalFolder.MRI': medicalFolder.MRI,
      };
    }
    if (medicalFolder.CT_Scan) {
      updateQueryBody = {
        ...updateQueryBody,
        'medicalFolder.CT_SCAN': medicalFolder.CT_Scan,
      };
    }
    return await this.findByIdAndUpdate(
      patientId,
      {
        $set: updateQueryBody,
      },
      { new: true },
    );
  }
}
