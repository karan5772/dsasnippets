/*
  Warnings:

  - You are about to drop the column `codeSnipet` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `dificulty` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `codeSnippets` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "codeSnipet",
DROP COLUMN "dificulty",
DROP COLUMN "discription",
ADD COLUMN     "codeSnippets" JSONB NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- DropEnum
DROP TYPE "Dificulty";
