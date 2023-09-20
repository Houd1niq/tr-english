/*
  Warnings:

  - The primary key for the `student-task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hash` on the `student-task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student-task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `student-task` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `teacher-task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentId` to the `student-task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `student-task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student-task" DROP CONSTRAINT "student-task_userId_fkey";

-- DropForeignKey
ALTER TABLE "teacher-task" DROP CONSTRAINT "teacher-task_userId_fkey";

-- AlterTable
ALTER TABLE "student-task" DROP CONSTRAINT "student-task_pkey",
DROP COLUMN "hash",
DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD CONSTRAINT "student-task_pkey" PRIMARY KEY ("taskId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "email" VARCHAR(255);

-- DropTable
DROP TABLE "teacher-task";

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "taskId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" JSONB[],
    "name" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_hash_key" ON "task"("hash");

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-task" ADD CONSTRAINT "student-task_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-task" ADD CONSTRAINT "student-task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
