import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { SchemaTypes, Types } from 'mongoose';
import { DayVisitsEnum, VisitStatusEnum } from '../enums/visits.enum';

@Schema({ timestamps: true })
export class Visit extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  doctor: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  patient: Types.ObjectId;
  @Prop({ type: SchemaTypes.Date, required: true })
  date: Date;
  @Prop({ type: SchemaTypes.Number, required: true })
  visitNumber: DayVisitsEnum;
  @Prop({
    type: SchemaTypes.String,
    enum: VisitStatusEnum,
    required: true,
    default: VisitStatusEnum.WAITING,
  })
  status: VisitStatusEnum;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
