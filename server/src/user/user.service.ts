import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from './dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(login: string) {
    const role = await this.getUserRole(login);
    if (role === 'teacher') {
      const teacher = await this.prisma.user.findUnique({
        where: { login },
        include: {
          tasks: true,
        },
      });
      const tasks = teacher.tasks.map((item) => {
        return { name: item.name, createdAt: item.createdAt, hash: item.hash };
      });
      return {
        name: teacher.name,
        login: teacher.login,
        role: teacher.role,
        tasks,
      };
    } else {
      const student = await this.prisma.user.findUnique({
        where: { login },
        include: {
          tasks: false,
        },
      });
      return {
        name: student.name,
        login: student.login,
        role: student.role,
      };
    }
  }

  async getTask(hash: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        hash,
      },
    });
    if (!task) throw new BadRequestException('Такого задания не существует');
    return task;
  }

  async createTask(id: number, dto: TaskDto) {
    const task = this.prisma.task.create({
      data: {
        userId: id,
        name: dto.name,
        hash: dto.hash,
        value: dto.value,
      },
    });
    return task;
  }

  private async getUserRole(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
      select: {
        role: true,
      },
    });
    if (!user) throw new UnauthorizedException('Польозватель не найден');
    return user.role;
  }
}
