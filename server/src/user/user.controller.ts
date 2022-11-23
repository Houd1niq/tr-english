import {
  Body,
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadType } from '../auth/strategies';
import { StudentTaskDto, TaskDto, UpdateStudentTaskDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async get(@Req() req: Request) {
    const user = req.user as PayloadType;
    return await this.userService.getUserInfo(user.login);
  }
  @Post('create-task')
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Req() req: Request, @Body() task: TaskDto) {
    const user = req.user as PayloadType;
    return await this.userService.createTask(user.id, task);
  }

  @Post('student-task')
  @UseGuards(AuthGuard('jwt'))
  async addStudentTask(@Req() req: Request, @Body() task: StudentTaskDto) {
    const user = req.user as PayloadType;
    return await this.userService.addStudentTask(user.id, task);
  }

  @Put('student-task')
  @UseGuards(AuthGuard('jwt'))
  async updateStudentTask(
    @Req() req: Request,
    @Body()
    task: UpdateStudentTaskDto,
  ) {
    const user = req.user as PayloadType;
    return await this.userService.updateStudentTask(user.id, task);
  }

  // @Get('student-task/:hash')
  // @UseGuards(AuthGuard('jwt'))
  // async getStudentTask(
  //   @Req() req: Request,
  //   @Param('hash') taskUrlHash: string,
  // ) {
  //   const user = req.user as PayloadType;
  //   return await this.userService.getStudentTask(user.id, taskUrlHash);
  // }
  @Get('task-info/:hash')
  async getTaskInfo(@Param('hash') taskUrlHash: string) {
    return await this.userService.getTask(taskUrlHash);
  }
}
