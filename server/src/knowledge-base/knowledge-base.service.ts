import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AddToKnowledgeBaseItemDto,
  ChangeKnowledgeBaseItemDto,
  CheckKnowledgeBaseItemDto,
} from './dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(private prisma: PrismaService) {}

  async checkKnowledgeBaseItem(
    userId: number,
    body: CheckKnowledgeBaseItemDto,
  ) {
    const item = await this.checkIfUserHasKnBaseItem(userId, body.id);
    if (!item) throw new ForbiddenException("You don't have this item");

    await this.prisma.knowledgeBaseItem.update({
      where: {
        itemId: body.id,
      },
      data: {
        correctCounter:
          body.isRight === 'correct'
            ? item.correctCounter + 1
            : item.correctCounter,
        wrongCounter:
          body.isRight === 'wrong' ? item.wrongCounter + 1 : item.wrongCounter,
      },
    });
  }

  // method getKnowledgeBaseTasks should analyze user's KnowledgeBaseItems, randomly choose 10 items and return them, but items with wrongCounter > correctCounter should be not randomly chosen
  async getKnowledgeBaseTasks(userId: number, count: number) {
    const user = await this.getUserWithKnBase(userId);
    const items = user.Student.KnowledgeBase.KnowledgeBaseItem;

    if (items.length < count) {
      return items;
    }

    const wrongItems = items.filter((item) => {
      return item.wrongCounter > item.correctCounter;
    });
    if (wrongItems.length < count) {
      const rightItems = items.filter((item) => {
        return item.wrongCounter <= item.correctCounter;
      });
      const randomItems = this.getRandomItems(
        rightItems,
        count - wrongItems.length,
      );
      return [...wrongItems, ...randomItems];
    }
    return this.getRandomItems(wrongItems, count);
  }

  async getKnowledgeBase(userId: number) {
    const user = await this.getUserWithKnBase(userId);
    return user.Student.KnowledgeBase;
  }

  async deleteKnowledgeBaseItem(userId: number, itemId: number) {
    const item = await this.checkIfUserHasKnBaseItem(userId, itemId);
    if (!item) throw new ForbiddenException("You don't have this item");

    await this.prisma.knowledgeBaseItem.delete({
      where: {
        itemId: itemId,
      },
    });
  }

  async changeKnowledgeBase(userId: number, task: ChangeKnowledgeBaseItemDto) {
    const item = await this.checkIfUserHasKnBaseItem(userId, task.id);
    if (!item) throw new ForbiddenException("You don't have this item");

    await this.prisma.knowledgeBaseItem.update({
      where: {
        itemId: task.id,
      },
      data: {
        engWord: task.engWord,
        rusWord: task.rusWord,
      },
    });
  }

  async addToKnowledgeBase(task: AddToKnowledgeBaseItemDto, userId: number) {
    const user = await this.getUserWithKnBase(userId);
    let knBaseId: number;
    if (!user.Student.KnowledgeBase) {
      const newKnBase = await this.prisma.knowledgeBase.create({
        data: {
          studentId: user.Student.id,
        },
      });
      knBaseId = newKnBase.id;
    } else knBaseId = user.Student.KnowledgeBase.id;

    await this.prisma.knowledgeBaseItem.create({
      data: {
        knowledgeBaseId: knBaseId,
        engWord: task.engWord,
        rusWord: task.rusWord,
      },
    });
  }

  private async checkIfUserHasKnBaseItem(userId: number, itemId: number) {
    const user = await this.getUserWithKnBase(userId);
    return user.Student.KnowledgeBase.KnowledgeBaseItem.find((item) => {
      return item.itemId === itemId;
    });
  }

  private async getUserWithKnBase(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Student: {
          include: {
            KnowledgeBase: {
              include: {
                KnowledgeBaseItem: true,
              },
            },
          },
        },
      },
    });
  }

  private getRandomItems(items: any[], count: number) {
    const randomItems = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      randomItems.push(items[randomIndex]);
      items.splice(randomIndex, 1);
    }
    return randomItems;
  }
}
