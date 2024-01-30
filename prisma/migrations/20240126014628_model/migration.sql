/*
  Warnings:

  - You are about to drop the column `Answer` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `Comment_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `Post_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `Donations` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUrl` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `Post_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `TypeOf` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ExternalAccessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `FacebookId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ProfilePictureURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserRole` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contrasena` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userRole]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOf` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_Comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_Post_id_fkey";

-- DropForeignKey
ALTER TABLE "Donations" DROP CONSTRAINT "Donations_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_Post_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_User_id_fkey";

-- DropIndex
DROP INDEX "User_Email_key";

-- DropIndex
DROP INDEX "User_FacebookId_key";

-- DropIndex
DROP INDEX "User_UserRole_key";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "Answer",
DROP COLUMN "Comment_id",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "comment_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "Post_id",
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Donations" DROP COLUMN "User_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "ImageUrl",
DROP COLUMN "Post_id",
DROP COLUMN "User_id",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Description",
DROP COLUMN "Title",
DROP COLUMN "TypeOf",
DROP COLUMN "User_id",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "typeOf" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Email",
DROP COLUMN "ExternalAccessToken",
DROP COLUMN "FacebookId",
DROP COLUMN "ProfilePictureURL",
DROP COLUMN "UserName",
DROP COLUMN "UserRole",
DROP COLUMN "contrasena",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "externalAccessToken" TEXT,
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "profilePictureURL" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "userRole" TEXT NOT NULL DEFAULT 'NormalProfile';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userRole_key" ON "User"("userRole");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
