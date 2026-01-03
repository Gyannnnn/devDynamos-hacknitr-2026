/*
  Warnings:

  - The `fieldOfExpertise` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FOE" AS ENUM ('WEB_DEVELOPEMENT', 'ANDROID_DEVELOPMENT', 'IOS_DEVELOPMENT', 'OPERATING_SYSTEM', 'CYBER_SECURITY', 'COMPILER_DESIGN', 'COMPUTER_NETWORK', 'THEORY_OF_COMPUTATION', 'AIML');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fieldOfExpertise",
ADD COLUMN     "fieldOfExpertise" "FOE";

-- CreateTable
CREATE TABLE "_UserFollowsMentor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFollowsMentor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFollowsMentor_B_index" ON "_UserFollowsMentor"("B");

-- AddForeignKey
ALTER TABLE "_UserFollowsMentor" ADD CONSTRAINT "_UserFollowsMentor_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowsMentor" ADD CONSTRAINT "_UserFollowsMentor_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
