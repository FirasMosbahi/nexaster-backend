import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { BaseUserSchema } from './base.schema';
import { Doctor } from './doctor.schema';
import { DiseasesEnum } from '../enums/diseases.enum';
import { MedicalFolder, MedicalStatus, Weight } from '../types/medical.folder';
import { GenderEnum } from '../enums/gender.enum';

@Schema({ timestamps: true })
export class Patient extends BaseUserSchema {
  @Prop({ type: SchemaTypes.String, enum: GenderEnum, required: true })
  gender: GenderEnum;
  @Prop({ type: SchemaTypes.Number, required: true })
  age: number;
  @Prop({ type: Weight, required: false })
  weight?: Weight;
  @Prop({ type: SchemaTypes.Number, required: true })
  height: number;
  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: Doctor.name }],
    required: true,
    default: [],
  })
  doctors?: Types.ObjectId[];

  @Prop({
    type: [SchemaTypes.String],
    required: true,
    default: [],
  })
  diseases: string[];

  @Prop({
    type: MedicalFolder,
    required: false,
  })
  medicalFolder?: MedicalFolder;
  @Prop({
    type: MedicalStatus,
    required: true,
    default: {
      heartRate: [],
      stress: [],
      sleep: [],
    },
  })
  medicalStats: MedicalStatus;
  @Prop({
    type: [String],
    required: true,
    default: [],
  })
  observations: string[];
  @Prop({
    type: [String],
    required: true,
    default: [],
  })
  prespection: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
