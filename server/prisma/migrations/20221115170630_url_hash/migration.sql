/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "task_hash_key" ON "task"("hash");
