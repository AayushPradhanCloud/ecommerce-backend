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

  // Validate user credentials (email + password)
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // Cast user to include password for verification (since TS type User has no password)
    const userWithPassword = user as User & { password: string };

    const valid = await argon2.verify(userWithPassword.password, password);
    if (!valid) return null;

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = userWithPassword;
    return userWithoutPassword;
  }

  // Login user and generate access + refresh tokens
  async login(
    user: User,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
  }> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
    });

    // Generate raw refresh token (UUID string)
    const refreshTokenRaw = uuidv4();

    // Hash the refresh token before storing
    const refreshTokenHash = await argon2.hash(refreshTokenRaw);

    // Store hashed refresh token linked to the user
    await this.usersService.storeRefreshToken(user.id, refreshTokenHash);

    // Remove password before returning user
    const { password: _, ...userWithoutPassword } = user as User & { password?: string };

    return {
      accessToken,
      refreshToken: refreshTokenRaw, 
      user: userWithoutPassword,
    };
  }

  // Refresh tokens using a valid refresh token
  async refreshToken(
    userId: number,
    refreshTokenRaw: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
  }> {
    try {
      // Get all refresh tokens for the user
      const tokens: RefreshToken[] =
        await this.usersService.getRefreshTokens(userId);

      let matchedToken: RefreshToken | null = null;

      // Find a token matching the raw refresh token (hashed verification)
      for (const token of tokens) {
        if (token.isRevoked) continue;

        const valid = await argon2.verify(token.tokenHash, refreshTokenRaw);
        if (valid) {
          matchedToken = token;
          break;
        }
      }

      if (!matchedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Find user by ID
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Revoke old refresh token so it cannot be reused
      await this.usersService.revokeRefreshToken(matchedToken.id);

      // Issue new access and refresh tokens
      return this.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      if (error instanceof Error)
        throw new InternalServerErrorException(
          `Token refresh failed: ${error.message}`,
        );
      throw new InternalServerErrorException('Unknown token refresh error');
    }
  }

  // Logout user by deleting the refresh token
  async logout(
    userId: number,
    refreshTokenRaw: string,
  ): Promise<{ message: string }> {
    try {
      // Get all refresh tokens for the user
      const tokens: RefreshToken[] =
        await this.usersService.getRefreshTokens(userId);

      let matchedToken: RefreshToken | null = null;

      // Find matching refresh token by verifying the hash
      for (const token of tokens) {
        const valid = await argon2.verify(token.tokenHash, refreshTokenRaw);
        if (valid) {
          matchedToken = token;
          break;
        }
      }

      if (!matchedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Delete the refresh token (or mark revoked)
      await this.usersService.deleteRefreshTokenByHash(matchedToken.tokenHash);

      return { message: 'Logged out successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      if (error instanceof Error)
        throw new InternalServerErrorException(
          `Logout failed: ${error.message}`,
        );
      throw new InternalServerErrorException('Unknown logout error');
    }
  }
}
