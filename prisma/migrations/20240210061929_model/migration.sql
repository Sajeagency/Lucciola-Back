/*
  Warnings:

  - You are about to drop the column `typeOf` on the `Post` table. All the data in the column will be lost.
  - The `userRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypePostEnum" AS ENUM ('normal', 'evento');

-- CreateEnum
CREATE TYPE "TypeRoleEnum" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "typeOf",
ADD COLUMN     "typePost" "TypePostEnum" NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRole",
ADD COLUMN     "userRole" "TypeRoleEnum" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "TypeOfPostEnum";

-- DropEnum
DROP TYPE "TypeOfRoleEnum";
