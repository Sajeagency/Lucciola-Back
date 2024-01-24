/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comments_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `content_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the `FacebookUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GoogleUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[FacebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Post_id` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FacebookUser" DROP CONSTRAINT "FacebookUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_User_id_fkey";

-- DropForeignKey
ALTER TABLE "GoogleUser" DROP CONSTRAINT "GoogleUser_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "comments_id",
DROP COLUMN "content_id",
ADD COLUMN     "Post_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ExternalAccessToken" TEXT,
ADD COLUMN     "FacebookId" TEXT,
ADD COLUMN     "ProfilePictureURL" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "contrasena" DROP NOT NULL;

-- DropTable
DROP TABLE "FacebookUser";

-- DropTable
DROP TABLE "Gallery";

-- DropTable
DROP TABLE "GoogleUser";

-- CreateTable
CREATE TABLE "Post" (
    "TypeOf" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "imgName" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Post_id" INTEGER NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "Answer" TEXT NOT NULL,
    "Comment_id" INTEGER NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_FacebookId_key" ON "User"("FacebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_Post_id_fkey" FOREIGN KEY ("Post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_Post_id_fkey" FOREIGN KEY ("Post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_Comment_id_fkey" FOREIGN KEY ("Comment_id") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
