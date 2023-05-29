-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "userModeratingUnitId" TEXT;

-- AlterTable
ALTER TABLE "UserModeratingCourse" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserModeratingUnit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT,
    "year" INTEGER,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "UserModeratingUnit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserModeratingUnit" ADD CONSTRAINT "UserModeratingUnit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModeratingUnit" ADD CONSTRAINT "UserModeratingUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userModeratingUnitId_fkey" FOREIGN KEY ("userModeratingUnitId") REFERENCES "UserModeratingUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
