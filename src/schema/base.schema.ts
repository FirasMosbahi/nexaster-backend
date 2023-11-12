import { SchemaTypes, Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  _id: Types.ObjectId;
}

export class BaseUserSchema extends BaseSchema {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  firstName: string;
  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  lastName: string;
  @Prop({ type: SchemaTypes.String, required: true })
  phoneNumber: string;
}
