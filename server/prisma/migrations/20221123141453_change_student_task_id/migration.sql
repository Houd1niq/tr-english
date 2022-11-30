/*
  Warnings:

  - The primary key for the `student-task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskId` on the `student-task` table. All the data in the column will be lost.
  - Made the column `userId` on table `student-task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "student-task" DROP CONSTRAINT "student-task_userId_fkey";

-- AlterTable
ALTER TABLE "student-task" DROP CONSTRAINT "student-task_pkey",
DROP COLUMN "taskId",
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "student-task_pkey" PRIMARY KEY ("hash", "userId");

-- AddForeignKey
ALTER TABLE "student-task" ADD CONSTRAINT "student-task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
