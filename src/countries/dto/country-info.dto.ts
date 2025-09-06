export class CountryInfoDto {
  countryCode: string;
  commonName: string;
  officialName: string;
  borders: string[];
  population: { year: number; value: number }[];
  flagUrl: string;
}