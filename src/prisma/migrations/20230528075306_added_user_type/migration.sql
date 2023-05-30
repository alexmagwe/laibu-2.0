-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'MODERATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'STUDENT';
