import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { BaseSchema } from './base.schema';
import { RolesEnum } from '../enums/roles.enum';

@Schema({ timestamps: true })
export class Auth extends BaseSchema {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, enum: RolesEnum, required: true })
  role: RolesEnum;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
