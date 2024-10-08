/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file sensor.entity.ts
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
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Plant } from '../../plants/userPlants/entities/plant.entity';

@Entity({ schema: 'plantkeeper_test' })
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => User, (user) => user.sensors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Plant, (plant) => plant.sensor)
  plant: Plant;

  @Column()
  name: string;

  @Column()
  remark: string;

  @Column({ nullable: true })
  humidity: number;

  @Column({ nullable: true })
  light: number;

  @Column('float', { nullable: true })
  temperature: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastAlert: Date;
}
