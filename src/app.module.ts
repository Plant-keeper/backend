/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file app.module.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/userPlants/plants.module';
import { SensorsModule } from './sensors/sensors.module';
import { GeneralPlantsModule } from './plants/general-plants/general-plants.module';
import { SeedModule } from './seed/seed.module';
import { SensorsLinkedPlantView } from './sensors/entities/sensorsLinkedPlant.viewEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [SensorsLinkedPlantView],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PlantsModule,
    SensorsModule,
    GeneralPlantsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
