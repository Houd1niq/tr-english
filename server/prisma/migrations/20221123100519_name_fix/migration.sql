/*
  Warnings:

  - You are about to drop the column `cardCompleteion` on the `student-task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student-task" DROP COLUMN "cardCompleteion",
ADD COLUMN     "cardCompletion" BOOLEAN NOT NULL DEFAULT false;
