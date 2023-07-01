/*
  Warnings:

  - You are about to drop the column `enterprise_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_enterprise_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "enterprise_id";
