// src/menu/menu.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuGroup, MenuItem as PrismaMenuItem } from '@prisma/client';
import { CreateMenuGroupDto, MenuItem } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createGroup(data: CreateMenuGroupDto): Promise<MenuGroup> {
    try {
      // First create the menu group
      const group = await this.prisma.menuGroup.create({
        data: {
          name: data.name,
          description: data.description,
          slug: data.slug,
          role: data.role,
          isActive: true,
        },
      });

      // Then create all menu items
      if (data.menuItems && data.menuItems.length > 0) {
        await this.createMenuItems(data.menuItems, null, group.id);
      }

      return group;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error(`Menu group with slug ${data.slug} already exists`);
      }
      throw error;
    }
  }

  private async createMenuItems(
    items: MenuItem[],
    parentId: string | null,
    groupId: string,
  ): Promise<void> {
    for (const [index, item] of items.entries()) {
      const menuItem = await this.prisma.menuItem.create({
        data: {
          title: item.title,
          href: item.href,
          icon: item.icon,
          label: item.label,
          order: item.order || index,
          parentId: parentId,
          groupId: groupId,
        },
      });

      if (item.children && item.children.length > 0) {
        await this.createMenuItems(item.children, menuItem.id, groupId);
      }
    }
  }

  async assignMenuGroupToUser(userId: string, menuGroupId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const menuGroup = await this.prisma.menuGroup.findUnique({
      where: { id: menuGroupId },
    });

    if (!user || !menuGroup) {
      throw new NotFoundException('User or MenuGroup not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        menuGroupId: menuGroupId,
      },
      include: {
        menuGroup: true,
      },
    });
  }

  async getUserMenu(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        menuGroup: {
          include: {
            menuItems: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.menuGroup) {
      throw new NotFoundException(`No menu group assigned to user ${userId}`);
    }

    // Return new format
    return {
      group_name: user.menuGroup.name,
      data: this.buildMenuTree(user.menuGroup.menuItems),
    };
  }

  async deleteMenuGroup(slug: string): Promise<void> {
    const group = await this.prisma.menuGroup.findUnique({
      where: { slug },
    });

    if (!group) {
      throw new NotFoundException(`Menu group with slug ${slug} not found`);
    }

    await this.prisma.menuGroup.delete({
      where: { slug },
    });
  }

  async updateMenuGroup(
    slug: string,
    data: Partial<CreateMenuGroupDto>,
  ): Promise<MenuGroup> {
    const group = await this.prisma.menuGroup.findUnique({
      where: { slug },
    });

    if (!group) {
      throw new NotFoundException(`Menu group with slug ${slug} not found`);
    }

    // If new menu items are provided, delete old ones and create new ones
    if (data.menuItems) {
      await this.prisma.menuItem.deleteMany({
        where: { groupId: group.id },
      });
      await this.createMenuItems(data.menuItems, null, group.id);
    }

    // Update group details
    return this.prisma.menuGroup.update({
      where: { slug },
      data: {
        name: data.name,
        description: data.description,
        role: data.role,
      },
    });
  }

  private buildMenuTree(
    items: PrismaMenuItem[],
    parentId: string | null = null,
  ): MenuItem[] {
    const menuTree: MenuItem[] = [];

    for (const item of items) {
      if (item.parentId === parentId) {
        const children = this.buildMenuTree(items, item.id);
        const menuItem: MenuItem = {
          title: item.title,
          href: item.href || undefined,
          icon: item.icon || undefined,
          label: item.label,
        };

        if (children.length > 0) {
          menuItem.children = children;
        }

        menuTree.push(menuItem);
      }
    }

    return menuTree;
  }

  async getAllMenuGroups(): Promise<MenuGroup[]> {
    return this.prisma.menuGroup.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
