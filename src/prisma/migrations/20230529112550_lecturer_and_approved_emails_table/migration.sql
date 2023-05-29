/*
  Warnings:

  - You are about to drop the column `approved` on the `UserModeratingUnit` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `UserModeratingUnit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserModeratingCourse" DROP CONSTRAINT "UserModeratingCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserModeratingUnit" DROP CONSTRAINT "UserModeratingUnit_userId_fkey";

-- AlterTable
ALTER TABLE "UserModeratingCourse" ADD COLUMN     "moderatorId" TEXT;

-- AlterTable
ALTER TABLE "UserModeratingUnit" DROP COLUMN "approved",
DROP COLUMN "phoneNumber",
ADD COLUMN     "moderatorId" TEXT;

-- CreateTable
CREATE TABLE "ApprovedEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApprovedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moderator" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApprovedEmail_email_key" ON "ApprovedEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Moderator_userId_key" ON "Moderator"("userId");

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingCourse" ADD CONSTRAINT "UserModeratingCourse_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingUnit" ADD CONSTRAINT "UserModeratingUnit_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
