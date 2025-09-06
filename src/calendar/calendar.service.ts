// src/calendar/calendar.service.ts
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Holiday } from './schemas/holiday.entity';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(Holiday.name) private readonly holidayModel: Model<Holiday>,
  ) {}

  async addHolidaysToCalendar(userId: string, countryCode: string, year: number, holidays?: string[]): Promise<void> {
    const url = `${this.configService.get('NAGER_API_URL')}/PublicHolidays/${year}/${countryCode}`;
    try {
      this.logger.log(`Fetching holidays for ${countryCode} in ${year}`);
      const response = await firstValueFrom(this.httpService.get(url));
      let publicHolidays = response.data;

      if (!publicHolidays || publicHolidays.length === 0) {
        throw new HttpException(`No holidays found for ${countryCode} in ${year}`, HttpStatus.NOT_FOUND);
      }

      
      if (holidays && holidays.length > 0) {
        const normalizedHolidays = holidays.map(h => h.toLowerCase());
        publicHolidays = publicHolidays.filter((h: any) => normalizedHolidays.includes(h.name.toLowerCase()));
        if (publicHolidays.length === 0) {
          throw new HttpException(`None of the specified holidays found for ${countryCode} in ${year}`, HttpStatus.BAD_REQUEST);
        }
      }

      // Save holidays to the database
      for (const holiday of publicHolidays) {
        const holidayDoc = new this.holidayModel({
          userId,
          countryCode: countryCode.toUpperCase(),
          year,
          holidayName: holiday.name,
          date: holiday.date,
        });
        await holidayDoc.save();
        this.logger.log(`Saved holiday: ${holiday.name} for user ${userId}`);
      }
    } catch (error) {
      this.logger.error(`Error fetching/saving holidays: ${error.message}`);
      if (error.response?.status === 404) {
        throw new HttpException(`Invalid country code: ${countryCode}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        `Failed to fetch or save holidays for ${countryCode}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}