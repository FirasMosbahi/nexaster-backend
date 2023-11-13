import { Types } from 'mongoose';
import { IsDate, IsEnum, IsMongoId } from 'class-validator';
import { DayVisitsEnum } from '../enums/visits.enum';

export class VisitDto {
  @IsMongoId()
  doctor: Types.ObjectId;
  @IsDate()
  date: Date;
  @IsEnum(DayVisitsEnum)
  visitNumber: DayVisitsEnum;
}
export class ReportVisitDto {
  @IsDate()
  date: Date;
  @IsEnum(DayVisitsEnum)
  visitNumber: DayVisitsEnum;
}
