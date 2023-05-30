-- DropForeignKey
ALTER TABLE "Moderator" DROP CONSTRAINT "Moderator_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserModeratingCourse" DROP CONSTRAINT "UserModeratingCourse_moderatorId_fkey";

-- DropForeignKey
ALTER TABLE "UserModeratingUnit" DROP CONSTRAINT "UserModeratingUnit_moderatorId_fkey";

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingCourse" ADD CONSTRAINT "UserModeratingCourse_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingUnit" ADD CONSTRAINT "UserModeratingUnit_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
