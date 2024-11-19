-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "roomCode" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mediaAccessLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomCode_key" ON "Room"("roomCode");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_roomCode_fkey" FOREIGN KEY ("roomCode") REFERENCES "Room"("roomCode") ON DELETE CASCADE ON UPDATE CASCADE;
