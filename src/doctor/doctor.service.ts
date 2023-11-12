import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { Doctor } from '../schema/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SignUpDoctorDto } from '../dto/auth.dto';

@Injectable()
export class DoctorService extends CommonRepository<Doctor> {
  protected readonly modelName: string = Doctor.name;

  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,
  ) {
    super(doctorModel);
  }

  async createDoctor(
    signUpDoctorDto: SignUpDoctorDto,
  ): Promise<Types.ObjectId> {
    const doctor = await this.create({ ...signUpDoctorDto });
    return doctor._id;
  }
}
