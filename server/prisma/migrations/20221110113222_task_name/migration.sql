/*
  Warnings:

  - Added the required column `hash` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
