/**
 * Project Name: PlantKeeper
 *
 * @created 28-08-2024
 * @file create-sensor.dto.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

export class CreateSensorDto {
  id: number;
  name: string;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
}
