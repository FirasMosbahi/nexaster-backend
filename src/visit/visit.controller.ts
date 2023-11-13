import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { RolesEnum } from '../enums/roles.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/role.decorator';
import {
  AcceptReportedVisitResponse,
  AcceptVisitResponse,
  AskForVisitResponse,
  GetDoctorAvailabilityResponse,
  GetMyVisitsResponse,
  GetVisitsByDoctorResponse,
  ReportVisitResponse,
} from '../types/visits.response';
import { Types } from 'mongoose';
import { GetDoctorAvailabilityDto } from '../dto/availability.dto';
import { ReportVisitDto, VisitDto } from '../dto/visit.dto';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get('/byDoctor/:doctorId')
  @Roles(RolesEnum.PATIENT, RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async getVisitsByDoctor(
    @Param('doctorId') doctorId: Types.ObjectId,
  ): Promise<GetVisitsByDoctorResponse> {
    const data = await this.visitService.getVisitsByDoctor(doctorId);
    return new GetVisitsByDoctorResponse(data);
  }

  @Get('/doctorAvailability/:doctorId')
  @Roles(RolesEnum.PATIENT, RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async getDoctorAvailability(
    @Param('doctorId') doctorId: Types.ObjectId,
    @Body() getDoctorAvailabilityResponse: GetDoctorAvailabilityDto,
  ): Promise<GetDoctorAvailabilityResponse> {
    const data = await this.visitService.getDoctorAvailability(
      doctorId,
      getDoctorAvailabilityResponse,
    );
    return new GetDoctorAvailabilityResponse(data);
  }

  @Post()
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async askForVisit(
    @Req() { user }: { user: Types.ObjectId },
    @Body() askForVisitDto: VisitDto,
  ): Promise<AskForVisitResponse> {
    const data = await this.visitService.askForVisit(user, askForVisitDto);
    return new AskForVisitResponse(data);
  }
  @Patch('/accept/:visitId')
  @Roles(RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async acceptVisit(
    @Req() { user }: { user: Types.ObjectId },
    @Param('visitId') visitId: Types.ObjectId,
  ): Promise<AcceptVisitResponse> {
    const data = await this.visitService.acceptVisit(user, visitId);
    return new AcceptVisitResponse(data);
  }
  @Patch('/report/:visitId')
  @Roles(RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async reportVisit(
    @Req() { user }: { user: Types.ObjectId },
    @Param('visitId') visitId: Types.ObjectId,
    @Body() reportVisitDto: ReportVisitDto,
  ): Promise<ReportVisitResponse> {
    const data = await this.visitService.reportVisit(
      user,
      visitId,
      reportVisitDto,
    );
    return new ReportVisitResponse(data);
  }
  @Patch('/acceptReported/:visitId')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async acceptReportedVisit(
    @Req() { user }: { user: Types.ObjectId },
    @Param('visitId') visitId: Types.ObjectId,
  ): Promise<AcceptReportedVisitResponse> {
    const data = await this.visitService.acceptReportedVisit(user, visitId);
    return new AcceptReportedVisitResponse(data);
  }
  @Get('/myVisits/patient')
  @Roles(RolesEnum.PATIENT)
  @UseGuards(JwtGuard)
  async getMyVisitsAsPatient(
    @Req() { user }: { user: Types.ObjectId },
  ): Promise<GetMyVisitsResponse> {
    const data = await this.visitService.getMyVisitsAsPatient(user);
    return new GetMyVisitsResponse(data);
  }
  @Get('/myVisits/doctor')
  @Roles(RolesEnum.DOCTOR)
  @UseGuards(JwtGuard)
  async getMyVisitsAsDoctor(
    @Req() { user }: { user: Types.ObjectId },
  ): Promise<GetMyVisitsResponse> {
    const data = await this.visitService.getMyVisitsAsDoctor(user);
    return new GetMyVisitsResponse(data);
  }
}
