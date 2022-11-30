/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_userId_fkey";

-- DropTable
DROP TABLE "task";

-- CreateTable
CREATE TABLE "student-task" (
    "taskId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "student-task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "teacher-task" (
    "taskId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" JSONB[],
    "name" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "teacher-task_pkey" PRIMARY KEY ("taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "student-task_hash_key" ON "student-task"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "teacher-task_hash_key" ON "teacher-task"("hash");

-- AddForeignKey
ALTER TABLE "student-task" ADD CONSTRAINT "student-task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher-task" ADD CONSTRAINT "teacher-task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
