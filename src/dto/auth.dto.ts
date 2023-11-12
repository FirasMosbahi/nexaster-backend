import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';
import { MedicalFolder, Weight } from '../types/medical.folder';
import { Type } from 'class-transformer';
import { Availability } from '../types/availability';
import { AvailabilityDto } from './availability.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
class SignUpDto extends LoginDto {
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsPhoneNumber()
  phoneNumber: string;
}
export class SignUpDoctorDto extends SignUpDto {
  @IsString()
  speciality: string;
  @ValidateNested()
  @Type(() => AvailabilityDto)
  availability: Availability;
}
class WeightDto {
  @IsNumber()
  actualWeight: number;
  @IsOptional()
  @IsNumber()
  bodyFat?: number;
  @IsOptional()
  @IsNumber()
  waterPercentage?: number;
}
export class MedicalFolderDto {
  @IsOptional()
  @IsString()
  MRI?: string;
  @IsOptional()
  @IsString()
  CT_Scan?: string;
}
export class SignUpPatientDto extends SignUpDto {
  @IsEnum(GenderEnum)
  gender: GenderEnum;
  @IsNumber()
  age: number;
  @ValidateNested()
  @Type(() => WeightDto)
  weight: Weight;
  @IsNumber()
  height: number;
  @ValidateNested()
  @Type(() => MedicalFolderDto)
  medicalFolder: MedicalFolder;
}
