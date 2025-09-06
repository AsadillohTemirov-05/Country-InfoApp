// src/countries/countries.controller.ts
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryInfoDto } from './dto/country-info.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string): Promise<CountryInfoDto> {
    if (!countryCode || countryCode.length !== 2) {
      throw new HttpException('Invalid country code', HttpStatus.BAD_REQUEST);
    }
    return this.countriesService.getCountryInfo(countryCode.toUpperCase());
  }
}