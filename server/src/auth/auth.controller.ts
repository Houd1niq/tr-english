import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PayloadType } from './strategies';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() dto: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(dto);
    res.cookie('refresh-token', tokens.refresh_token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return res.send({ accessToken: tokens.access_token });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() dto: RegisterDto, @Res() res: Response) {
    console.log(dto);
    const tokens = await this.authService.signUp(dto);
    res.cookie('refresh-token', tokens.refresh_token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return res.send({ accessToken: tokens.access_token });
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user as PayloadType;
    return await this.authService.logout(user.login);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const rt = req.cookies['refresh-token'];
    const user = req.user as PayloadType;
    const login = user.login;
    const id = user.id;
    const tokens = await this.authService.refresh(id, login, rt);
    res.cookie('refresh-token', tokens.refresh_token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return res.send({ accessToken: tokens.access_token });
  }
}
