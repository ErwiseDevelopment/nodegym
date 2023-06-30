-- AlterTable
ALTER TABLE "users" ALTER COLUMN "enterprise" DROP NOT NULL,
ALTER COLUMN "password_hash" DROP NOT NULL;
