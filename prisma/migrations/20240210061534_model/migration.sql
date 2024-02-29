/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `paypament_method` on the `Donations` table. All the data in the column will be lost.
  - You are about to drop the column `paypament_status` on the `Donations` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_charge_id` on the `Donations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Donations` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Post` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paypamentMethod` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paypamentStatus` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeChargeId` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Donations" DROP CONSTRAINT "Donations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropIndex
DROP INDEX "user_id";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "comment_id",
DROP COLUMN "user_id",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "post_id",
DROP COLUMN "timestamp",
DROP COLUMN "user_id",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Donations" DROP COLUMN "paypament_method",
DROP COLUMN "paypament_status",
DROP COLUMN "stripe_charge_id",
DROP COLUMN "user_id",
ADD COLUMN     "paypamentMethod" TEXT NOT NULL,
ADD COLUMN     "paypamentStatus" TEXT NOT NULL,
ADD COLUMN     "stripeChargeId" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "post_id",
DROP COLUMN "user_id",
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "userId" ON "Comments"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
