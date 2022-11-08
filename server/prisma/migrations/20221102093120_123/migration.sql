/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE VARCHAR(32);
