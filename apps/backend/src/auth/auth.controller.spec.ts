import { Controller, Get, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CasdoorService } from './casdoor.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly casdoorService: CasdoorService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('login')
  login(@Res() res: Response) {
    const redirectUri =
      this.configService.get<string>('FRONTEND_CALLBACK_URL') ||
      'http://localhost:3000/auth/callback';

    const loginUrl = this.casdoorService.getLoginUrl(redirectUri);
    return res.redirect(loginUrl);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      throw new UnauthorizedException('No code provided from Casdoor');
    }

    const tokenResp = await this.casdoorService.exchangeCodeForToken(code);

    if (!tokenResp?.id_token) {
      throw new UnauthorizedException('Failed to obtain id_token from Casdoor');
    }

    const user = await this.casdoorService.parseUserFromToken(tokenResp.id_token);

    if (!user) {
      throw new UnauthorizedException('Failed to parse user information from token');
    }

    const myJwt = this.jwtService.sign(
      { sub: user.id, email: user.email, name: user.name ?? '' },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'secret',
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '1h',
      },
    );

    return res.json({
      user,
      casdoorTokens: tokenResp,
      accessToken: myJwt,
    });
  }
}
