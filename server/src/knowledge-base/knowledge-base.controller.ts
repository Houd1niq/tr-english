import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {
  AddToKnowledgeBaseItemDto,
  ChangeKnowledgeBaseItemDto,
  CheckKnowledgeBaseItemDto,
} from './dto';
import { PayloadType } from '../auth/strategies';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private kn: KnowledgeBaseService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addToKnowledgeBase(
    @Req() req: Request,
    @Body() task: AddToKnowledgeBaseItemDto,
    @Res() res: Response,
  ) {
    const user = req.user as PayloadType;
    await this.kn.addToKnowledgeBase(task, user.id);
    res.status(200);
    return res.send({ message: 'success' });
  }

  @Get('get')
  @UseGuards(AuthGuard('jwt'))
  async getKnowledgeBase(@Req() req: Request) {
    const user = req.user as PayloadType;
    return await this.kn.getKnowledgeBase(user.id);
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateKnowledgeBase(
    @Req() req: Request,
    @Body() body: ChangeKnowledgeBaseItemDto,
    @Res() res: Response,
  ) {
    const user = req.user as PayloadType;
    await this.kn.changeKnowledgeBase(user.id, body);
    res.status(200);
    return res.send();
  }

  @Put('check')
  @UseGuards(AuthGuard('jwt'))
  async checkKnowledgeBaseItem(
    @Req() req: Request,
    @Body() body: CheckKnowledgeBaseItemDto,
    @Res() res: Response,
  ) {
    const user = req.user as PayloadType;
    await this.kn.checkKnowledgeBaseItem(user.id, body);
    res.status(200);
    return res.send();
  }

  @Get('tasks/:count')
  @UseGuards(AuthGuard('jwt'))
  async getKnowledgeBaseTask(
    @Req() req: Request,
    @Param('count') count: string,
  ) {
    const user = req.user as PayloadType;
    return await this.kn.getKnowledgeBaseTasks(user.id, Number(count));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteKnowledgeBaseItem(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const user = req.user as PayloadType;
    const itemId = Number(id);
    await this.kn.deleteKnowledgeBaseItem(user.id, itemId);
    res.status(200);
    return res.send();
  }
}
