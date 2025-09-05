import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { User, RefreshToken } from '../database/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validate user credentials (email + password)
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const userWithPassword = user as User & { password: string };
    const isValid = await argon2.verify(userWithPassword.password, password);
    if (!isValid) return null;

    const { password: _, ...userWithoutPassword } = userWithPassword;
    return userWithoutPassword;
  }

  /**
   * Login user and issue JWT access + refresh tokens
   */
  async login(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
  }> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    // Generate access token
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'secret',
      expiresIn:
        this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '1h',
    });

    // Generate refresh token (UUID string)
    const refreshTokenRaw = uuidv4();
    const refreshTokenHash = await argon2.hash(refreshTokenRaw);

    // Store hashed refresh token in DB
    await this.usersService.storeRefreshToken(user.id, refreshTokenHash);

    const { password: _, ...userWithoutPassword } = user as User & {
      password?: string;
    };

    return {
      accessToken,
      refreshToken: refreshTokenRaw,
      user: userWithoutPassword,
    };
  }

  /**
   * Refresh tokens using valid refresh token
   */
  async refreshToken(
    userId: number,
    refreshTokenRaw: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
  }> {
    try {
      const tokens: RefreshToken[] =
        await this.usersService.getRefreshTokens(userId);

      const matchedToken = await this.findMatchingToken(tokens, refreshTokenRaw);

      if (!matchedToken) throw new UnauthorizedException('Invalid refresh token');

      const user = await this.usersService.findById(userId);
      if (!user) throw new UnauthorizedException('User not found');

      await this.usersService.revokeRefreshToken(matchedToken.id);

      return this.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(
        `Token refresh failed: ${error instanceof Error ? error.message : ''}`,
      );
    }
  }

  /**
   * Logout user (invalidate refresh token)
   */
  async logout(
    userId: number,
    refreshTokenRaw: string,
  ): Promise<{ message: string }> {
    try {
      const tokens: RefreshToken[] =
        await this.usersService.getRefreshTokens(userId);

      const matchedToken = await this.findMatchingToken(tokens, refreshTokenRaw);
      if (!matchedToken) throw new UnauthorizedException('Invalid refresh token');

      await this.usersService.deleteRefreshTokenByHash(matchedToken.tokenHash);

      return { message: 'Logged out successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(
        `Logout failed: ${error instanceof Error ? error.message : ''}`,
      );
    }
  }

  /**
   * Helper: find matching refresh token
   */
  private async findMatchingToken(
    tokens: RefreshToken[],
    refreshTokenRaw: string,
  ): Promise<RefreshToken | null> {
    for (const token of tokens) {
      if (token.isRevoked) continue;
      const valid = await argon2.verify(token.tokenHash, refreshTokenRaw);
      if (valid) return token;
    }
    return null;
  }
}
