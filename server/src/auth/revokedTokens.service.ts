import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RevokedTokensService {
  constructor(private prisma: PrismaService) {}

  async revoke(userId: number) {
    await this.prisma.usersWithRevokedTokens.create({
      data: {
        userId: userId,
      },
    });
  }

  async checkIfRevoked(userId: number): Promise<boolean> {
    const candidate = await this.prisma.usersWithRevokedTokens.findFirst({
      where: {
        userId: userId,
      },
    });
    return !!candidate;
  }

  async unRevoke(userId: number) {
    await this.prisma.usersWithRevokedTokens.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
