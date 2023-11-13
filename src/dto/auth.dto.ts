import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';

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
  @IsString()
  phoneNumber: string;
}
export class SignUpDoctorDto extends SignUpDto {
  @IsString()
  speciality: string;
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
  @IsNumber()
  height: number;
}
