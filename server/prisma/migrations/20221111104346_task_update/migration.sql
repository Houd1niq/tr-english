/*
  Warnings:

  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "createdAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "task_hash_key" ON "task"("hash");
