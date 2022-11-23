import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StudentTaskDto, TaskDto, UpdateStudentTaskDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(login: string) {
    const role = await this.getUserRole(login);
    if (role === 'teacher') {
      const teacher = await this.prisma.user.findUnique({
        where: { login },
        include: {
          teacherTasks: true,
        },
      });
      const tasks = teacher.teacherTasks.map((item) => {
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
          studentTasks: true,
        },
      });
      return {
        name: student.name,
        login: student.login,
        role: student.role,
        tasks: student.studentTasks,
      };
    }
  }

  async getTask(hash: string) {
    const task = await this.prisma.teacherTask.findUnique({
      where: {
        hash,
      },
    });
    if (!task) throw new BadRequestException('Такого задания не существует');
    return task;
  }

  async createTask(id: number, dto: TaskDto) {
    return await this.prisma.teacherTask.create({
      data: {
        userId: id,
        name: dto.name,
        hash: dto.hash,
        value: dto.value,
      },
    });
  }

  async updateStudentTask(id: number, dto: UpdateStudentTaskDto) {
    return await this.prisma.studentTask.update({
      where: {
        hash_userId: {
          hash: dto.hash,
          userId: id,
        },
      },
      data: {
        ...dto,
      },
    });
  }

  async addStudentTask(id: number, dto: StudentTaskDto) {
    const allUserTasks = await this.prisma.studentTask.findMany({
      where: {
        userId: id,
      },
    });
    const check = allUserTasks.some((item) => {
      return item.hash === dto.hash;
    });
    if (check) {
      return allUserTasks.find((item) => {
        return item.hash === dto.hash;
      });
    } else {
      return await this.prisma.studentTask.create({
        data: {
          userId: id,
          name: dto.name,
          hash: dto.hash,
        },
      });
    }
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
