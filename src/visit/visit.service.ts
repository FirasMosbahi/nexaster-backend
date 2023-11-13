import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { Visit } from '../schema/visits.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SpecialDate } from '../types/SpecialDate';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { ReportVisitDto, VisitDto } from '../dto/visit.dto';
import { Doctor } from '../schema/doctor.schema';
import { GetDoctorAvailabilityDto } from '../dto/availability.dto';
import {
  DayVisitsEnum,
  VisitStatusEnum,
  WeekDaysEnum,
} from '../enums/visits.enum';

@Injectable()
export class VisitService extends CommonRepository<Visit> {
  protected readonly modelName: string = Visit.name;

  constructor(
    @InjectModel(Visit.name)
    private readonly visitModel: Model<Visit>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {
    super(visitModel);
  }

  async getVisitsByDoctor(
    doctorId: Types.ObjectId,
  ): Promise<Map<SpecialDate, Visit[]>> {
    const result: Map<SpecialDate, Visit[]> = new Map<SpecialDate, Visit[]>();
    const visits = await this.find({ doctor: doctorId });
    for (const visit of visits) {
      const date: SpecialDate = SpecialDate.fromDate(visit.date);
      if (result.has(date)) {
        result.set(date, [...result.get(date), visit]);
      } else {
        result.set(date, [visit]);
      }
    }
    return result;
  }
  async getDoctorAvailability(
    doctorId: Types.ObjectId,
    getDoctorAvailabilityDto: GetDoctorAvailabilityDto,
  ): Promise<DayVisitsEnum[]> {
    const visits: Visit[] = await this.find({
      doctor: doctorId,
      date: getDoctorAvailabilityDto.date,
    });
    const doctorAvailability = [
      DayVisitsEnum.VISIT1,
      DayVisitsEnum.VISIT2,
      DayVisitsEnum.VISIT3,
      DayVisitsEnum.VISIT4,
    ];
    for (const visit of visits) {
      doctorAvailability.filter((e) => e !== visit.visitNumber);
    }
    return doctorAvailability;
  }
  async askForVisit(
    patientId: Types.ObjectId,
    visitDto: VisitDto,
  ): Promise<Visit> {
    const doctorAvailability: DayVisitsEnum[] =
      await this.getDoctorAvailability(visitDto.doctorId, {
        date: visitDto.date,
      });
    if (doctorAvailability.find((e) => e === visitDto.visitNumber)) {
      return await this.create({
        ...visitDto,
        patient: patientId,
      });
    } else {
      throw new BadRequestException('THE_DOCTOR_IS_NOT_AVAILABLE');
    }
  }
  async acceptVisit(
    visitId: Types.ObjectId,
    doctorId: Types.ObjectId,
  ): Promise<Visit> {
    return await this.findOneAndUpdate(
      {
        doctor: doctorId,
        _id: visitId,
      },
      { $set: { status: VisitStatusEnum.ACCEPTED } },
      { new: true },
    );
  }
  async reportVisit(
    visitId: Types.ObjectId,
    doctorId: Types.ObjectId,
    reportVisitDto: ReportVisitDto,
  ): Promise<Visit> {
    return await this.findOneAndUpdate(
      {
        doctor: doctorId,
        _id: visitId,
        status: VisitStatusEnum.WAITING,
      },
      {
        $set: {
          status: VisitStatusEnum.REPORTED,
          date: reportVisitDto.date,
          visitNumber: reportVisitDto.visitNumber,
        },
      },
      { new: true },
    );
  }
  async acceptReportedVisit(
    visitId: Types.ObjectId,
    patientId: Types.ObjectId,
  ): Promise<Visit> {
    return await this.findOneAndUpdate(
      {
        patient: patientId,
        _id: visitId,
      },
      {
        $set: {
          status: VisitStatusEnum.ACCEPTED,
        },
      },
      { new: true },
    );
  }
  async getMyVisitsAsPatient(patient: Types.ObjectId): Promise<Visit[]> {
    return await this.find({ patient });
  }
  async getMyVisitsAsDoctor(doctor: Types.ObjectId): Promise<Visit[]> {
    return await this.find({ doctor });
  }
}
