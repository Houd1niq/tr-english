/*
  Warnings:

  - You are about to drop the column `hash` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[urlHash]` on the table `task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlHash` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "task_hash_key";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "hash",
ADD COLUMN     "urlHash" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "task_urlHash_key" ON "task"("urlHash");
