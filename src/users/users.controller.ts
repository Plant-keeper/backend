/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file users.controller.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './entities/user.entity';
import { CreatePlantDto } from '../plants/userPlants/dto/create-plant.dto';
import { PlantsService } from '../plants/userPlants/plants.service';
import { CreateSensorDto } from '../sensors/dto/create-sensor.dto';
import { SensorsService } from '../sensors/sensors.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly plantsService: PlantsService,
    private readonly sensorsService: SensorsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findUserWithJwt(@Request() req: any) {
    return this.findOne(req.user.id);
  }

  @Get('sensors')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedSensors(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.sensors;
  }

  @Get('plants')
  @UseGuards(JwtAuthGuard)
  async findUserRealtedPlants(@Request() req: any) {
    const user = (await this.findOne(req.user.id)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.plants;
  }

  @Post('plants')
  @UseGuards(JwtAuthGuard)
  async addPlantToUser(
    @Request() req: any,
    @Body() createPlantDto: CreatePlantDto,
  ) {
    if (createPlantDto?.userId) {
      await this.plantsService.create(createPlantDto);
    } else {
      createPlantDto.userId = req.user.id;
      await this.plantsService.create(createPlantDto);
    }
  }

  @Post('sensors')
  @UseGuards(JwtAuthGuard)
  async addSensorToUser(
    @Request() req: any,
    @Body() createSensorDto: CreateSensorDto,
  ) {
    if (createSensorDto?.userId) {
      await this.sensorsService.create(createSensorDto);
    } else {
      createSensorDto.userId = req.user.id;
      await this.sensorsService.create(createSensorDto);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findOneByMail(@Param('email') email: string) {
    return this.usersService.findOneByMail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
