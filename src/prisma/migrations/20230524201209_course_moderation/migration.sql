/*
  Warnings:

  - The values [Video,Assignment,Content] on the enum `ContentVariant` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hidden` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `UserModeratingUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('ONLY_ME', 'EVERY_ONE', 'COURSE_MEMBERS');

-- AlterEnum
BEGIN;
CREATE TYPE "ContentVariant_new" AS ENUM ('ASSIGNMENT', 'CAT', 'EXAM', 'NOTES');
ALTER TABLE "Content" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Content" ALTER COLUMN "type" TYPE "ContentVariant_new" USING ("type"::text::"ContentVariant_new");
ALTER TYPE "ContentVariant" RENAME TO "ContentVariant_old";
ALTER TYPE "ContentVariant_new" RENAME TO "ContentVariant";
DROP TYPE "ContentVariant_old";
ALTER TABLE "Content" ALTER COLUMN "type" SET DEFAULT 'NOTES';
COMMIT;

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_uploaderId_fkey";

-- DropForeignKey
ALTER TABLE "UserModeratingUnit" DROP CONSTRAINT "UserModeratingUnit_unitId_fkey";

-- DropForeignKey
ALTER TABLE "UserModeratingUnit" DROP CONSTRAINT "UserModeratingUnit_userId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "hidden",
ADD COLUMN     "permissions" "Permissions" NOT NULL DEFAULT 'EVERY_ONE',
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "type" SET DEFAULT 'NOTES';

-- DropTable
DROP TABLE "UserModeratingUnit";

-- CreateTable
CREATE TABLE "UserModeratingCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT,
    "year" INTEGER,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "UserModeratingCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserModeratingCourse" ADD CONSTRAINT "UserModeratingCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingCourse" ADD CONSTRAINT "UserModeratingCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "UserModeratingCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
