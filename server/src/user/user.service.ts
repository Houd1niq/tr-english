import {
  BadRequestException,
  ForbiddenException,
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
          Teacher: {
            include: {
              Task: true,
            },
          },
        },
      });
      const tasks = teacher.Teacher.Task.map((item) => {
        return { name: item.name, createdAt: item.createdAt, hash: item.hash };
      });
      return {
        name: teacher.name,
        login: teacher.login,
        role: 'teacher',
        tasks,
      };
    } else {
      const student = await this.prisma.user.findUnique({
        where: { login },
        include: {
          Student: {
            include: {
              StudentTask: {
                include: {
                  Task: {
                    select: {
                      name: true,
                      createdAt: true,
                      hash: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return {
        name: student.name,
        login: student.login,
        role: 'student',
        tasks: student.Student.StudentTask.map((item) => {
          return {
            name: item.Task.name,
            createdAt: item.Task.createdAt,
            hash: item.Task.hash,
          };
        }),
      };
    }
  }

  async getTaskByHash(hash: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        hash,
      },
    });
    if (!task) throw new BadRequestException('Такого задания не существует');
    return task;
  }

  async getTaskStatistic(hash: string, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        hash,
      },
    });

    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id: userId,
      },
    });

    if (!teacher)
      throw new BadRequestException('Такого пользователя не существует');
    if (!task) throw new BadRequestException('Такого задания не существует');

    if (teacher && task.teacherId === teacher.id) {
      const studentTasks = await this.prisma.studentTask.findMany({
        where: { taskId: task.taskId },
        select: {
          Student: {
            include: {
              User: {
                select: {
                  name: true,
                },
              },
            },
          },
          cardsComplete: true,
          learningComplete: true,
          testComplete: true,
          testCorrectNumber: true,
          learnCorrectNumber: true,
        },
      });
      let studentStatisticForTask = studentTasks.map((item) => {
        const obj = {
          ...item,
          studentName: item.Student.User.name,
        };
        delete obj.Student;
        return obj;
      });
      return { ...task, studentStatistic: studentStatisticForTask };
    }
  }

  async createTask(id: number, dto: TaskDto) {
    return this.prisma.task.create({
      data: {
        teacherId: id,
        name: dto.name,
        hash: dto.hash,
        value: dto.value,
      },
    });
  }

  async updateStudentTask(id: number, dto: UpdateStudentTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Student: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user.Student) {
      throw new BadRequestException('Такого пользователя не существует');
    }

    const task = await this.prisma.task.findUnique({
      where: {
        hash: dto.hash,
      },
    });
    const studentTask = await this.prisma.studentTask.update({
      where: {
        taskId_studentId: {
          taskId: task.taskId,
          studentId: user.Student.id,
        },
      },
      data: {
        testCorrectNumber: dto.testCorrectNumber,
        learnCorrectNumber: dto.learnCorrectNumber,
        cardsComplete: dto.cardsComplete,
        learningComplete: dto.learningComplete,
        testComplete: dto.testComplete,
      },
    });
  }

  async getStudentTask(id: number, hash: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Student: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user.Student) {
      throw new BadRequestException('Такого пользователя не существует');
    }

    const task = await this.prisma.task.findUnique({
      where: {
        hash,
      },
    });
    const studentTask = await this.prisma.studentTask.findUnique({
      where: {
        taskId_studentId: {
          taskId: task.taskId,
          studentId: user.Student.id,
        },
      },
    });
    if (!studentTask) {
      throw new BadRequestException('Такого задания не существует');
    }
    return studentTask;
  }

  async addStudentTask(id: number, dto: StudentTaskDto) {
    const student = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Student: {
          select: {
            id: true,
          },
        },
      },
    });
    const task = await this.prisma.task.findUnique({
      where: {
        hash: dto.hash,
      },
      select: {
        taskId: true,
      },
    });
    if (!task) throw new BadRequestException('Задание не найдено');

    return this.prisma.studentTask.create({
      data: {
        studentId: student.Student.id,
        taskId: task.taskId,
      },
    });
  }

  private async getUserRole(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
      include: {
        Teacher: true,
        Student: true,
      },
    });
    if (!user) throw new UnauthorizedException('Польозватель не найден');

    const isStudent = user.Student?.userId === user.id;
    const isTeacher = user.Teacher?.userId === user.id;
    if (isStudent && isTeacher) {
      throw new ForbiddenException(
        'Пользователь не может быть и учителем и учеником одновременно',
      );
    }
    if (isStudent) return 'student';
    if (isTeacher) return 'teacher';
    // check in teacher or student table
  }
}
