// src/menu/menu.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuGroupDto } from './dto/menu.dto';
import { MenuGroup } from '@prisma/client';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('group')
  async createMenuGroup(@Body() data: CreateMenuGroupDto): Promise<MenuGroup> {
    return this.menuService.createGroup(data);
  }

  @Post('assign-menu')
  async assignMenuToUser(
    @Body() data: { userId: string; menuGroupId: string },
  ) {
    return this.menuService.assignMenuGroupToUser(
      data.userId,
      data.menuGroupId,
    );
  }

  @Get('my-menu')
  async getUserMenu(@Query('userId') userId: string) {
    if (!userId) {
      throw new NotFoundException('UserId is required');
    }
    return this.menuService.getUserMenu(userId);
  }

  @Get('groups')
  async getAllMenuGroups(): Promise<MenuGroup[]> {
    return this.menuService.getAllMenuGroups();
  }

  @Put('group/:slug')
  async updateMenuGroup(
    @Param('slug') slug: string,
    @Body() data: Partial<CreateMenuGroupDto>,
  ): Promise<MenuGroup> {
    return this.menuService.updateMenuGroup(slug, data);
  }

  @Delete('group/:slug')
  async deleteMenuGroup(@Param('slug') slug: string): Promise<void> {
    return this.menuService.deleteMenuGroup(slug);
  }
}
