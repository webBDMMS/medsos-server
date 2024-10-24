-- AlterTable
ALTER TABLE "users" ADD COLUMN     "menu_group_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_menu_group_id_fkey" FOREIGN KEY ("menu_group_id") REFERENCES "menu_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
