import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenTypes } from './types';
import { JwtService } from '@nestjs/jwt';
import { RevokedTokensService } from './revokedTokens.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private revokedTokensService: RevokedTokensService,
  ) {}

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
    await this.revokedTokensService.unRevoke(candidate.id);
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
          login: dto.login,
          hash,
        },
      });
      if (dto.role === 'teacher') {
        await this.prisma.teacher.create({
          data: {
            userId: newUser.id,
          },
        });
      } else if (dto.role === 'student') {
        const student = await this.prisma.student.create({
          data: {
            userId: newUser.id,
          },
        });

        //adding demo task to every new student
        // await this.prisma.studentTask.create({
        //   data: {
        //     studentId: student.id,
        //     taskId: 1,
        //   },
        // });

        await this.prisma.knowledgeBase.create({
          data: {
            studentId: student.id,
          },
        });
      }

      const tokens = await this.getTokens(newUser.id, newUser.login);
      await this.updateHashRtInDB(newUser.login, tokens.refresh_token);
      return tokens;
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(
        'Пользователь с такими логином уже существует',
      );
    }
  }

  async logout(login: string, userId: number) {
    await this.revokedTokensService.revoke(userId);
    await this.prisma.user.update({
      where: { login },
      data: {
        hashedRt: null,
      },
    });
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
