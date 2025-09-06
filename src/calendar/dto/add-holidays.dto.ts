// src/calendar/dto/add-holidays.dto.ts
import { IsString, IsInt, IsOptional, IsArray, Min } from 'class-validator';
import  { ApiProperty } from '@nestjs/swagger';



export class AddHolidaysDto {
  @ApiProperty({ description: 'ISO 3166-1 alpha-2 country code', example: 'US' })
  @IsString()
  countryCode: string;

  @ApiProperty({ description: 'Year for which holidays are requested', example: 2025 })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({
    description: 'Optional list of specific holidays to add',
    example: ["New Year's Day", 'Independence Day'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  holidays?: string[];
}