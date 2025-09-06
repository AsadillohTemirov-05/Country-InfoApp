// src/calendar/calendar.controller.ts
import { Controller, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('users/:userId/calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('holidays')
  @ApiOperation({ summary: 'Add national holidays to a user’s calendar' })
  @ApiParam({ name: 'userId', description: 'Unique identifier of the user', example: '123' })
  @ApiBody({ type: AddHolidaysDto })
  @ApiResponse({ status: 201, description: 'Holidays added successfully', type: Object })
  @ApiResponse({ status: 400, description: 'Invalid userId, countryCode, or year' })
  @ApiResponse({ status: 404, description: 'No holidays found for the specified country and year' })
  async addHolidays(
    @Param('userId') userId: string,
    @Body() body: AddHolidaysDto,
  ) {
    if (!userId || typeof userId !== 'string') {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    await this.calendarService.addHolidaysToCalendar(userId, body.countryCode, body.year, body.holidays);
    return { message: 'Holidays added successfully' ,};
  }
}