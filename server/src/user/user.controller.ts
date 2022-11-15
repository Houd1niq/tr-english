import { Body, Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadType } from '../auth/strategies';
import { TaskDto } from './dto';

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
}
