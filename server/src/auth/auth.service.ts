import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenTypes } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(dto: AuthDto): Promise<TokenTypes> {
    const candidate = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });
    if (!candidate) {
      throw new ForbiddenException('Неверный логин или пароль');
    }
    const compare = await bcrypt.compare(dto.password, candidate.hash);
    if (!compare) throw new ForbiddenException('Неверный логин или пароль');
    const tokens = await this.getTokens(candidate.id, candidate.login);
    await this.updateHashRtInDB(candidate.login, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: RegisterDto): Promise<TokenTypes> {
    const hash = await this.hashData(dto.password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          role: dto.role,
          login: dto.login,
          hash,
        },
      });

      // Добавление в профиль ученика задания по умолчанию, для демонстрации функционала
      if (dto.role === 'student') {
        await this.prisma.studentTask.create({
          data: {
            userId: newUser.id,
            name: 'Тестовое задание',
            hash: 'DVxzVO1s9Pt9HoX',
          },
        });
      }

      const tokens = await this.getTokens(newUser.id, newUser.login);
      await this.updateHashRtInDB(newUser.login, tokens.refresh_token);
      return tokens;
    } catch (e) {
      throw new ForbiddenException(
        'Пользователь с такими логином уже существует',
      );
    }
  }

  async logout(login: string) {
    await this.prisma.user.update({
      where: { login },
      data: {
        hashedRt: null,
      },
    });
    return { login, message: 'logged out' };
  }

  async refresh(id: number, login: string, rt: string) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (!candidate || !candidate.hashedRt) {
      throw new ForbiddenException('Access denied');
    }
    const comparedRt = await bcrypt.compare(rt, candidate.hashedRt);
    if (!comparedRt) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(id, login);
    await this.updateHashRtInDB(login, tokens.refresh_token);
    return tokens;
  }

  async updateHashRtInDB(login: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: { login },
      data: { hashedRt: hash },
    });
  }

  async getTokens(id: number, login: string): Promise<TokenTypes> {
    const [rt, at] = await Promise.all([
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret123' },
      ),
      this.jwtService.signAsync(
        { id, login },
        { expiresIn: 60 * 60, secret: 'at-secret123' },
      ),
    ]);
    return { refresh_token: rt, access_token: at };
  }
  private hashData(value: string): Promise<string> {
    return bcrypt.hash(value, 5);
  }
}
