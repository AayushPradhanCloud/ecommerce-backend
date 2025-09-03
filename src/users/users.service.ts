import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/service/database.service';
import {
  users,
  refreshTokens,
  InsertUser,
  User,
  InsertRefreshToken,
  RefreshToken,
} from '../database/schema/users.schema';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return result[0] || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Database error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown database error occurred');
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return result[0] || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Database error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown database error occurred');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.dbService.db.select().from(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Database error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown database error occurred');
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

    // Use $returningId() to get the inserted user's ID
    const insertedIds = await this.dbService.db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role,
      } as InsertUser)
      .$returningId();

    if (insertedIds.length === 0) {
      throw new InternalServerErrorException('User creation failed - no result returned');
    }

    // Fetch the user by ID and exclude password
    const user = await this.findById(insertedIds[0].id);
    if (!user) {
      throw new InternalServerErrorException('User creation failed - user not found');
    }
    // If password is not present, just return the user object
    // (assuming user does not have a password property)
    return user;
  } catch (error: unknown) {
    if (error instanceof ConflictException) throw error;
    if (error instanceof Error) {
      throw new InternalServerErrorException(
        `User creation failed: ${error.message}`,
      );
    }
    throw new InternalServerErrorException(
      'Unknown error during user creation',
    );
  }
}

 async storeRefreshToken(
  userId: number,
  tokenHash: string,
): Promise<RefreshToken> {
  try {
    console.log('🔄 Storing refresh token for user ID:', userId);
    
    // Verify user exists
    const user = await this.findById(userId);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    // Insert the token
    await this.dbService.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      isRevoked: false,
    } as InsertRefreshToken);

    // Find the newly inserted token by its hash
    const insertedToken = await this.findRefreshTokenByHash(tokenHash);
    if (!insertedToken) {
      throw new InternalServerErrorException('Failed to retrieve stored refresh token');
    }

    console.log('✅ Refresh token stored successfully:', insertedToken);
    return insertedToken;
  } catch (error: unknown) {
    console.error('❌ Error in storeRefreshToken:');
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('foreign key constraint')) {
        throw new InternalServerErrorException('User does not exist');
      }
      
      throw new InternalServerErrorException(`Failed to store refresh token: ${error.message}`);
    }
    
    throw new InternalServerErrorException('Unknown error storing refresh token');
  }
}

  async findRefreshTokenByHash(
    tokenHash: string,
  ): Promise<RefreshToken | null> {
    try {
      const result = await this.dbService.db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.tokenHash, tokenHash))
        .limit(1);

      return result[0] || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Database error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown database error occurred');
    }
  }

  async revokeRefreshToken(tokenId: number): Promise<void> {
    try {
      await this.dbService.db
        .update(refreshTokens)
        .set({ isRevoked: true })
        .where(eq(refreshTokens.id, tokenId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to revoke token: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown error revoking token');
    }
  }

  async getRefreshTokens(userId: number): Promise<RefreshToken[]> {
    try {
      return await this.dbService.db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.userId, userId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Database error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown database error occurred');
    }
  }

  async deleteRefreshTokenByHash(tokenHash: string): Promise<void> {
    try {
      await this.dbService.db
        .delete(refreshTokens)
        .where(eq(refreshTokens.tokenHash, tokenHash));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to delete token: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Unknown error deleting token');
    }
  }
}

