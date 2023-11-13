import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseUserSchema } from './base.schema';

@Schema({ timestamps: true })
export class Doctor extends BaseUserSchema {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  speciality: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
