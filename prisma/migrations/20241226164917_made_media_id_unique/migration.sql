/*
  Warnings:

  - A unique constraint covering the columns `[mediaId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_mediaId_key" ON "File"("mediaId");
