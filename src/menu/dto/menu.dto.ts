// src/menu/dto/menu.dto.ts

import { Role } from '@prisma/client';

export interface MenuItem {
  title: string;
  href?: string;
  icon?: string;
  label: string;
  children?: MenuItem[];
  order?: number;
}

export interface CreateMenuGroupDto {
  name: string;
  description?: string;
  slug: string;
  role: Role;
  menuItems: MenuItem[];
}

export interface MenuTreeItem extends MenuItem {
  id: string;
  parentId?: string;
  groupId: string;
}
