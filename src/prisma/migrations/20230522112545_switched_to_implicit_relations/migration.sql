/*
  Warnings:

  - You are about to drop the `CourseUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseUnit" DROP CONSTRAINT "CourseUnit_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUnit" DROP CONSTRAINT "CourseUnit_unitId_fkey";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Core';

-- DropTable
DROP TABLE "CourseUnit";

-- CreateTable
CREATE TABLE "_CourseToUnit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToUnit_AB_unique" ON "_CourseToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToUnit_B_index" ON "_CourseToUnit"("B");

-- AddForeignKey
ALTER TABLE "_CourseToUnit" ADD CONSTRAINT "_CourseToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToUnit" ADD CONSTRAINT "_CourseToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
