/*
  Warnings:

  - The primary key for the `student-task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "student-task" DROP CONSTRAINT "student-task_pkey",
ADD CONSTRAINT "student-task_pkey" PRIMARY KEY ("taskId", "studentId");
