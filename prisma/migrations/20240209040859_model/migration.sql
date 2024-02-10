/*
  Warnings:

  - The `typeOf` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeOfEnum" AS ENUM ('normal', 'evento');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "typeOf",
ADD COLUMN     "typeOf" "TypeOfEnum" NOT NULL DEFAULT 'normal';
