import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseUserSchema } from './base.schema';
import { Availability } from '../types/availability';

@Schema({ timestamps: true })
export class Doctor extends BaseUserSchema {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  speciality: string;
  @Prop({
    type: SchemaTypes.Map,
    required: true,
  })
  availability: Availability;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
