/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.module.ts
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
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlantsService } from '../plants/userPlants/plants.service';
import { SensorsService } from '../sensors/sensors.service';
import { Sensor } from '../sensors/entities/sensor.entity';
import { Plant } from '../plants/userPlants/entities/plant.entity';
import { SensorsLinkedPlantView } from '../sensors/entities/sensorsLinkedPlant.viewEntity';
import { UserPlantsLinkedGeneralPlantsViewEntity } from '../plants/userPlants/entities/userPlantsLinkedGeneralPlants.viewEntity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Plant,
      UserPlantsLinkedGeneralPlantsViewEntity,
      Sensor,
      SensorsLinkedPlantView,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PlantsService, SensorsService, MailService],
  exports: [UsersService],
})
export class UsersModule {}
