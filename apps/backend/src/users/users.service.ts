import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import type { CasdoorUser } from '../auth/casdoor.types';
import {
  InsertRefreshToken,
  InsertUser,
  RefreshToken,
  refreshTokens,
  User,
  users,
} from '../database/schema/users.schema';
import { DatabaseService } from '../database/service/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  private normalizeUser(record: any): User {
    return {
      id: record.id,
      email: record.email ?? undefined,
      password: record.password ?? undefined,
      role: record.role,
      casdoorId: record.casdoorId ?? undefined,
      username: record.username ?? undefined,
      displayName: record.displayName ?? undefined,
      avatar: record.avatar ?? undefined,
      createdAt: record.createdAt ?? undefined,
    };
  }

  private handleDbError(error: unknown, context: string): never {
    if (error instanceof Error) {
      throw new InternalServerErrorException(`${context}: ${error.message}`);
    }
    throw new InternalServerErrorException(`${context}: Unknown database error`);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return result[0] ? this.normalizeUser(result[0]) : null;
    } catch (error) {
      this.handleDbError(error, 'findByEmail');
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const result = await this.dbService.db.select().from(users).where(eq(users.id, id)).limit(1);

      return result[0] ? this.normalizeUser(result[0]) : null;
    } catch (error) {
      this.handleDbError(error, 'findById');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const result = await this.dbService.db.select().from(users);
      return result.map((record) => this.normalizeUser(record));
    } catch (error) {
      this.handleDbError(error, 'findAll');
    }
  }

  async create(
    email: string,
    password: string,
    role = 'customer',
  ): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await argon2.hash(password);

      const insertedIds = await this.dbService.db
        .insert(users)
        .values({ email, password: hashedPassword, role } as InsertUser)
        .$returningId();

      if (!insertedIds[0]) {
        throw new InternalServerErrorException('User creation failed');
      }

      const user = await this.findById(insertedIds[0].id);
      if (!user) {
        throw new InternalServerErrorException('User not found after creation');
      }

      return user;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      this.handleDbError(error, 'create');
    }
  }

  async findByCasdoorId(casdoorId: string): Promise<User | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(users)
        .where(eq(users.casdoorId, casdoorId))
        .limit(1);

      return result[0] ? this.normalizeUser(result[0]) : null;
    } catch (error) {
      this.handleDbError(error, 'findByCasdoorId');
    }
  }

  async createFromCasdoorUser(casdoorUser: CasdoorUser): Promise<User> {
    try {
      const insertedIds = await this.dbService.db
        .insert(users)
        .values({
          casdoorId: casdoorUser.id,
          username: casdoorUser.name,
          displayName: casdoorUser.displayName || casdoorUser.name,
          email: casdoorUser.email || undefined,
          avatar: casdoorUser.avatar || undefined,
          role: 'user',
        } as InsertUser)
        .$returningId();

      if (!insertedIds[0]) {
        throw new InternalServerErrorException('Failed to create user from Casdoor');
      }

      const user = await this.findById(insertedIds[0].id);
      if (!user) {
        throw new InternalServerErrorException('User not found after Casdoor creation');
      }

      return user;
    } catch (error) {
      this.handleDbError(error, 'createFromCasdoorUser');
    }
  }

  async findUserIdByRefreshToken(refreshTokenRaw: string): Promise<number | null> {
    try {
      const tokens = await this.dbService.db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.isRevoked, false));

      for (const token of tokens) {
        if (await argon2.verify(token.tokenHash, refreshTokenRaw)) {
          return token.userId;
        }
      }

      return null;
    } catch (error) {
      this.handleDbError(error, 'findUserIdByRefreshToken');
    }
  }

  async storeRefreshToken(userId: number, tokenHash: string): Promise<RefreshToken> {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      await this.dbService.db
        .insert(refreshTokens)
        .values({ userId, tokenHash, isRevoked: false } as InsertRefreshToken);

      const insertedToken = await this.findRefreshTokenByHash(tokenHash);
      if (!insertedToken) {
        throw new InternalServerErrorException('Failed to retrieve stored refresh token');
      }

      return insertedToken;
    } catch (error) {
      if (error instanceof Error && error.message.includes('foreign key constraint')) {
        throw new InternalServerErrorException('User does not exist');
      }
      this.handleDbError(error, 'storeRefreshToken');
    }
  }

  async findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.tokenHash, tokenHash))
        .limit(1);

      return result[0] ? { ...result[0], createdAt: result[0].createdAt ?? undefined } : null;
    } catch (error) {
      this.handleDbError(error, 'findRefreshTokenByHash');
    }
  }

  async revokeRefreshToken(tokenId: number): Promise<void> {
    try {
      await this.dbService.db
        .update(refreshTokens)
        .set({ isRevoked: true })
        .where(eq(refreshTokens.id, tokenId));
    } catch (error) {
      this.handleDbError(error, 'revokeRefreshToken');
    }
  }

  async getRefreshTokens(userId: number): Promise<RefreshToken[]> {
    try {
      const result = await this.dbService.db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.userId, userId));

      return result.map((token) => ({
        ...token,
        createdAt: token.createdAt ?? undefined,
      }));
    } catch (error) {
      this.handleDbError(error, 'getRefreshTokens');
    }
  }

  async deleteRefreshTokenByHash(tokenHash: string): Promise<void> {
    try {
      await this.dbService.db.delete(refreshTokens).where(eq(refreshTokens.tokenHash, tokenHash));
    } catch (error) {
      this.handleDbError(error, 'deleteRefreshTokenByHash');
    }
  }
}
