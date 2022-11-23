/*
  Warnings:

  - You are about to drop the column `cardCompletion` on the `student-task` table. All the data in the column will be lost.
  - You are about to drop the column `learnCompletion` on the `student-task` table. All the data in the column will be lost.
  - You are about to drop the column `testCompletion` on the `student-task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student-task" DROP COLUMN "cardCompletion",
DROP COLUMN "learnCompletion",
DROP COLUMN "testCompletion",
ADD COLUMN     "cardsComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learningComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "testComplete" BOOLEAN NOT NULL DEFAULT false;
