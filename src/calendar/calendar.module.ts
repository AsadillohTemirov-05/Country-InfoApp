// src/calendar/calendar.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Holiday, HolidaySchema } from './schemas/holiday.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Holiday.name, schema: HolidaySchema }]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}