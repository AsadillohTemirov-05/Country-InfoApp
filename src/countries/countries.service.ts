// src/countries/countries.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CountryInfoDto } from './dto/country-info.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries(): Promise<{ countryCode: string; name: string }[]> {
    const url = `${this.configService.get('NAGER_API_URL')}/AvailableCountries`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch available countries', HttpStatus.BAD_REQUEST);
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfoDto> {
    try {
      
      const countryInfoUrl = `${this.configService.get('NAGER_API_URL')}/CountryInfo/${countryCode}`;
      const countryInfoResponse = await firstValueFrom(this.httpService.get(countryInfoUrl));
      const countryInfo = countryInfoResponse.data;

      
      const populationUrl = `${this.configService.get('COUNTRIESNOW_API_URL')}/countries/population`;
      const populationResponse = await firstValueFrom(
        this.httpService.post(populationUrl, { country: countryInfo.commonName }),
      );
      const populationData = populationResponse.data.data?.populationCounts || [];

      
      const flagUrl = `${this.configService.get('COUNTRIESNOW_API_URL')}/countries/flag/images`;
      const flagResponse = await firstValueFrom(
        this.httpService.post(flagUrl, { iso2: countryCode }),
      );
      const flag = flagResponse.data.data?.flag || '';

      return {
        countryCode,
        commonName: countryInfo.commonName,
        officialName: countryInfo.officialName,
        borders: countryInfo.borders || [],
        population: populationData.map((p: any) => ({ year: p.year, value: p.value })),
        flagUrl: flag,
      };
    } catch (error) {
      throw new HttpException(`Failed to fetch country info for ${countryCode}`, HttpStatus.BAD_REQUEST);
    }
  }
}