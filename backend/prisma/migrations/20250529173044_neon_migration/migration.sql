/*
  Warnings:

  - You are about to drop the column `playliistId` on the `ProblemsInPlaylist` table. All the data in the column will be lost.
  - Added the required column `playlistId` to the `ProblemsInPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProblemsInPlaylist" DROP CONSTRAINT "ProblemsInPlaylist_playliistId_fkey";

-- AlterTable
ALTER TABLE "ProblemsInPlaylist" DROP COLUMN "playliistId",
ADD COLUMN     "playlistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProblemsInPlaylist" ADD CONSTRAINT "ProblemsInPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
