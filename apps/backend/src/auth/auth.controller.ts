import { Body, Controller, Get, Post, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CasdoorService } from './casdoor.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly casdoorService: CasdoorService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  @ApiOperation({ summary: 'Redirect to Casdoor login page' })
  @ApiResponse({ status: 302, description: 'Redirect to Casdoor' })
  async login(@Res() res: Response) {
    const redirectUri = this.configService.get<string>('CASDOOR_REDIRECT_URI')!;
    const url = this.casdoorService.getLoginUrl(redirectUri);
    return res.redirect(url);
  }

  @Get('callback')
  @ApiOperation({ summary: 'Handle Casdoor OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with cookies' })
  async callback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      throw new UnauthorizedException('Missing authorization code');
    }

    const { token, refreshToken } = await this.authService.loginWithCasdoorCode(code);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 1000 * 60 * 60,
    };

    const refreshCookieOptions = {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    };

    res.cookie('accessToken', token, cookieOptions);
    res.cookie('refreshToken', refreshToken, refreshCookieOptions);

    return res.redirect(frontendUrl);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT access token' })
  @ApiResponse({ status: 200, description: 'Return new access token in cookie' })
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    if (!refreshToken) throw new UnauthorizedException('Missing refresh token');

    const { token: newAccessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 1000 * 60 * 60,
    };

    const refreshCookieOptions = {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    };

    res.cookie('accessToken', newAccessToken, cookieOptions);
    res.cookie('refreshToken', newRefreshToken, refreshCookieOptions);

    return res.json({ message: 'Token refreshed' });
  }
}
