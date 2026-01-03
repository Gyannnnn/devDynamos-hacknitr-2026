/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "USER" ADD VALUE 'Admin';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "USER" NOT NULL;
