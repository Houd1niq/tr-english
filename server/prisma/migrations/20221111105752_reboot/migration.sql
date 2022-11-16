/*
  Warnings:

  - You are about to drop the column `created` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `urlHash` on the `task` table. All the data in the column will be lost.
  - Added the required column `hash` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "task_urlHash_key";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "created",
DROP COLUMN "urlHash",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hash" VARCHAR(255) NOT NULL;
