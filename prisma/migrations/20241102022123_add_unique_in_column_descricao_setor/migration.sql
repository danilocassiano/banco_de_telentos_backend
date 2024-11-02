/*
  Warnings:

  - Added the required column `setorId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "setorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "abreviacao" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setor_descricao_key" ON "Setor"("descricao");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
