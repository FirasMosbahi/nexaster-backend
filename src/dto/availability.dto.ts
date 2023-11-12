import { DayVisitsEnum } from '../enums/visits.enum';
import { IsArray, IsDate } from 'class-validator';

export class AvailabilityDto {
  @IsArray()
  monday: Set<DayVisitsEnum>;
  @IsArray()
  tuesday: Set<DayVisitsEnum>;
  @IsArray()
  thursday: Set<DayVisitsEnum>;
  @IsArray()
  wednesday: Set<DayVisitsEnum>;
  @IsArray()
  friday: Set<DayVisitsEnum>;
}
export class GetDoctorAvailabilityDto {
  @IsDate()
  date: Date;
}
