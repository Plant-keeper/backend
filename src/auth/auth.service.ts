/**
 * Project Name: PlantKeeper
 *
 * @created 26-08-2024
 * @file auth.service.ts
 * @version 1.0.0
 * @see https://github.com/Plant-keeper
 *
 * @authors
 *   - Rafael Dousse
 *   - Eva Ray
 *   - Quentin Surdez
 *   - Rachel Tranchida
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { JwtPayloadType } from './types/jwt-payload.type';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = (await this.usersService.findOneByMail(email)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await argon.verify(user.password, pass);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    // TODO: créer un type afin que cela soit plus propre
    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload: JwtPayloadType = {
      sub: String(user.id),
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateJwtPayload({ sub }: JwtPayloadType): Promise<User> {
    const user = (await this.usersService.findOne(Number(sub))) as User;

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateToken(value: string) {
    // const hash = crypto.createHash('sha256').update(value).digest('hex');

    const user = (await this.usersService.findOneByHash(value)) as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
