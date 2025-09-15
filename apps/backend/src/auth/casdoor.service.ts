import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SDK } from 'casdoor-nodejs-sdk';
import type { CasdoorTokenResponse, CasdoorUser } from './casdoor.types';

@Injectable()
export class CasdoorService {
  private sdk: SDK;

  constructor(private configService: ConfigService) {
    this.sdk = new SDK({
      endpoint: this.configService.get<string>('CASDOOR_ENDPOINT')!,
      clientId: this.configService.get<string>('CASDOOR_CLIENT_ID')!,
      clientSecret: this.configService.get<string>('CASDOOR_CLIENT_SECRET')!,
      certificate: this.configService.get<string>('CASDOOR_CERT_PUBLICKEY')!,
      orgName: this.configService.get<string>('CASDOOR_ORG_NAME')!,
      appName: this.configService.get<string>('CASDOOR_APP_NAME')!,
    });
  }


  getLoginUrl(redirectUri: string): string {
    return this.sdk.getSignInUrl(redirectUri);
  }


  async exchangeCodeForToken(code: string): Promise<CasdoorTokenResponse> {
    const tokenResponse = await this.sdk.getAuthToken(code);

    if (!tokenResponse || !tokenResponse.access_token) {
      throw new InternalServerErrorException('Failed to get token from Casdoor');
    }

    return tokenResponse;
  }

  async parseUserFromToken(token: string): Promise<CasdoorUser> {
    const user = await this.sdk.parseJwtToken(token);

    if (!user || !user.id || !user.name) {
      throw new InternalServerErrorException('Invalid Casdoor user token');
    }

    return {
      ...user, 
      id: user.id,
      name: user.name,
      displayName: user.displayName ?? user.name,
      email: user.email ?? undefined,
      avatar: user.avatar ?? undefined,
    };
  }
}
