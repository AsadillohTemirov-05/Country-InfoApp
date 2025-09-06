// src/calendar/schemas/holiday.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Holiday extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  holidayName: string;

  @Prop({ required: true })
  date: string;
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);