import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { CasdoorService } from './casdoor.service';
import type { CasdoorUser } from './casdoor.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly casdoorService: CasdoorService,
  ) {}

  async loginWithCasdoorCode(code: string) {
    try {
      const tokenResponse = await this.casdoorService.exchangeCodeForToken(code);
      const casdoorUser: CasdoorUser = await this.casdoorService.parseUserFromToken(
        tokenResponse.access_token,
      );

      if (!casdoorUser.id) {
        throw new UnauthorizedException('Invalid Casdoor user');
      }

      let user = await this.usersService.findByCasdoorId(casdoorUser.id);
      if (!user) {
        user = await this.usersService.createFromCasdoorUser(casdoorUser);
      }

      return this.generateTokensForUser(user);
    } catch (err: any) {
      console.error('Casdoor login failed:', err.response?.data || err.message || err);
      throw new InternalServerErrorException('Casdoor login failed');
    }
  }

  async refreshToken(refreshTokenRaw: string) {
    try {
      const userId = await this.usersService.findUserIdByRefreshToken(refreshTokenRaw);
      if (!userId) throw new UnauthorizedException('Invalid refresh token');

      return this.loginWithUserId(userId);
    } catch (err: any) {
      console.error('Refresh token failed:', err.message || err);
      throw new InternalServerErrorException('Failed to refresh token');
    }
  }

  private async loginWithUserId(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    return this.generateTokensForUser(user);
  }

  private async generateTokensForUser(user: {
    id: number;
    email?: string;
    role: string;
  }) {
    try {
      const payload = { sub: user.id, email: user.email, role: user.role };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'secret',
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '1h',
      });

      const refreshTokenRaw = uuidv4();
      const refreshTokenHash = await argon2.hash(refreshTokenRaw);

      await this.usersService.storeRefreshToken(user.id, refreshTokenHash);

      return {
        token: accessToken,
        refreshToken: refreshTokenRaw,
        user,
      };
    } catch (error: unknown) {
      console.error('Token generation failed:', error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Failed to generate tokens: ${error.message}`);
      }
      throw new InternalServerErrorException('Unknown error generating tokens');
    }
  }
}
