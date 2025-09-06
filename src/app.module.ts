import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const uri = configService.get<string>('MONGODB_URI');
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    return {
      uri, // bu yerda object ichida beriladi
    };
  },
}),

    CountriesModule,
    CalendarModule,
  ],
})
export class AppModule {}
