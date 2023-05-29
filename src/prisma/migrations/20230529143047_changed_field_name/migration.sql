/*
  Warnings:

  - You are about to drop the column `userId` on the `UserModeratingUnit` table. All the data in the column will be lost.
  - Made the column `moderatorId` on table `UserModeratingUnit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserModeratingUnit" DROP CONSTRAINT "UserModeratingUnit_moderatorId_fkey";

-- AlterTable
ALTER TABLE "UserModeratingUnit" DROP COLUMN "userId",
ALTER COLUMN "moderatorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserModeratingUnit" ADD CONSTRAINT "UserModeratingUnit_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
