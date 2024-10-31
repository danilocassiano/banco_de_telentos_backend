/*
  Warnings:

  - You are about to drop the column `file` on the `Profissional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profissional" DROP COLUMN "file",
ADD COLUMN     "curriculum" TEXT;
