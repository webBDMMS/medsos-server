/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('pj_cabang', 'admin', 'pj_pusat');

-- AlterTable
ALTER TABLE "menu_groups" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'pj_cabang';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'pj_cabang';
