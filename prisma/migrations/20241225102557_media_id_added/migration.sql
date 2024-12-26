/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Room` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "expiresAt";
