/*
  Warnings:

  - The `typeOf` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeOfPostEnum" AS ENUM ('normal', 'evento');

-- CreateEnum
CREATE TYPE "TypeOfRoleEnum" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "typeOf",
ADD COLUMN     "typeOf" "TypeOfPostEnum" NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRole",
ADD COLUMN     "userRole" "TypeOfRoleEnum" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "TypeOfEnum";
