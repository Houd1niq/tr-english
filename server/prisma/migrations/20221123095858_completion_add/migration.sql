-- AlterTable
ALTER TABLE "student-task" ADD COLUMN     "cardCompleteion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learnCompletion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learnCorrectNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "testCompletion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "testCorrectNumber" INTEGER NOT NULL DEFAULT 0;
